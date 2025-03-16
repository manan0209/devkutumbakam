"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { createPortal, DisasterType } from "@/lib/db";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle,
    MapPin,
    Newspaper,
    Plus,
    Upload
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Predefined disaster templates
const disasterTemplates = [
  {
    id: "flood",
    title: "Flood Relief Portal",
    description:
      "Coordinating relief efforts for flood-affected areas. This portal will help organize volunteers, resources, and information sharing for communities impacted by flooding.",
    location: "",
    urgency: "high",
    disasterType: "flood" as DisasterType,
    image: "/templates/flood.jpg",
  },
  {
    id: "earthquake",
    title: "Earthquake Response Portal",
    description:
      "Emergency coordination for earthquake-affected regions. This portal centralizes rescue operations, medical assistance, shelter arrangements, and essential supplies distribution.",
    location: "",
    urgency: "high",
    disasterType: "earthquake" as DisasterType,
    image: "/templates/earthquake.jpg",
  },
  {
    id: "cyclone",
    title: "Cyclone Recovery Portal",
    description:
      "Support network for cyclone-hit communities. This portal facilitates cyclone preparedness, evacuation coordination, post-cyclone rehabilitation, and reconstruction efforts.",
    location: "",
    urgency: "high",
    disasterType: "cyclone" as DisasterType,
    image: "/templates/cyclone.jpg",
  },
  {
    id: "drought",
    title: "Drought Relief Portal",
    description:
      "Long-term assistance for drought-affected communities. This portal helps coordinate water distribution, agricultural support, livestock care, and sustainable solutions.",
    location: "",
    urgency: "medium",
    disasterType: "drought" as DisasterType,
    image: "/templates/drought.jpg",
  },
  {
    id: "fire",
    title: "Wildfire Response Portal",
    description:
      "Coordination hub for wildfire emergency response. This portal manages evacuation information, firefighting resources, relief supplies, and recovery assistance for affected communities.",
    location: "",
    urgency: "high",
    disasterType: "fire" as DisasterType,
    image: "/templates/fire.jpg",
  },
];

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

export default function CreatePortalPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [disasterType, setDisasterType] = useState<DisasterType>("other");
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newsClippings, setNewsClippings] = useState<
    { title: string; source: string; url: string }[]
  >([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSource, setNewsSource] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(false);

  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update form based on template selection
  useEffect(() => {
    if (selectedTemplate) {
      const template = disasterTemplates.find((t) => t.id === selectedTemplate);
      if (template) {
        setTitle(template.title);
        setDescription(template.description);
        setUrgency(template.urgency as "low" | "medium" | "high");
        setDisasterType(template.disasterType);
      }
    }
  }, [selectedTemplate]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        setError("Maximum 5 images allowed");
        return;
      }

      setImages((prevImages) => [...prevImages, ...filesArray]);

      // Create URLs for preview
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
    }
  };

  // Remove an uploaded image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index]);
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Add news clipping
  const addNewsClipping = () => {
    if (newsTitle && newsSource) {
      setNewsClippings([
        ...newsClippings,
        { title: newsTitle, source: newsSource, url: newsUrl },
      ]);
      setNewsTitle("");
      setNewsSource("");
      setNewsUrl("");
    }
  };

  // Remove news clipping
  const removeNewsClipping = (index: number) => {
    setNewsClippings(newsClippings.filter((_, i) => i !== index));
  };

  const handleTemplateSelect = (template: typeof disasterTemplates[0]) => {
    setTitle(template.title);
    setDescription(template.description);
    if (template.urgency === "low" || template.urgency === "medium" || template.urgency === "high") {
      setUrgency(template.urgency);
    } else {
      setUrgency("medium");
    }
    setDisasterType(template.disasterType);
    setNewsClippings([]);
    setImages([]);
    setImageUrls([]);
    
    if (searchParams.has("location")) {
      setLocation(searchParams.get("location") || "");
    }
    
    setTemplateSelected(true);
    setActiveTab("create");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to create a portal");
      return;
    }

    if (!title || !description || (!location && !customLocation) || !urgency || !disasterType) {
      setError("Please fill in all required fields");
      return;
    }

    const finalLocation = location === "custom" ? customLocation : location;

    setLoading(true);

    try {
      // Determine the image to use
      let imageUrl;
      if (images.length > 0) {
        // In a real app, you'd upload these and get the URL
        imageUrl = "/placeholder.svg";
      } else if (selectedTemplate) {
        // Use the template image if a template was selected
        const template = disasterTemplates.find(
          (t) => t.id === selectedTemplate
        );
        imageUrl = template?.image;
      }

      const portalData = {
        title,
        description,
        location: finalLocation,
        urgency,
        disasterType,
        createdBy: user.uid,
        status: "active" as const,
        image: imageUrl,
      };

      const newPortal = await createPortal(portalData);

      setSuccess("Portal created successfully!");

      // Redirect to the new portal page
      setTimeout(() => {
        router.push(`/portal/${newPortal.id}`);
      }, 1500);
    } catch (err: unknown) {
      // Fixed typed error handling
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
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">
                New Portal
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Create a Disaster Relief Portal
              </h1>
              <p className="text-lg text-gray-600">
                Set up a centralized hub to coordinate relief efforts, manage
                volunteers, and distribute resources efficiently during
                disasters.
              </p>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
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
                  <h2 className="text-xl font-semibold mb-2">
                    Authentication Required
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You need to be logged in to create a disaster relief portal.
                  </p>
                  <Button asChild>
                    <a href="/login?redirect=/create-portal">Log In</a>
                  </Button>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="template">
                        <Newspaper className="mr-2 h-4 w-4" />
                        Use Template
                      </TabsTrigger>
                      <TabsTrigger value="create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Custom
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="template">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {disasterTemplates.map((template) => (
                          <Card
                            key={template.id}
                            className={`overflow-hidden cursor-pointer transition hover:shadow-md ${
                              templateSelected &&
                              title === template.title &&
                              description === template.description
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <div className="relative h-40">
                                <Image
                                src={template.image}
                                  alt={template.title}
                                  fill
                                  className="object-cover"
                                />
                              <Badge
                                className={`absolute top-2 right-2 ${
                                  template.urgency === "high"
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : template.urgency === "medium"
                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                }`}
                              >
                                {template.urgency === "high" && (
                                  <AlertTriangle size={14} className="mr-1" />
                                )}
                                {template.urgency.charAt(0).toUpperCase() +
                                  template.urgency.slice(1)}{" "}
                                Urgency
                              </Badge>
                            </div>
                            <CardHeader>
                              <CardTitle>{template.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 line-clamp-3">
                                {template.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="create">
                      <form onSubmit={handleSubmit}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Portal Information</CardTitle>
                            <CardDescription>
                              Enter the details of the disaster relief portal
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                                <div>
                                  <Label htmlFor="title">Portal Title</Label>
                              <Input
                                    id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Kerala Flood Relief Coordination"
                                required
                              />
                            </div>

                                <div>
                                  <Label htmlFor="location">Location</Label>
                                  <div className="relative">
                                    <MapPin
                                      size={16}
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    />
                              <Select
                                value={location}
                                onValueChange={setLocation}
                              >
                                      <SelectTrigger
                                        id="location"
                                        className="pl-9"
                                        aria-label="Select a location"
                                      >
                                        <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                                <SelectContent>
                                  {commonLocations.map((loc) => (
                                    <SelectItem key={loc} value={loc}>
                                      {loc}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    You can select from common locations or type your own
                                  </p>
                        </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="urgency">Urgency Level</Label>
                          <Select
                            value={urgency}
                            onValueChange={(value) =>
                              setUrgency(value as "low" | "medium" | "high")
                            }
                          >
                                      <SelectTrigger
                                        id="urgency"
                                        aria-label="Select urgency level"
                                      >
                                        <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">
                                <div className="flex items-center">
                                            <AlertTriangle
                                              size={14}
                                              className="mr-2 text-red-500"
                                            />
                                            High
                                </div>
                              </SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                                  
                                  <div>
                                    <Label htmlFor="disaster-type">Disaster Type</Label>
                                    <Select
                                      value={disasterType}
                                      onValueChange={(value) => setDisasterType(value as DisasterType)}
                                    >
                                      <SelectTrigger
                                        id="disaster-type"
                                        aria-label="Select disaster type"
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="flood">Flood</SelectItem>
                                        <SelectItem value="earthquake">Earthquake</SelectItem>
                                        <SelectItem value="cyclone">Cyclone/Hurricane</SelectItem>
                                        <SelectItem value="drought">Drought</SelectItem>
                                        <SelectItem value="fire">Fire</SelectItem>
                                        <SelectItem value="landslide">Landslide</SelectItem>
                                        <SelectItem value="tsunami">Tsunami</SelectItem>
                                        <SelectItem value="chemical">Chemical Disaster</SelectItem>
                                        <SelectItem value="biological">Biological Disaster</SelectItem>
                                        <SelectItem value="nuclear">Nuclear Disaster</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                        </div>
                      </div>
                              </div>

                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Describe the disaster situation and coordination needs..."
                                  className="min-h-[150px]"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <Label className="block mb-2">Upload Images</Label>
                              <div className="flex items-center gap-2">
                              <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  multiple
                                  className="w-auto flex-1"
                                />
                            <Button
                              type="button"
                              variant="outline"
                                  onClick={() => document.getElementById("file-upload")?.click()}
                            >
                                  <Upload size={16} className="mr-2" />
                                  Browse
                            </Button>
                          </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Upload images related to the disaster situation (optional)
                        </p>
                  </div>

                            {/* Rest of the form unchanged... */}
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" onClick={() => window.history.back()}>
                              Cancel
                    </Button>
                            <Button type="submit" disabled={loading}>
                              {loading ? "Creating..." : "Create Portal"}
                    </Button>
                          </CardFooter>
                        </Card>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
