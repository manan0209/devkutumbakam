import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, CheckSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DisasterPreparednessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                Safety Resources
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Disaster Preparedness Guide
              </h1>
              <p className="text-xl text-gray-600">
                Essential information on how to prepare for various types of disasters to protect
                yourself, your loved ones, and your community.
              </p>
            </div>
          </div>
        </section>

        {/* Preparation Essentials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Key Principles
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Preparation Essentials
                </h2>
                <p className="text-gray-600 mb-8">
                  Regardless of the specific disaster type, certain preparedness steps are universally beneficial:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-indiaGreen" />
                        Create an Emergency Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Develop a household emergency plan that includes:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Meeting points both near your home and outside your neighborhood</li>
                        <li>Emergency contact information</li>
                        <li>Evacuation routes</li>
                        <li>Roles and responsibilities for family members</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-indiaGreen" />
                        Build an Emergency Kit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Prepare essential supplies to last at least 72 hours, including:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Water (one gallon per person per day)</li>
                        <li>Non-perishable food</li>
                        <li>Medications and first aid kit</li>
                        <li>Flashlight, radio, and extra batteries</li>
                        <li>Important documents in waterproof container</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-indiaGreen" />
                        Stay Informed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Set up multiple ways to receive emergency alerts:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Weather radio with battery backup</li>
                        <li>Mobile alerts and warning apps</li>
                        <li>Local news and emergency management social media</li>
                        <li>Community warning systems</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-indiaGreen" />
                        Learn Essential Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Develop skills that can be crucial during emergencies:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Basic first aid and CPR</li>
                        <li>How to shut off utilities</li>
                        <li>Basic fire safety</li>
                        <li>Water purification methods</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-saffron" />
                  Know Your Local Hazards
                </h3>
                <p className="text-gray-600 mb-4">
                  Different regions face different disaster risks. Understand which disasters are most likely in your area and prepare specifically for those. Local emergency management agencies can provide information on regional hazards.
                </p>
                <p className="text-sm text-gray-500">
                  Visit your local government's emergency management website for region-specific information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disaster-Specific Guides */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                  Detailed Resources
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Disaster-Specific Guides
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Comprehensive preparation information tailored to specific disaster types
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <div className="h-40 relative">
                    <Image 
                      src="/img (4).png" 
                      alt="Flood"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-4">Flood Preparedness</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Learn how to prepare for, survive during, and recover after flooding events.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600">
                      <li>Understand flood risks in your area</li>
                      <li>Prepare your home with flood barriers</li>
                      <li>Create an evacuation plan</li>
                      <li>Protect important documents</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/portal/flood-guide">
                        View Full Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 relative">
                    <Image 
                      src="/img (3).png" 
                      alt="Earthquake"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-4">Earthquake Preparedness</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Essential steps to take before, during, and after an earthquake.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600">
                      <li>Secure heavy furniture and appliances</li>
                      <li>Practice "Drop, Cover, and Hold On"</li>
                      <li>Know how to check for structural damage</li>
                      <li>Prepare for aftershocks</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/portal/earthquake-guide">
                        View Full Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 relative">
                    <Image 
                      src="/img (2).png" 
                      alt="Cyclone"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-4">Cyclone Preparedness</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Prepare for and stay safe during cyclones, hurricanes, and strong windstorms.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600">
                      <li>Strengthen your home's exterior</li>
                      <li>Create a cyclone evacuation kit</li>
                      <li>Understand warning systems</li>
                      <li>Plan for power outages</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/portal/cyclone-guide">
                        View Full Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 relative">
                    <Image 
                      src="/img (1).png" 
                      alt="Fire"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-4">Fire Safety</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Critical information on preventing and responding to both structure and wildfires.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600">
                      <li>Create defensible space around your home</li>
                      <li>Develop fire evacuation plans</li>
                      <li>Install and maintain smoke detectors</li>
                      <li>Learn firefighting basics</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/portal/fire-guide">
                        View Full Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to contribute to disaster preparedness?
              </h2>
              <p className="text-gray-600 mb-8">
                Join Kutumbakam's community of volunteers and help improve disaster 
                readiness and response in your community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/create-portal">
                    Create Relief Portal
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/#active-portals">
                    Become a Volunteer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
} 