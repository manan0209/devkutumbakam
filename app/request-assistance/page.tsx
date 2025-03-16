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
import {
  getPortal,
  getResourceNeeds,
  ResourceNeed,
  updateResourceNeed,
} from "@/lib/db";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestAssistancePage() {
  const [portalId, setPortalId] = useState("");
  const [portalTitle, setPortalTitle] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [resourceNeeds, setResourceNeeds] = useState<ResourceNeed[]>([]);
  const [selectedResource, setSelectedResource] = useState<ResourceNeed | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("portalId");
    if (id) {
      setPortalId(id);
      fetchPortalDetails(id);
    }
  }, [searchParams]);

  const fetchPortalDetails = async (id: string) => {
    setLoadingPortal(true);
    try {
      const portal = await getPortal(id);
      if (portal) {
        setPortalTitle(portal.title);
        const resources = await getResourceNeeds(id);
        // Filter out fulfilled resources AND those without IDs
        setResourceNeeds(
          resources.filter((r) => r.status !== "fulfilled" && r.id !== undefined) as ResourceNeed[]
        );
      }
    } catch (error) {
      console.error("Error fetching portal details:", error);
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleResourceChange = (id: string) => {
    setResourceId(id);
    const resource = resourceNeeds.find((r) => r.id === id);
    setSelectedResource(resource || null);
    if (resource) {
      setQuantity(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to contribute resources");
      return;
    }

    if (!portalId || !resourceId || !quantity || quantity <= 0) {
      setError("Please fill in all required fields");
      return;
    }

    if (selectedResource && quantity > selectedResource.quantity) {
      setError(`Maximum quantity available is ${selectedResource.quantity}`);
      return;
    }

    setLoading(true);

    try {
      // Update the resource need with the contribution
      const resource = resourceNeeds.find((r) => r.id === resourceId);
      if (!resource) {
        throw new Error("Resource not found");
      }

      const remainingQuantity = resource.quantity - quantity;
      const newStatus =
        remainingQuantity <= 0
          ? ("fulfilled" as const)
          : remainingQuantity < resource.quantity
          ? ("partially_fulfilled" as const)
          : resource.status;

      await updateResourceNeed(resourceId, {
        quantity: remainingQuantity,
        status: newStatus,
      });

      setSuccess(
        "Thank you for your contribution! Your assistance has been recorded."
      );

      // Redirect back to the portal page after a short delay
      setTimeout(() => {
        router.push(`/portal/${portalId}`);
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to record your contribution";
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
          {portalId && (
            <Link
              href={`/portal/${portalId}`}
              className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Portal
            </Link>
          )}

          <h1 className="text-3xl font-bold mb-2">Contribute Resources</h1>
          <p className="text-gray-600 mb-8">
            {portalTitle
              ? `Contribute resources to ${portalTitle}`
              : "Contribute resources to disaster relief efforts"}
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
                You need to be logged in to contribute resources.
              </p>
              <Button asChild>
                <a
                  href={`/login?redirect=/request-assistance${
                    portalId ? `?portalId=${portalId}` : ""
                  }`}
                >
                  Log In
                </a>
              </Button>
            </div>
          ) : loadingPortal ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-lg border"
            >
              {!portalId && (
                <div className="space-y-2">
                  <Label htmlFor="portalId">Portal ID *</Label>
                  <Input
                    id="portalId"
                    placeholder="Enter the ID of the disaster relief portal"
                    value={portalId}
                    onChange={(e) => setPortalId(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    You can find the Portal ID in the URL of the disaster relief
                    portal page.
                  </p>
                </div>
              )}

              {resourceNeeds.length > 0 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="resourceId">Resource Need *</Label>
                    <Select
                      value={resourceId}
                      onValueChange={handleResourceChange}
                    >
                      <SelectTrigger id="resourceId">
                        <SelectValue placeholder="Select a resource to contribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {resourceNeeds.map((resource) => 
                          resource.id ? (
                            <SelectItem key={resource.id} value={resource.id}>
                              {resource.title} ({resource.quantity} needed)
                            </SelectItem>
                          ) : null
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedResource && (
                    <>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">
                          {selectedResource.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {selectedResource.description}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Category: {selectedResource.category}</span>
                          <span>Priority: {selectedResource.priority}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">
                          Quantity to Contribute *
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max={selectedResource.quantity}
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Maximum needed: {selectedResource.quantity}{" "}
                          {selectedResource.unit || "units"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Add any additional information about your contribution"
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || !selectedResource}
                    >
                      {loading ? "Processing..." : "Contribute Resources"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    No resource needs are currently available for this portal.
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/portal/${portalId}`}>Return to Portal</Link>
                  </Button>
                </div>
              )}
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
