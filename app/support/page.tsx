import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, FileText, HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-chakraBlue-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                Help & Resources
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Support Center
              </h1>
              <p className="text-xl text-gray-600">
                Find answers to your questions and get the assistance you need to use Kutumbakam effectively.
              </p>
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    className="pl-10 py-6 text-lg" 
                    placeholder="Search for help articles, FAQs, or topics..." 
                  />
                  <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How Can We Help You?
                </h2>
                <p className="text-gray-600">
                  Browse through our support categories to find the information you need.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-saffron-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-7 w-7 text-saffron" />
                    </div>
                    <CardTitle>General FAQs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Answers to common questions about Kutumbakam, our mission, and how our platform works.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-center">
                    <Button variant="outline">View FAQs</Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-indiaGreen-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-7 w-7 text-indiaGreen" />
                    </div>
                    <CardTitle>User Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Step-by-step instructions for using all features and functionality of the platform.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-center">
                    <Button variant="outline">Browse Guides</Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-chakraBlue-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-7 w-7 text-chakraBlue" />
                    </div>
                    <CardTitle>Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Need personalized assistance? Reach out to our dedicated support team directly.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-center">
                    <Button variant="outline">Contact Us</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Popular FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Popular Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Quick answers to the most common questions about using Kutumbakam
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <span className="mr-4 text-saffron text-2xl">Q.</span>
                      <span>How do I create a disaster relief portal?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <span className="mr-4 text-indiaGreen text-2xl">A.</span>
                      <p className="text-gray-600">
                        Creating a relief portal is simple. Click on the "Create Portal" button on the homepage, 
                        fill in the required information about the disaster, affected areas, and needed resources. 
                        Once submitted, your portal will be reviewed by our team and published, typically within 
                        24 hours. You can manage your portal through your account dashboard after creation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <span className="mr-4 text-saffron text-2xl">Q.</span>
                      <span>How can I volunteer for disaster relief efforts?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <span className="mr-4 text-indiaGreen text-2xl">A.</span>
                      <p className="text-gray-600">
                        To volunteer, navigate to the "Volunteer" section of our website and complete 
                        the registration form with your details and skills. You can either join an existing 
                        relief effort by browsing active portals or register as a general volunteer in our 
                        database. Once registered, portal administrators can contact you when your skills 
                        match their needs, or you can directly apply to specific calls for volunteers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <span className="mr-4 text-saffron text-2xl">Q.</span>
                      <span>How is donation money used and tracked?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <span className="mr-4 text-indiaGreen text-2xl">A.</span>
                      <p className="text-gray-600">
                        All donations made through Kutumbakam are tracked transparently. When you donate to a specific 
                        relief portal, the funds are directed to the organization managing that portal. Each portal 
                        displays a breakdown of how funds are allocated (e.g., food, shelter, medical) and provides 
                        regular updates on the impact. Administrative fees are capped at 5% to ensure the majority of 
                        your donation directly supports affected communities.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <span className="mr-4 text-saffron text-2xl">Q.</span>
                      <span>Is my personal information secure on the platform?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <span className="mr-4 text-indiaGreen text-2xl">A.</span>
                      <p className="text-gray-600">
                        Yes, we take data security very seriously. Kutumbakam employs industry-standard encryption 
                        and security protocols to protect all user data. We only collect information necessary for 
                        the functioning of the platform, and we never share your personal details with third parties 
                        without your explicit consent. For volunteers, only the information you agree to share is 
                        visible to portal administrators.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href="/faq">
                    View All FAQs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Contact Our Support Team
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is ready to help you with any questions or issues.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center border-t-4 border-t-chakraBlue">
                  <CardHeader>
                    <div className="mx-auto bg-chakraBlue-light p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-chakraBlue" />
                    </div>
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>Response within 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:support@kutumbakam.org" className="text-chakraBlue hover:underline">
                      support@kutumbakam.org
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="text-center border-t-4 border-t-saffron">
                  <CardHeader>
                    <div className="mx-auto bg-saffron-light p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Phone className="h-8 w-8 text-saffron" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>Available 9am-6pm IST, Mon-Fri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+911234567890" className="text-saffron hover:underline">
                      +91 1234 567 890
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="text-center border-t-4 border-t-indiaGreen">
                  <CardHeader>
                    <div className="mx-auto bg-indiaGreen-light p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-indiaGreen" />
                    </div>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>Instant assistance for urgent issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Your Name *
                        </label>
                        <Input id="name" placeholder="Full name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <Input id="email" type="email" placeholder="your.email@example.com" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject *
                      </label>
                      <Input id="subject" placeholder="What is your inquiry about?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your issue or question in detail"
                        rows={6}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="h-4 w-4 rounded border-gray-300 text-indiaGreen focus:ring-indiaGreen"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I consent to Kutumbakam processing my data to respond to my inquiry.
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Self-Help Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                  Self-Service
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Helpful Resources
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore our knowledge base articles, tutorials, and user guides
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <div className="flex items-center p-6">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-saffron-light rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-saffron" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        <Link href="/user-guide" className="hover:text-chakraBlue">
                          User Guides & Tutorials
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Step-by-step instructions for using all features of the platform
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="flex items-center p-6">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-indiaGreen-light rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-indiaGreen" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        <Link href="/best-practices" className="hover:text-chakraBlue">
                          Best Practices
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tips and recommendations for effective disaster response coordination
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="flex items-center p-6">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-chakraBlue-light rounded-full flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-chakraBlue" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        <Link href="/troubleshooting" className="hover:text-chakraBlue">
                          Troubleshooting
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Solutions to common issues and technical problems
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="flex items-center p-6">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-saffron-light rounded-full flex items-center justify-center">
                        <HelpCircle className="h-6 w-6 text-saffron" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        <Link href="/faq" className="hover:text-chakraBlue">
                          Frequently Asked Questions
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Comprehensive answers to common questions about the platform
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-chakraBlue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Technical Support?</h3>
                    <p className="text-gray-600 mb-4">
                      If you're experiencing technical issues or bugs with the platform, our developers would like to help.
                      Please describe the issue in detail, including what you were trying to do, what happened, and any error messages.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/report-issue">
                        Report a Technical Issue
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
} 