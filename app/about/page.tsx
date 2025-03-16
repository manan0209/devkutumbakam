import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Globe, Heart, MapPin, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-chakraBlue-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                Project Overview
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Kutumbakam
              </h1>
              <p className="text-xl text-gray-600">
                A disaster relief coordination platform developed by Manan Goel as part of his B.Tech CSE penultimate year project.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                    The Concept
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Creating a Platform for Disaster Response
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Kutumbakam, derived from the Sanskrit phrase "Vasudhaiva Kutumbakam" meaning "the world is one family," embodies the core belief that humanity must unite during times of crisis.
                  </p>
                  <p className="text-gray-600">
                    This platform aims to create a decentralized yet coordinated network for disaster preparedness, response, and recovery that transcends geographical, political, and social boundaries.
                  </p>
                </div>
                <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden">
                  <Image 
                    src="/img.png" 
                    alt="Kutumbakam disaster relief concept"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-center gap-12 mt-20">
                <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden">
                  <Image 
                    src="/img (1).png" 
                    alt="Disaster relief vision"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                    Project Vision
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Building Resilient Communities
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This project envisions a world where every community is prepared for disasters, where response is immediate and effective, and where recovery is supported by a coordinated network of resources and expertise.
                  </p>
                  <p className="text-gray-600">
                    Through technology, education, and collaboration, Kutumbakam aims to demonstrate how interconnected communities can better withstand and recover from catastrophes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                  Guiding Principles
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Core Values of the Project
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These fundamental principles have guided the development of Kutumbakam.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 border-l-4 border-l-saffron">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-10 h-10 bg-saffron-light rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-saffron" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Humanity First</h3>
                      <p className="text-gray-600">
                        Human dignity and wellbeing are at the center of all our efforts. We believe in the equal worth of every human life and prioritize the needs of the most vulnerable.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border-l-4 border-l-indiaGreen">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-10 h-10 bg-indiaGreen-light rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-indiaGreen" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency & Accountability</h3>
                      <p className="text-gray-600">
                        The platform is designed with complete openness in decision-making, resource allocation, and impact reporting, holding all participants accountable to the communities they serve.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border-l-4 border-l-chakraBlue">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-10 h-10 bg-chakraBlue-light rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-chakraBlue" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Inclusivity</h3>
                      <p className="text-gray-600">
                        The platform embraces diversity and aims to be accessible to all, regardless of geography, language, culture, or socioeconomic status.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border-l-4 border-l-saffron">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-10 h-10 bg-saffron-light rounded-full flex items-center justify-center">
                        <Target className="h-5 w-5 text-saffron" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation & Adaptability</h3>
                      <p className="text-gray-600">
                        Kutumbakam continuously evolves its approaches and embraces emerging technologies to improve disaster response and recovery mechanisms.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border-l-4 border-l-indiaGreen md:col-span-2">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-10 h-10 bg-indiaGreen-light rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-indiaGreen" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Community-Led Action</h3>
                      <p className="text-gray-600">
                        The platform empowers local communities to lead their own disaster preparedness and response efforts, recognizing that they understand their needs best.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Project Development */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Development
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Project Status
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Kutumbakam was developed in 24 hours by Manan Goel for a hackathon on March 15, 2025, as part of his B.Tech CSE penultimate year studies.
                </p>
              </div>
              
              <Card className="p-8 border-2 border-dashed border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="w-24 h-24 mx-auto bg-chakraBlue-light rounded-full flex items-center justify-center">
                      <Code className="h-12 w-12 text-chakraBlue" />
                    </div>
                  </div>
                  <div className="md:w-2/3 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Hackathon Development (24 Hours)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indiaGreen mr-2 mt-0.5 flex-shrink-0" />
                        <span>Project concept and architecture design (March 15, 2025)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indiaGreen mr-2 mt-0.5 flex-shrink-0" />
                        <span>Frontend development and UI implementation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indiaGreen mr-2 mt-0.5 flex-shrink-0" />
                        <span>Core functionality for disaster portal creation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indiaGreen mr-2 mt-0.5 flex-shrink-0" />
                        <span>User authentication and profile management</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indiaGreen mr-2 mt-0.5 flex-shrink-0" />
                        <span>Resource coordination and volunteer management modules</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2 mt-0.5 flex-shrink-0" />
                        <span>Mobile application development (Future Enhancement)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Target Use Cases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-saffron mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Flood Response Coordination</h4>
                      <p className="text-sm text-gray-600">Enabling communities to quickly organize evacuation, shelter, and resource distribution during flooding events.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-saffron mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Earthquake Relief Management</h4>
                      <p className="text-sm text-gray-600">Facilitating volunteer coordination and resource tracking for communities affected by earthquakes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-saffron mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Cyclone Preparedness</h4>
                      <p className="text-sm text-gray-600">Helping coastal communities prepare for and respond to cyclone threats through early warning and coordination.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-saffron mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Fire Emergency Response</h4>
                      <p className="text-sm text-gray-600">Supporting community-based fire response with resource tracking and needs assessment tools.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Developer */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                  About the Developer
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Meet the Creator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Learn about the student behind the Kutumbakam project.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/3">
                  <Card className="overflow-hidden">
                    <div className="h-64 relative">
                      <Image 
                        src="/img (5).png" 
                        alt="Manan Goel"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="text-center p-6">
                      <h3 className="text-lg font-semibold text-gray-900">Manan Goel</h3>
                      <p className="text-sm text-gray-500 mb-3">B.Tech CSE Student</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About Manan</h3>
                  <p className="text-gray-600 mb-4">
                    Manan Goel is a penultimate year B.Tech CSE student who developed the Kutumbakam platform during a 24-hour hackathon on March 15, 2025. Passionate about using technology to address humanitarian challenges, he created this comprehensive disaster response coordination system in a single day.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Inspired by the challenges faced during past natural disasters in India, Manan conceptualized and built this platform to bring together communities, volunteers, and resources in a coordinated yet decentralized system, demonstrating the potential for rapid development of impactful humanitarian technology.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href="https://github.com/manan0209" target="_blank" rel="noopener noreferrer">
                        GitHub
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href="mailto:contact@manan.dev" target="_blank" rel="noopener noreferrer">
                        Contact
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                  Technology Stack
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Built with Modern Technologies
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Developed within a 24-hour hackathon timeframe, Kutumbakam leverages the latest web technologies for rapid deployment and scalability.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">Next.js</p>
                    <p className="text-sm text-gray-500">Frontend Framework</p>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">Firebase</p>
                    <p className="text-sm text-gray-500">Backend & Database</p>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">TailwindCSS</p>
                    <p className="text-sm text-gray-500">Styling</p>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">TypeScript</p>
                    <p className="text-sm text-gray-500">Programming Language</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-saffron to-chakraBlue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Join the Project
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Interested in the concept? Explore the platform's features or provide feedback to help improve future versions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-chakraBlue hover:bg-gray-100" asChild>
                  <Link href="/volunteer">
                    Explore Features
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/create-portal">
                    Try Creating a Portal
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
