"use client";

import { ForumSection } from "@/components/forum-section";
import { SelfHelpManuals } from "@/components/manuals/self-help-manuals";
import { PortalShareCard } from "@/components/portal/portal-share-card";
import { SocialShare } from "@/components/social-share";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateCard } from "@/components/update-card";
import { VolunteerCard } from "@/components/volunteer/volunteer-card";
import { VolunteerRegistrationDialog } from "@/components/volunteer/volunteer-registration-dialog";
import { useAuth } from "@/lib/auth-context";
import {
    DisasterPortal,
    getPortal,
    getResourceNeeds,
    getUpdates,
    getVolunteers,
    ResourceNeed,
    Update,
    Volunteer,
} from "@/lib/db";
import {
    AlertTriangle,
    ArrowUpRight,
    Clock,
    MapPin,
    Package,
    TrendingUp,
    Users
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ResolvePortalDialog } from "./resolve-portal-dialog";

interface PortalDashboardProps {
  portalId: string;
}

function adaptUpdateForCard(update: Update) {
  return {
    id: update.id || '',
    title: update.title,
    content: update.content,
    author: update.createdBy,  // Map createdBy to author
    timestamp: update.createdAt?.toDate().toISOString() || new Date().toISOString(), // Convert Timestamp to string
    type: 'update' // Add missing type field with default value
  };
}

export function PortalDashboard({ portalId }: PortalDashboardProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [portal, setPortal] = useState<DisasterPortal | null>(null);
  const [resourceNeeds, setResourceNeeds] = useState<ResourceNeed[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  // Check for volunteer hash in URL and set tab accordingly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#volunteers-section") {
        setActiveTab("volunteers");
      }
    }
  }, []);

  // Handle portal resolve
  const handlePortalResolve = () => {
    // Refresh the portal data
    const fetchPortalData = async () => {
      try {
        setLoading(true);
        const portalData = await getPortal(portalId);
        const resourcesData = await getResourceNeeds(portalId);
        const volunteersData = await getVolunteers(portalId);
        const updatesData = await getUpdates(portalId);

        setPortal(portalData);
        setResourceNeeds(resourcesData);
        setVolunteers(volunteersData);
        setUpdates(updatesData);
      } catch (error) {
        console.error("Error fetching portal data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  };

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        setLoading(true);
        const portalData = await getPortal(portalId);
        const resourcesData = await getResourceNeeds(portalId);
        const volunteersData = await getVolunteers(portalId);
        const updatesData = await getUpdates(portalId);

        setPortal(portalData);
        setResourceNeeds(resourcesData);
        setVolunteers(volunteersData);
        setUpdates(updatesData);
      } catch (error) {
        console.error("Error fetching portal data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (portalId) {
      fetchPortalData();
    }
  }, [portalId]);

  // Calculate resource stats
  const totalResourceNeeds = resourceNeeds.length;
  const fulfilledResourceNeeds = resourceNeeds.filter(
    (r) => r.status === "fulfilled"
  ).length;
  const partiallyFulfilledResourceNeeds = resourceNeeds.filter(
    (r) => r.status === "partially_fulfilled"
  ).length;
  // const neededResourceNeeds = resourceNeeds.filter(r => r.status === "needed").length

  const urgentResourceNeeds = resourceNeeds
    .filter((r) => r.priority === "high" && r.status !== "fulfilled")
    .slice(0, 3);

  // Group resources by category
  const resourceCategories = resourceNeeds.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = { total: 0, fulfilled: 0 };
    }

    acc[resource.category].total++;
    if (resource.status === "fulfilled") {
      acc[resource.category].fulfilled++;
    } else if (resource.status === "partially_fulfilled") {
      acc[resource.category].fulfilled += 0.5;
    }

    return acc;
  }, {} as Record<string, { total: number; fulfilled: number }>);

  // Calculate volunteers by skills
  const volunteerSkills = volunteers.reduce((acc, volunteer) => {
    volunteer.skills.forEach((skill) => {
      if (!acc[skill]) {
        acc[skill] = 0;
      }
      acc[skill]++;
    });
    return acc;
  }, {} as Record<string, number>);

  // Format volunteer skills for display
  const volunteerSkillsFormatted = Object.entries(volunteerSkills)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Portal Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The disaster relief portal you&apos;re looking for could not be found
          or may have been removed.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Portal header with hero section, info and actions */}
      <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
        {/* Header background with gradient overlay */}
        <div className="absolute inset-0 h-48 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        
        {/* Content container */}
        <div className="relative pt-12 px-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left side: Portal info */}
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {portal && (
                  <>
                    <Badge 
                      className={
                        portal.status === "active" 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : portal.status === "resolved" 
                          ? "bg-purple-100 text-purple-800 border-purple-200" 
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {portal.status.charAt(0).toUpperCase() + portal.status.slice(1)}
                    </Badge>
                    <Badge 
                      className={
                        portal.urgency === "high" 
                          ? "bg-red-100 text-red-800 border-red-200" 
                          : portal.urgency === "medium" 
                          ? "bg-amber-100 text-amber-800 border-amber-200" 
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {portal.urgency === "high" && <AlertTriangle size={14} className="mr-1" />}
                      {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)} Urgency
                    </Badge>
                  </>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{portal?.title || "Loading..."}</h1>
              
              {portal && (
                <div className="flex flex-wrap items-center text-blue-100 gap-4 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {portal.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    Created:{" "}
                    {portal.createdAt
                      ? new Date(portal.createdAt.toDate()).toLocaleDateString()
                      : "Recently"}
                  </div>
                </div>
              )}
              
              <div className="p-4 mt-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700">
                  {portal?.description || "Loading portal information..."}
                </p>
              </div>
            </div>

            {/* Right side: Action buttons */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 self-start bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              {portal && portal.status !== "resolved" && (
                <>
                  <ResolvePortalDialog 
                    portalId={portalId} 
                    portalName={portal.title} 
                    onResolve={handlePortalResolve}
                  />
                  <VolunteerRegistrationDialog
                    portalId={portalId}
                    portalTitle={portal.title}
                    buttonVariant="primary"
                    buttonSize="default"
                  />
                </>
              )}
              <PortalShareCard portal={portal || { id: portalId }} />
              <SocialShare
                title={portal?.title || "Disaster Relief Portal"}
                description={
                  portal?.description || "Join the disaster relief efforts"
                }
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
              {user && portal?.createdBy === user.uid && (
                <Button variant="outline" asChild>
                  <Link href={`/portal/${portalId}/edit`}>
                    Edit Portal
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer CTA Banner - Add this section right after the header */}
      {portal && portal.status === "active" && (
        <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white overflow-hidden border-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Volunteers Needed</h2>
              <p className="text-gray-700 mb-4">
                Your skills and time can make a real difference in this relief effort. 
                Join <span className="font-semibold text-blue-600">{volunteers.length}</span> volunteer{volunteers.length !== 1 ? 's' : ''} who have already registered.
              </p>
              <div className="flex flex-wrap gap-3">
                <VolunteerRegistrationDialog
                  portalId={portalId}
                  portalTitle={portal.title}
                  buttonVariant="primary"
                  buttonSize="lg"
                />
                <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                  <a href="#volunteers-section">
                    View Current Volunteers
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                <Users size={64} className="text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-sm text-gray-600 hidden sm:inline">Time Range:</span>
            <div className="flex border rounded-md overflow-hidden shadow-sm">
              <button
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "24h"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setTimeRange("24h")}
              >
                24h
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "7d"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setTimeRange("7d")}
              >
                7d
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${
                  timeRange === "30d"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setTimeRange("30d")}
              >
                30d
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Volunteers</p>
                  <h3 className="text-2xl font-bold mt-1">{volunteers.length}</h3>
                  <div className="flex items-center text-xs text-green-600 mt-2">
                    <TrendingUp size={14} className="mr-1" />
                    <span>Active & Ready</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="text-green-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Resources Fulfilled</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {fulfilledResourceNeeds}/{totalResourceNeeds}
                  </h3>
                  <div className="flex items-center text-xs text-orange-600 mt-2">
                    <TrendingUp size={14} className="mr-1" />
                    <span>
                      {partiallyFulfilledResourceNeeds} partially filled
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="text-orange-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Updates Posted</p>
                  <h3 className="text-2xl font-bold mt-1">{updates.length}</h3>
                  <div className="flex items-center text-xs text-blue-600 mt-2">
                    <TrendingUp size={14} className="mr-1" />
                    <span>
                      Latest{" "}
                      {updates.length > 0
                        ? new Date(
                            updates[0].createdAt?.toDate() ?? new Date()
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="text-blue-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-gray-500 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <h3 className="text-lg font-bold mt-1">{portal.location}</h3>
                  <div className="flex items-center text-xs text-gray-600 mt-2">
                    <Clock size={14} className="mr-1" />
                    <span>Urgency: {portal.urgency}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-gray-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="sticky top-0 z-10 bg-gray-50 pt-2 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 shadow-sm">
            <TabsList className="w-full overflow-x-auto flex flex-nowrap md:inline-flex md:w-auto bg-gray-100/80 p-1 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex-1 md:flex-none whitespace-nowrap">
                Overview
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex-1 md:flex-none whitespace-nowrap">
                Resources
              </TabsTrigger>
              <TabsTrigger value="volunteers" className="flex-1 md:flex-none whitespace-nowrap">
                Volunteers
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex-1 md:flex-none whitespace-nowrap">
                Updates
              </TabsTrigger>
              <TabsTrigger value="forum" className="flex-1 md:flex-none whitespace-nowrap">
                Community
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="mr-2 h-5 w-5 text-orange-500" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold mb-2">{totalResourceNeeds}</div>
                  <p className="text-sm text-gray-500 mb-4">Total resource needs</p>
                  <Progress 
                    value={(fulfilledResourceNeeds / (totalResourceNeeds || 1)) * 100} 
                    className="h-2 mb-2 bg-gray-100" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span>{fulfilledResourceNeeds} fulfilled</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                      <span>{totalResourceNeeds - fulfilledResourceNeeds} pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold mb-2">{volunteers.length}</div>
                  <p className="text-sm text-gray-500 mb-4">Registered volunteers</p>
                  <div className="space-y-2">
                    {volunteerSkillsFormatted.slice(0, 3).map(({ skill, count }, index) => (
                      <div key={skill} className="flex justify-between text-sm">
                        <span className="font-medium">{skill}</span>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">{count}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            index === 0 ? "bg-green-500" : 
                            index === 1 ? "bg-blue-500" : "bg-purple-500"
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <ArrowUpRight className="mr-2 h-5 w-5 text-blue-500" />
                    Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold mb-2">{updates.length}</div>
                  <p className="text-sm text-gray-500 mb-4">Total updates</p>
                  {updates.length > 0 ? (
                    <div className="text-sm">
                      <div className="font-medium">Latest update:</div>
                      <div className="text-gray-700 truncate mt-1">{updates[0].title}</div>
                      <div className="text-xs text-gray-400 mt-2 flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {updates[0].createdAt?.toDate?.() 
                          ? new Date(updates[0].createdAt.toDate()).toLocaleString() 
                          : 'Recently'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No updates yet</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {urgentResourceNeeds.length > 0 && (
              <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
                <CardHeader className="pb-2 border-b bg-red-50">
                  <CardTitle className="text-lg flex items-center text-red-700">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Urgent Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {urgentResourceNeeds.map((resource) => (
                      <div 
                        key={resource.id} 
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle size={16} className="text-red-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{resource.description}</div>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="outline" className="capitalize bg-red-50 text-red-700 border-red-200">
                                {resource.category}
                              </Badge>
                              <div className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                                {resource.status === "fulfilled" 
                                  ? "Fulfilled" 
                                  : resource.status === "partially_fulfilled" 
                                  ? "Partially fulfilled" 
                                  : "Needed urgently"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {updates.length > 0 && (
              <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
                <CardHeader className="pb-2 border-b bg-blue-50">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <ArrowUpRight className="mr-2 h-5 w-5" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {updates.slice(0, 3).map((update) => (
                      <div key={update.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <UpdateCard update={adaptUpdateForCard(update)} />
                      </div>
                    ))}
                  </div>
                  {updates.length > 3 && (
                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" onClick={() => setActiveTab("updates")}>
                        View all {updates.length} updates
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="volunteers" id="volunteers-section" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    Volunteer Skills Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {volunteerSkillsFormatted.map(({ skill, count }, index) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900">{skill}</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {count} volunteers
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min(100, (count / Math.max(...volunteerSkillsFormatted.map(s => s.count))) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <VolunteerRegistrationDialog
                      portalId={portalId}
                      portalTitle={portal.title}
                      buttonVariant="outline"
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    Recent Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 p-0">
                  <div className="divide-y divide-gray-100">
                    {volunteers.slice(0, 5).map((volunteer) => (
                      <div
                        key={volunteer.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{volunteer.name}</div>
                          <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-1">
                            {volunteer.skills.map(skill => (
                              <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Badge className="ml-2 shrink-0">
                          {new Date(
                            volunteer.registeredAt?.toDate() ?? new Date()
                          ).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    All Volunteers ({volunteers.length})
                  </CardTitle>
                  <VolunteerRegistrationDialog
                    portalId={portalId}
                    portalTitle={portal.title}
                    buttonVariant="outline"
                    buttonSize="sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {volunteers.slice(0, 6).map((volunteer) => (
                    <VolunteerCard
                      key={volunteer.id}
                      volunteer={volunteer}
                      portalName={portal.title}
                    />
                  ))}
                </div>

                {volunteers.length > 6 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="px-8" asChild>
                      <a href={`/portal/${portalId}/volunteers`}>
                        View All {volunteers.length} Volunteers
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-lg flex items-center">
                    <ArrowUpRight className="mr-2 h-5 w-5 text-blue-500" />
                    Latest Updates
                  </CardTitle>
                  <Button variant="outline" size="sm" className="shrink-0" asChild>
                    <a href={`/portal/${portalId}/post-update`}>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Post Update
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {updates.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {updates.map((update) => (
                      <div key={update.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <UpdateCard 
                          key={update.id} 
                          update={adaptUpdateForCard(update)} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowUpRight className="text-blue-500" size={24} />
                    </div>
                    <p className="text-gray-500 mb-4">
                      No updates have been posted yet.
                    </p>
                    {user && (
                      <Button asChild>
                        <a href={`/portal/${portalId}/post-update`}>
                          Post the First Update
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-blue-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  Community Discussion
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Connect with other volunteers and coordinators to share information and resources.
                </p>
              </div>
              <div className="p-4">
                <ForumSection portalId={portalId} portalName={portal?.title || ""} />
              </div>
            </div>
          </TabsContent>
          
          {/* Self-Help Tab */}
          <TabsContent value="help" className="space-y-4">
            <SelfHelpManuals 
              disasterType={portal?.disasterType || "other"} 
              portalId={portalId}
            />
          </TabsContent>

          {/* Add Resources Tab Content */}
          <TabsContent value="resources" className="space-y-6">
            <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="mr-2 h-5 w-5 text-orange-500" />
                    Resource Requirements
                  </CardTitle>
                  <Button variant="outline" size="sm" className="shrink-0" asChild>
                    <a href={`/portal/${portalId}/add-resource`}>
                      <Package className="mr-2 h-4 w-4" />
                      Add Resource Need
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {resourceNeeds.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {resourceNeeds.map((resource) => (
                      <div key={resource.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              resource.priority === "high" 
                                ? "bg-red-100" 
                                : resource.priority === "medium" 
                                ? "bg-amber-100" 
                                : "bg-blue-100"
                            }`}>
                              <Package size={20} className={`${
                                resource.priority === "high" 
                                  ? "text-red-600" 
                                  : resource.priority === "medium" 
                                  ? "text-amber-600" 
                                  : "text-blue-600"
                              }`} />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className="font-medium text-lg text-gray-900">{resource.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="capitalize bg-gray-50 text-gray-700 border-gray-200">
                                  {resource.category}
                                </Badge>
                                <Badge className={`${
                                  resource.status === "fulfilled" 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : resource.status === "partially_fulfilled" 
                                    ? "bg-amber-100 text-amber-800 border-amber-200" 
                                    : "bg-red-100 text-red-800 border-red-200"
                                }`}>
                                  {resource.status === "fulfilled" 
                                    ? "Fulfilled" 
                                    : resource.status === "partially_fulfilled" 
                                    ? "Partially Fulfilled" 
                                    : "Needed"}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mt-2">{resource.description}</p>
                            
                            <div className="flex flex-wrap items-center justify-between mt-4">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div>Quantity: <span className="font-medium">{resource.quantity} {resource.unit || 'units'}</span></div>
                                <div>Priority: <span className={`font-medium ${
                                  resource.priority === "high" 
                                    ? "text-red-600" 
                                    : resource.priority === "medium" 
                                    ? "text-amber-600" 
                                    : "text-blue-600"
                                }`}>
                                  {resource.priority.charAt(0).toUpperCase() + resource.priority.slice(1)}
                                </span></div>
                              </div>
                              
                              {resource.status !== "fulfilled" && (
                                <Button size="sm" className="mt-2 sm:mt-0">
                                  Fulfill Resource
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="text-orange-500" size={24} />
                    </div>
                    <p className="text-gray-500 mb-4">
                      No resource needs have been added yet.
                    </p>
                    <Button asChild>
                      <a href={`/portal/${portalId}/add-resource`}>
                        Add First Resource Need
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resources by Category */}
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="mr-2 h-5 w-5 text-orange-500" />
                    Resources by Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {Object.entries(resourceCategories).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(resourceCategories).map(([category, data]) => (
                        <div key={category} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900 capitalize">{category}</div>
                            <Badge variant="outline">
                              {Math.floor(data.fulfilled)}/{data.total}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ 
                                width: `${Math.min(100, (data.fulfilled / data.total) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No resources data available</p>
                  )}
                </CardContent>
              </Card>
              
              {/* High Priority Needs */}
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                    High Priority Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 p-0">
                  {urgentResourceNeeds.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {urgentResourceNeeds.map((resource) => (
                        <div key={resource.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{resource.title}</h4>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{resource.description}</p>
                            </div>
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              {resource.priority}
                            </Badge>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <span className="text-xs text-gray-500">Quantity: {resource.quantity} {resource.unit || 'units'}</span>
                            <Button size="sm" variant="outline">Fulfill</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center p-4">No high priority needs</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
