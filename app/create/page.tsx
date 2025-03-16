"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { createPortal, DisasterType } from "@/lib/db";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePortalPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to create a portal");
      return;
    }

    if (!title || !description || !location) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const portalData = {
        title,
        description,
        location,
        urgency,
        createdBy: user.uid,
        status: "active" as const,
        disasterType: "other" as DisasterType,
      };

      const newPortal = await createPortal(portalData);
      setSuccess("Portal created successfully!");

      // Redirect to the new portal page after a short delay
      setTimeout(() => {
        router.push(`/portal/${newPortal.id}`);
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create portal";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Create a Disaster Relief Portal
          </h1>
          <p className="text-gray-600 mb-8">
            Set up a coordination hub for disaster relief efforts. This portal
            will help organize resources, volunteers, and information in one
            place.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {!user ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg border mb-6">
              <p className="text-gray-600 mb-4">
                You need to be logged in to create a disaster relief portal.
              </p>
              <Button asChild>
                <a href="/login">Log In</a>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-lg border"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Portal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Kerala Flood Relief Coordination"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the disaster situation and what kind of help is needed"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Kerala, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select
                  value={urgency}
                  onValueChange={(value) =>
                    setUrgency(value as "low" | "medium" | "high")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      Low - Ongoing situation, not immediately life-threatening
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium - Serious situation requiring timely assistance
                    </SelectItem>
                    <SelectItem value="high">
                      High - Critical emergency requiring immediate action
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Creating Portal..."
                    : "Create Disaster Relief Portal"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
