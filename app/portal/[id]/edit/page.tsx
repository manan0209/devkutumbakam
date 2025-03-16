"use client";

import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  DisasterPortal,
  DisasterType,
  deletePortal,
  getPortal,
  updatePortal,
} from "@/lib/db";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Disaster type to image mapping
const disasterTypeImages = {
  flood: "/templates/flood.jpg",
  earthquake: "/templates/earthquake.jpg",
  cyclone: "/templates/cyclone.jpg",
  drought: "/templates/drought.jpg",
  fire: "/templates/fire.jpg",
  landslide: "/templates/landslide.jpg",
  tsunami: "/templates/tsunami.jpg",
  chemical: "/templates/chemical.jpg",
  biological: "/templates/biological.jpg",
  nuclear: "/templates/nuclear.jpg",
  other: "/templates/other.jpg",
};

// Common Indian locations for disasters
const commonLocations = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kochi, Kerala",
  "Bhubaneswar, Odisha",
  "Guwahati, Assam",
  "Shimla, Himachal Pradesh",
  "Dehradun, Uttarakhand",
];

export default function EditPortalPage({ params }: { params: any }) {
  // Unwrap the params promise to get the id
  const unwrappedParams = React.use(params);
  const portalId = unwrappedParams.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [disasterType, setDisasterType] = useState<DisasterType>("other");
  const [portal, setPortal] = useState<DisasterPortal | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  // Fetch portal data
  useEffect(() => {
    const fetchPortal = async () => {
      try {
        setInitialLoading(true);
        const portalData = await getPortal(portalId);

        if (!portalData) {
          throw new Error("Portal not found");
        }

        // Check if user is the creator of the portal
        if (user && portalData.createdBy !== user.uid) {
          setUnauthorized(true);
          return;
        }

        setPortal(portalData);

        // Set form values
        setTitle(portalData.title || "");
        setDescription(portalData.description || "");

        // Handle location
        if (commonLocations.includes(portalData.location)) {
          setLocation(portalData.location);
        } else {
          setLocation("custom");
          setCustomLocation(portalData.location);
        }

        setUrgency(portalData.urgency || "medium");
        setDisasterType(portalData.disasterType || "other");
      } catch (error) {
        console.error("Error fetching portal:", error);
        setError("Failed to load portal data");
      } finally {
        setInitialLoading(false);
      }
    };

    if (portalId && user) {
      fetchPortal();
    }
  }, [portalId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to edit this portal");
      return;
    }

    if (
      !title ||
      !description ||
      (!location && !customLocation) ||
      !urgency ||
      !disasterType
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const finalLocation = location === "custom" ? customLocation : location;

    setLoading(true);

    try {
      const portalData = {
        title,
        description,
        location: finalLocation,
        urgency,
        disasterType,
        lastUpdated: new Date(),
      };

      await updatePortal(portalId, portalData);
      setSuccess("Portal updated successfully!");

      // Redirect to the portal page
      setTimeout(() => {
        router.push(`/portal/${portalId}`);
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update portal";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePortal = async () => {
    if (!user) {
      setError("You must be logged in to delete this portal");
      return;
    }

    if (!portal || portal.createdBy !== user.uid) {
      setError("You don't have permission to delete this portal");
      return;
    }

    setDeleteLoading(true);

    try {
      await deletePortal(portalId);
      setShowDeleteDialog(false);

      // Show success message and redirect
      setSuccess("Portal deleted successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete portal";
      setError(errorMessage);
      setShowDeleteDialog(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
            <p className="text-gray-600">Loading portal data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center bg-red-50 p-6 rounded-lg border border-red-200">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-red-700 mb-2">
                Unauthorized Access
              </h1>
              <p className="text-gray-600 mb-6">
                You don't have permission to edit this portal. Only the creator
                can edit portal details.
              </p>
              <Button onClick={() => router.push(`/portal/${portalId}`)}>
                Return to Portal
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Portal Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The disaster relief portal you're looking for could not be found
                or may have been removed.
              </p>
              <Button onClick={() => router.push("/")}>Return to Home</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                Edit Portal
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Edit Disaster Relief Portal
              </h1>
              <p className="text-lg text-gray-600">
                Update information for your disaster relief coordination portal.
              </p>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Portal Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Kerala Flood Relief Coordination"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the purpose and scope of this relief portal..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="disaster-type">Disaster Type</Label>
                        <Select
                          value={disasterType}
                          onValueChange={(value) =>
                            setDisasterType(value as DisasterType)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select disaster type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flood">Flood</SelectItem>
                            <SelectItem value="earthquake">
                              Earthquake
                            </SelectItem>
                            <SelectItem value="cyclone">
                              Cyclone/Hurricane
                            </SelectItem>
                            <SelectItem value="drought">Drought</SelectItem>
                            <SelectItem value="fire">Fire</SelectItem>
                            <SelectItem value="landslide">Landslide</SelectItem>
                            <SelectItem value="tsunami">Tsunami</SelectItem>
                            <SelectItem value="chemical">
                              Chemical Incident
                            </SelectItem>
                            <SelectItem value="biological">
                              Biological Incident
                            </SelectItem>
                            <SelectItem value="nuclear">
                              Nuclear Incident
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency Level</Label>
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
                            <SelectItem value="high">
                              High - Immediate response needed
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium - Urgent but not critical
                            </SelectItem>
                            <SelectItem value="low">
                              Low - Ongoing management
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonLocations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">
                            Custom location
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {location === "custom" && (
                        <div className="mt-2">
                          <Input
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                            placeholder="Enter custom location"
                            className="mt-2"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Preview of Current Disaster Type Image */}
                    <div className="mt-4">
                      <Label>Current Disaster Type Image</Label>
                      <div className="mt-2 relative h-48 rounded-md overflow-hidden border">
                        <Image
                          src={
                            portal.image ||
                            disasterTypeImages[
                              disasterType as keyof typeof disasterTypeImages
                            ] ||
                            "/templates/other.jpg"
                          }
                          alt={disasterType}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        The image will be updated based on the disaster type
                        selected
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-between space-y-2 sm:space-y-0 pt-4">
                      <Dialog
                        open={showDeleteDialog}
                        onOpenChange={setShowDeleteDialog}
                      >
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            className="gap-2"
                          >
                            <Trash2 size={16} />
                            Delete Portal
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-red-600">
                              Delete Portal
                            </DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this portal? This
                              action cannot be undone and will remove all
                              associated resources, volunteers, updates, and
                              forum posts.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-800 my-4">
                            <p className="font-semibold">Warning:</p>
                            <p>Deleting this portal will permanently remove:</p>
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                              <li>All resource need requests</li>
                              <li>All volunteer registrations</li>
                              <li>All status updates and posts</li>
                              <li>All forum discussions</li>
                              <li>
                                All associated data with this disaster relief
                                effort
                              </li>
                            </ul>
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowDeleteDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={handleDeletePortal}
                              disabled={deleteLoading}
                              className="gap-2"
                            >
                              {deleteLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 size={16} />
                                  Confirm Delete
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div className="flex gap-2 ml-auto">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push(`/portal/${portalId}`)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Portal"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
