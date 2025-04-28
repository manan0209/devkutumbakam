"use client";

import { DisasterPortalCard } from "@/components/disaster-portal-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { GlobalSearch } from "@/components/ui/search";
import { DisasterPortal, getActivePortals, getMultiplePortalStats } from "@/lib/db";
import {
    ArrowRight,
    Globe,
    Heart,
    Package,
    Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

// Disaster response impact examples
const disasterResponseImpact = [
  {
    id: "1",
    title: "Community-Powered Flood Response",
    description: "Community-led disaster response initiatives during floods can reduce response time by up to 70% compared to waiting for external aid. Local volunteers provide immediate rescue, shelter, and resource distribution while formal agencies mobilize.",
    impact: "70% faster initial response",
    image: "/img (4).png",
  },
  {
    id: "2",
    title: "Coordinated Evacuation Systems",
    description: "Organized community evacuation networks saved over 10,000 lives during Cyclone Phailin in 2013. Coordination platforms helped deploy community-based early warning systems and maintain communication during infrastructure failures.",
    impact: "10,000+ lives saved",
    image: "/img (2).png",
  },
  {
    id: "3",
    title: "Grassroots Rebuilding Initiatives",
    description: "After the 2001 Gujarat earthquake, community coordination platforms helped mobilize 50,000+ volunteers, reduced rebuilding time by 40%, and ensured resources reached the most vulnerable communities first.",
    impact: "40% faster recovery",
    image: "/img (3).png",
  },
];

export default function Home() {
  const [activePortals, setActivePortals] = useState<DisasterPortal[]>([]);
  const [portalStats, setPortalStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        setLoading(true);
        const portals = await getActivePortals();
        setActivePortals(portals);
        
        // Fetch stats for each portal
        if (portals.length > 0) {
          const portalIds = portals.map(portal => portal.id as string);
          const stats = await getMultiplePortalStats(portalIds);
          setPortalStats(stats);
        }
      } catch (error) {
        console.error("Error fetching active portals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortals();
  }, []);

  return (
    <>
      <Head>
        <title>Kutumbakam | Disaster Relief Coordination Portal</title>
        <meta name="description" content="Kutumbakam is an open-source disaster relief platform that empowers communities to create, coordinate, and contribute to disaster response. Request help, volunteer, and access resources in real-time. The world is one family." />
        <meta name="keywords" content="Disaster Relief, Disaster Assistance, Volunteer, Community Support, Open Source, Kutumbakam, Vasudhaiva Kutumbakam, Emergency Help, Relief Portal, Next.js, Firebase, Hackathon, India, Social Impact" />
        <meta name="author" content="Manan Goel" />
        <meta property="og:title" content="Kutumbakam | Disaster Relief Coordination Portal" />
        <meta property="og:description" content="Join Kutumbakam to request or offer disaster assistance, volunteer, and access resources. Built for rapid, transparent, and effective humanitarian response." />
        <meta property="og:url" content="https://devkutumbakam.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://devkutumbakam.vercel.app/img%20(1).png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kutumbakam | Disaster Relief Coordination Portal" />
        <meta name="twitter:description" content="Open-source disaster relief platform for rapid response, resource sharing, and community support. Request help, volunteer, and access disaster preparedness resources." />
        <meta name="twitter:image" content="https://devkutumbakam.vercel.app/img%20(1).png" />
        <link rel="canonical" href="https://devkutumbakam.vercel.app/" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-love-light to-white py-20 overflow-hidden">
            <div className="absolute inset-0 bg-heart-pattern opacity-5"></div>
            <div className="container mx-auto px-4 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <Badge className="mb-4 bg-love text-white hover:bg-love-dark">
                    वसुधैव कुटुम्बकम्
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    Unite in Compassion,{" "}
                    <span className="text-primary">Respond as One</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                    Kutumbakam empowers communities to create, coordinate, and
                    contribute to disaster relief efforts in real-time, embodying
                    the spirit of &quot;The World is One Family.&quot;
                  </p>
                  
                  <div className="mb-2 mx-auto lg:mx-0">
                    <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                      24-Hour Hackathon Project • March 15, 2025
                    </Badge>
                  </div>
                  
                  <div className="mb-8 mx-auto lg:mx-0">
                    <GlobalSearch />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <Button size="lg" className="gap-2" asChild>
                      <Link href="/create-portal">
                        <Heart size={18} />
                        Create Relief Portal
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary text-primary hover:bg-love-light hover:text-primary"
                      asChild
                    >
                      <Link href="#active-portals">
                        <Users size={18} />
                        Volunteer Now
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary text-primary hover:bg-love-light hover:text-primary"
                      asChild
                    >
                      <Link href="/resources">
                        Explore Resources
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-support-light rounded-full opacity-50"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-love-light rounded-full opacity-50"></div>
                  <Image
                    src="/img (1).png"
                    alt="People helping during disaster relief"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Action Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/request-assistance">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-love-light rounded-full flex items-center justify-center mb-4">
                        <Package className="text-primary h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Contribute Resources
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Provide essential supplies and resources to those affected
                        by disasters in your community.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                      >
                        Contribute Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="#active-portals">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-compassion-light rounded-full flex items-center justify-center mb-4">
                        <Users className="text-primary h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Become a Volunteer
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Offer your time and skills to help those affected by
                        disasters in your community or beyond.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                      >
                        View Active Portals
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/create-portal">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-support-light rounded-full flex items-center justify-center mb-4">
                        <Globe className="text-primary h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Create Relief Portal
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start a coordination hub for disaster relief efforts in
                        your area or for a specific disaster.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                      >
                        Create Portal
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-love-light">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Kutumbakam Disaster Relief Platform</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Kutumbakam is a project developed during Hackathon Execute 4.0 to address the problem of delayed disaster aid due to poor coordination. This platform aims to efficiently connect volunteers, resources, and those in need, ensuring timely and effective disaster relief.
                  </p>
                <Badge className="bg-primary text-white hover:bg-love-dark">
                  Project Launch 2025
                </Badge>
              </div>
            </div>
          </section>

          {/* Active Disaster Portals Section */}
          <section id="active-portals" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="mb-3 bg-primary text-white hover:bg-love-dark">
                  Disaster Response Hubs
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Active Disaster Relief Portals
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join these ongoing relief efforts or create your own portal to
                  coordinate disaster response.
                </p>
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4 text-gray-600">Loading active portals...</p>
                </div>
              ) : activePortals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePortals.map((portal) => (
                    <DisasterPortalCard 
                      key={portal.id}
                      portal={portal}
                      stats={portalStats[portal.id as string] && {
                        volunteers: portalStats[portal.id as string].volunteers,
                        resources: portalStats[portal.id as string].resourceNeeds,
                        resourcesFulfilled: portalStats[portal.id as string].resourcesFulfilled
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No active portals
                  </h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    There are currently no active disaster relief portals. Be the
                    first to create one and start coordinating relief efforts.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/create-portal">Create Portal</Link>
                    </Button>
                  </div>
                </div>
              )}

              {activePortals.length > 0 && (
                <div className="mt-12 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/create-portal">
                      Create New Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* New Resources Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Resource Needs</h2>
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/resources">
                    View All Resources
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-red-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Package className="text-red-600 h-4 w-4" />
                      </div>
                      High Priority Needs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-xs font-medium">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Medical Supplies</h4>
                          <p className="text-sm text-gray-600">
                            First aid kits, bandages, antiseptics
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-xs font-medium">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Clean Drinking Water</h4>
                          <p className="text-sm text-gray-600">
                            Bottled water, water purification tablets
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-xs font-medium">
                            3
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Emergency Food</h4>
                          <p className="text-sm text-gray-600">
                            Non-perishable food items, baby food
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full" size="sm" asChild>
                      <Link href="/resources?priorityFilter=high">
                        View High Priority Needs
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-yellow-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Package className="text-yellow-600 h-4 w-4" />
                      </div>
                      Medium Priority Needs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs font-medium">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Hygiene Kits</h4>
                          <p className="text-sm text-gray-600">
                            Soap, toothpaste, sanitary products
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs font-medium">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Blankets & Bedding</h4>
                          <p className="text-sm text-gray-600">
                            Blankets, sleeping bags, mattresses
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs font-medium">
                            3
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Baby Supplies</h4>
                          <p className="text-sm text-gray-600">
                            Diapers, formula, baby clothes
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      className="w-full"
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href="/resources?priorityFilter=medium">
                        View Medium Priority Needs
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-blue-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="text-blue-600 h-4 w-4" />
                      </div>
                      Volunteer Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-xs font-medium">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Medical Professionals</h4>
                          <p className="text-sm text-gray-600">
                            Doctors, nurses, paramedics
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-xs font-medium">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Logistics Support</h4>
                          <p className="text-sm text-gray-600">
                            Transportation, distribution, coordination
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-xs font-medium">
                            3
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">General Volunteers</h4>
                          <p className="text-sm text-gray-600">
                            Relief distribution, shelter management
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      className="w-full"
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href="/volunteer">Register as Volunteer</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          {/* Impact & Effectiveness Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-love text-white hover:bg-love-dark">
                  Potential Impact
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How Community Coordination Can Save Lives
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Research and historical evidence show how platforms like Kutumbakam could significantly improve disaster response outcomes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {disasterResponseImpact.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.impact}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-primary hover:text-primary hover:bg-love-light"
                        asChild
                      >
                        <Link href="/how-it-works">
                          Learn More
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-love-light">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-primary text-white hover:bg-love-dark">
                  Project Feedback
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What People Think About This Project
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Early feedback from mentors and community members on the Kutumbakam concept
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">PK</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Prof. Goel</h4>
                        <p className="text-sm text-gray-600">
                          Mentor
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      &quot;Kutumbakam addresses a critical gap in disaster response coordination. The concept shows potential to significantly improve how communities organize during crises.&quot;
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">SJ</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Rishita</h4>
                        <p className="text-sm text-gray-600">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      &quot;An innovative approach to disaster management that leverages technology to bring communities together. The platform has promising applications for real-world implementation.&quot;
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">AP</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Suhani Patel</h4>
                        <p className="text-sm text-gray-600">
                          Volunteer
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      &quot;When fully developed, this type of platform could greatly enhance how NGOs coordinate with local communities. The focus on transparency and decentralization addresses many current challenges.&quot;
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-love-light via-white to-support-light relative overflow-hidden">
            <div className="absolute inset-0 bg-heart-pattern opacity-5"></div>
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl mx-auto text-center">
                <Badge className="mb-4 bg-primary text-white hover:bg-love-dark">
                  Join The Movement
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Be Part of the <span className="text-primary">Kutumbakam</span>{" "}
                  Community
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Whether you&apos;re creating a relief portal, volunteering your
                  skills, or contributing resources, your participation makes a
                  difference.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="gap-2">
                    <Heart size={18} fill="currentColor" />
                    Create Relief Portal
                  </Button>
                  <Link href="/volunteer">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary text-primary hover:bg-love-light hover:text-primary"
                    >
                      <Heart size={18} />
                      Become a Volunteer
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-600 mt-8 text-sm">
                  &quot;वसुधैव कुटुम्बकम्&quot; — The world is one family.
                  Together, we can overcome any disaster.
                </p>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
