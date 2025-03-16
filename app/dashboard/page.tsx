"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import {
  DisasterPortal,
  getUserPortals,
  getUserVolunteerActivities,
  Volunteer,
} from "@/lib/db";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Eye,
  Package,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [userPortals, setUserPortals] = useState<DisasterPortal[]>([]);
  const [volunteerActivities, setVolunteerActivities] = useState<Volunteer[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Fetch user's created portals
        const portals = await getUserPortals(user.uid);
        setUserPortals(portals);

        // Fetch user's volunteer activities
        const activities = await getUserVolunteerActivities(user.uid);
        setVolunteerActivities(activities);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load your dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <p>Please sign in to view your dashboard.</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back,{" "}
            {user.displayName || user.email?.split("@")[0] || "User"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-love-light rounded-full flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Your Portals</h3>
                <p className="text-4xl font-bold text-primary mb-2">
                  {userPortals.length}
                </p>
                <p className="text-sm text-gray-500">
                  Relief portals created by you
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-saffron-light rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-saffron" />
                </div>
                <h3 className="text-xl font-semibold mb-1">
                  Volunteer Activities
                </h3>
                <p className="text-4xl font-bold text-saffron mb-2">
                  {volunteerActivities.length}
                </p>
                <p className="text-sm text-gray-500">
                  Disaster relief efforts you've joined
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Activity Status</h3>
                <p className="text-4xl font-bold text-gray-600 mb-2">
                  {userPortals.length + volunteerActivities.length > 0
                    ? "Active"
                    : "Inactive"}
                </p>
                <p className="text-sm text-gray-500">
                  Your current contribution status
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portals">Your Portals</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer Activities</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="portals">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Relief Portals</h2>
              <Button className="gap-2" asChild>
                <Link href="/create-portal">
                  <Plus size={16} />
                  Create New Portal
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">Loading your portals...</p>
              </div>
            ) : userPortals.length > 0 ? (
              <div className="space-y-4">
                {userPortals.map((portal) => (
                  <Card key={portal.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-gray-50 p-4 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200">
                        <Badge
                          className={`mb-2 ${
                            portal.status === "active"
                              ? "bg-green-500"
                              : portal.status === "resolved"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {portal.status?.charAt(0).toUpperCase() +
                            portal.status?.slice(1)}
                        </Badge>
                        <h3 className="text-lg font-semibold mb-1">
                          {portal.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {portal.location}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {portal.createdAt
                            ? new Date(
                                portal.createdAt.toDate()
                              ).toLocaleDateString()
                            : "No date"}
                        </div>
                      </div>

                      <div className="md:w-3/4 p-4">
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {portal.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="bg-gray-50">
                            {portal.disasterType?.charAt(0).toUpperCase() +
                              portal.disasterType?.slice(1)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${
                              portal.urgency === "high"
                                ? "bg-red-50 text-red-700"
                                : portal.urgency === "medium"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {portal.urgency?.charAt(0).toUpperCase() +
                              portal.urgency?.slice(1)}{" "}
                            Urgency
                          </Badge>
                        </div>

                        <div className="flex justify-end">
                          <Button className="gap-2" size="sm" asChild>
                            <Link href={`/portal/${portal.id}`}>
                              <Eye size={16} />
                              View Portal
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    You haven't created any relief portals yet.
                  </p>
                  <Button className="gap-2" asChild>
                    <Link href="/create-portal">
                      <Plus size={16} />
                      Create Your First Portal
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="volunteer">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Your Volunteer Activities
              </h2>
              <Button className="gap-2" variant="outline" asChild>
                <Link href="/volunteer">
                  <Plus size={16} />
                  Find Opportunities
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">
                  Loading your volunteer activities...
                </p>
              </div>
            ) : volunteerActivities.length > 0 ? (
              <div className="space-y-4">
                {volunteerActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-gray-50 p-4 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200">
                        <Badge
                          className={`mb-2 ${
                            activity.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {(activity.status || "unknown")
                            .charAt(0)
                            .toUpperCase() +
                            (activity.status || "unknown").slice(1)}
                        </Badge>
                        <h3 className="text-lg font-semibold mb-1">
                          {activity.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar size={14} className="mr-1" />
                          {activity.registeredAt
                            ? new Date(
                                activity.registeredAt.toDate()
                              ).toLocaleDateString()
                            : "No date"}
                        </div>
                      </div>

                      <div className="md:w-3/4 p-4">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activity.skills?.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">
                            Availability
                          </h4>
                          <p className="text-gray-600">
                            {activity.availability}
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            className="gap-2"
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <Link href={`/portal/${activity.portalId}`}>
                              <Eye size={16} />
                              View Portal
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    You haven't volunteered for any relief efforts yet.
                  </p>
                  <Button className="gap-2" variant="outline" asChild>
                    <Link href="/volunteer">
                      <Plus size={16} />
                      Find Volunteer Opportunities
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contributions">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Your Contributions</h2>
            </div>

            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  You haven't made any resource contributions yet.
                </p>
                <Button className="gap-2" variant="outline" asChild>
                  <Link href="/resources">
                    <Plus size={16} />
                    Contribute Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <SiteFooter />
    </div>
  );
}
