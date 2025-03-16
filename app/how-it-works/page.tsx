import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Package, MessageSquare, BarChart, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">How It Works</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Communities Through Coordination
              </h1>
              <p className="text-xl text-gray-600">
                Kutumbakam provides a structured yet flexible platform for disaster relief coordination, making it easy
                for anyone to create, join, or contribute to relief efforts.
              </p>
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">The Process</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">A Simple, Effective Approach</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform follows a clear process to ensure effective coordination and transparency
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>

              {/* Step 1 */}
              <div className="relative z-10 mb-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <Badge className="mb-2 bg-saffron text-white hover:bg-saffron-dark">Step 1</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Create a Relief Portal</h3>
                    <p className="text-gray-600">
                      Anyone can create a disaster relief portal by providing essential information about the disaster,
                      affected areas, and coordination details.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-primary flex items-center justify-center z-10">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Creating a relief portal"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 mb-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0 md:order-1 md:hidden">
                    <Badge className="mb-2 bg-indiaGreen text-white hover:bg-indiaGreen-dark">Step 2</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Define Resource Needs</h3>
                    <p className="text-gray-600">
                      Specify what resources and volunteer assistance are needed using our predefined categories for
                      clarity and efficiency.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 md:order-0">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Defining resource needs"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-secondary flex items-center justify-center z-10 md:order-1">
                    <span className="text-secondary font-bold">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 md:order-2 hidden md:block">
                    <Badge className="mb-2 bg-indiaGreen text-white hover:bg-indiaGreen-dark">Step 2</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Define Resource Needs</h3>
                    <p className="text-gray-600">
                      Specify what resources and volunteer assistance are needed using our predefined categories for
                      clarity and efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 mb-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <Badge className="mb-2 bg-chakraBlue text-white hover:bg-chakraBlue-dark">Step 3</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Coordinate Volunteers</h3>
                    <p className="text-gray-600">
                      Volunteers can join the portal, indicate their skills and availability, and be assigned to
                      specific tasks or areas.
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-accent flex items-center justify-center z-10">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Coordinating volunteers"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0 md:order-1 md:hidden">
                    <Badge className="mb-2 bg-gray-500 text-white hover:bg-gray-600">Step 4</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Track & Update</h3>
                    <p className="text-gray-600">
                      Monitor progress through real-time dashboards and updates, ensuring transparency and effective
                      resource allocation.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 md:order-0">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Tracking and updating"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-500 flex items-center justify-center z-10 md:order-1">
                    <span className="text-gray-500 font-bold">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 md:order-2 hidden md:block">
                    <Badge className="mb-2 bg-gray-500 text-white hover:bg-gray-600">Step 4</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Track & Update</h3>
                    <p className="text-gray-600">
                      Monitor progress through real-time dashboards and updates, ensuring transparency and effective
                      resource allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">Platform Features</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tools for Effective Coordination</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the key features that make Kutumbakam a powerful platform for disaster relief coordination
              </p>
            </div>

            <Tabs defaultValue="portal-creation" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="portal-creation">Portal Creation</TabsTrigger>
                <TabsTrigger value="resource-management">Resource Management</TabsTrigger>
                <TabsTrigger value="volunteer-coordination">Volunteer Coordination</TabsTrigger>
                <TabsTrigger value="real-time-updates">Real-time Updates</TabsTrigger>
              </TabsList>

              <TabsContent value="portal-creation" className="p-6 bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Portal Creation</h3>
                    <p className="text-gray-600 mb-4">
                      Our step-by-step portal creation process makes it easy for anyone to set up a coordination hub for
                      disaster relief efforts, regardless of technical expertise.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Guided setup process with clear instructions</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Customizable portal details and resource categories</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">
                          Multiple coordination methods (platform messaging, WhatsApp, etc.)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Automatic listing on the main Kutumbakam platform</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button className="gap-2 bg-primary hover:bg-saffron-dark">
                        <Plus size={16} />
                        Create a Portal
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Portal creation interface"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resource-management" className="p-6 bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Efficient Resource Management</h3>
                    <p className="text-gray-600 mb-4">
                      Our platform makes it easy to track, allocate, and manage resources needed for disaster relief
                      efforts.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Package className="text-secondary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Predefined categories for common relief supplies</span>
                      </li>
                      <li className="flex items-start">
                        <Package className="text-secondary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Real-time tracking of resource fulfillment</span>
                      </li>
                      <li className="flex items-start">
                        <Package className="text-secondary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Location-specific resource allocation</span>
                      </li>
                      <li className="flex items-start">
                        <Package className="text-secondary mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Prioritization of urgent needs</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button className="gap-2 bg-secondary hover:bg-indiaGreen-dark">
                        Learn About Resource Management
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Resource management interface"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="volunteer-coordination" className="p-6 bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Volunteer Coordination</h3>
                    <p className="text-gray-600 mb-4">
                      Effectively manage volunteer efforts to maximize impact and avoid duplication of work.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Users className="text-accent mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Skill-based volunteer matching</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="text-accent mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Volunteer check-in and activity tracking</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="text-accent mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Team formation and task assignment</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="text-accent mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Communication tools for volunteer coordination</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button className="gap-2 bg-accent hover:bg-chakraBlue-dark">Become a Volunteer</Button>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Volunteer coordination interface"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="real-time-updates" className="p-6 bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Updates</h3>
                    <p className="text-gray-600 mb-4">
                      Stay informed with the latest information and progress updates on relief efforts.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Clock className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Live activity feed of portal updates</span>
                      </li>
                      <li className="flex items-start">
                        <MessageSquare className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Announcement system for critical information</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Visual dashboards showing progress and needs</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">Subscription options for important updates</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button className="gap-2 bg-gray-700 hover:bg-gray-800">View Sample Dashboard</Button>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Real-time updates dashboard"
                      width={500}
                      height={400}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* User Roles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">User Roles</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Different Users Can Participate</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kutumbakam is designed for various stakeholders in disaster relief efforts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-saffron-light border-none">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Relief Coordinators</h3>
                  <p className="text-gray-700 mb-4">
                    Individuals or organizations leading relief efforts who need a platform to coordinate resources and
                    volunteers.
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Create and manage relief portals</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Define resource needs and priorities</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Coordinate volunteer assignments</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Post updates and announcements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-indiaGreen-light border-none">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Volunteers</h3>
                  <p className="text-gray-700 mb-4">
                    Individuals who want to contribute their time, skills, and effort to disaster relief activities.
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Users className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Browse and join active relief portals</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Register skills and availability</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Receive task assignments</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Log activities and provide updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-chakraBlue-light border-none">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Resource Providers</h3>
                  <p className="text-gray-700 mb-4">
                    Individuals, organizations, or businesses that can contribute supplies, funds, or other resources.
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Package className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>View specific resource needs</span>
                    </li>
                    <li className="flex items-start">
                      <Package className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Pledge and track resource contributions</span>
                    </li>
                    <li className="flex items-start">
                      <Package className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Coordinate delivery logistics</span>
                    </li>
                    <li className="flex items-start">
                      <Package className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Receive acknowledgment and impact reports</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">FAQs</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Common questions about using the Kutumbakam platform</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do I need technical expertise to create a relief portal?
                  </h3>
                  <p className="text-gray-600">
                    No, our platform is designed to be user-friendly and accessible to everyone. The step-by-step
                    creation process guides you through each stage with clear instructions and examples.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How does Kutumbakam ensure the legitimacy of relief portals?
                  </h3>
                  <p className="text-gray-600">
                    While we maintain an open platform to enable rapid response, we have verification mechanisms in
                    place. Users can report suspicious activity, and our team reviews portals regularly. We also
                    encourage transparency through detailed portal information and coordinator contact details.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I use Kutumbakam for non-disaster community initiatives?
                  </h3>
                  <p className="text-gray-600">
                    While our platform is optimized for disaster relief coordination, it can be adapted for other
                    community initiatives that require resource coordination and volunteer management. Contact us to
                    discuss your specific use case.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a cost to use Kutumbakam?</h3>
                  <p className="text-gray-600">
                    Kutumbakam is free to use for basic disaster relief coordination. We offer premium features for
                    organizations with advanced needs, but our core functionality is always available at no cost to
                    ensure accessibility during crises.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How can I get support if I encounter issues?
                  </h3>
                  <p className="text-gray-600">
                    We offer multiple support channels, including in-platform help resources, email support, and a
                    community forum where users can share experiences and solutions. For urgent issues related to active
                    disaster relief, we provide priority support.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Have more questions about how Kutumbakam works?</p>
              <Link href="/contact">
                <Button className="gap-2 bg-primary hover:bg-saffron-dark">Contact Our Support Team</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-saffron-light via-white to-chakraBlue-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join the Kutumbakam community and be part of a movement that&apos;s transforming disaster relief
                coordination.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="gap-2 bg-primary hover:bg-saffron-dark">
                  <Plus size={18} />
                  Create Relief Portal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-saffron-light hover:text-primary"
                >
                  Explore Active Portals
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

