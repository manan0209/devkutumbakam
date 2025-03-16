"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createResourceNeed, getPortal } from "@/lib/db";
import { AlertCircle, CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddResourcePage() {
  const params = useParams();
  const portalId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(true);
  const [portalTitle, setPortalTitle] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPortal = async () => {
      try {
        setPortalLoading(true);
        const portal = await getPortal(portalId);
        if (portal) {
          setPortalTitle(portal.title);
        }
      } catch (error) {
        console.error("Error fetching portal:", error);
      } finally {
        setPortalLoading(false);
      }
    };

    if (portalId) {
      fetchPortal();
    }
  }, [portalId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to add a resource need");
      return;
    }

    // Validate form fields
    if (!title || !description || !category || !quantity || !priority) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const resourceData = {
        portalId,
        title,
        description,
        category: category as
          | "medicine"
          | "food"
          | "shelter"
          | "clothing"
          | "water"
          | "transport"
          | "other",
        quantity,
        unit,
        priority: priority as "low" | "medium" | "high",
        status: "needed" as const,
      };

      await createResourceNeed(resourceData);

      setSuccess("Resource need added successfully!");

      // Redirect back to portal page after short delay
      setTimeout(() => {
        router.push(`/portal/${portalId}`);
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add resource need";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link
            href={`/portal/${portalId}`}
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Portal
          </Link>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Add Resource Need</CardTitle>
                {!portalLoading && (
                  <p className="text-sm text-gray-500">for {portalTitle}</p>
                )}
              </CardHeader>
              <CardContent>
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Resource Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="E.g., Drinking Water, First Aid Kits, etc."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide details about the resource needed"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medicine">
                            Medicine & Medical Supplies
                          </SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="water">Water</SelectItem>
                          <SelectItem value="shelter">
                            Shelter & Housing
                          </SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority *</Label>
                      <Select
                        value={priority}
                        onValueChange={(value) =>
                          setPriority(value as "low" | "medium" | "high")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            High - Urgent Need
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Needed Soon
                          </SelectItem>
                          <SelectItem value="low">
                            Low - Eventually Needed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit (Optional)</Label>
                      <Input
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="E.g., Liters, Boxes, Pieces, etc."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/portal/${portalId}`}>Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Adding Resource..." : "Add Resource Need"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
