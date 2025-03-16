import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                Contact
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600">
                Have questions about Kutumbakam or want to collaborate? I&apos;d
                love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feedback">
                              Project Feedback
                            </SelectItem>
                            <SelectItem value="feature">
                              Feature Suggestion
                            </SelectItem>
                            <SelectItem value="collaboration">
                              Collaboration Opportunity
                            </SelectItem>
                            <SelectItem value="hackathon">
                              Hackathon Question
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please share your thoughts, questions or suggestions"
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-saffron-dark"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Developer Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">manangoel0209@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Github className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">GitHub</h3>
                        <p className="text-gray-600">github.com/manan0209</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Linkedin className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <p className="text-gray-600">
                          linkedin.com/in/curiosmanan
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Kutumbakam was developed as part of a hackathon addressing
                      the challenge of disaster relief coordination. The project
                      is a prototype demonstrating potential solutions.
                    </p>
                    <Button className="w-full bg-primary hover:bg-saffron-dark">
                      View Project Repository
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about this hackathon project
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is this a real product that&apos;s currently being used?
                  </h3>
                  <p className="text-gray-600">
                    Kutumbakam is currently a prototype developed for a
                    hackathon. While it demonstrates functional concepts for
                    disaster relief coordination, it&apos;s not yet deployed for
                    actual disaster management.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I contribute to this project?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! This is an open-source project and contributions
                    are welcome. Please reach out through the contact form or
                    visit the GitHub repository to learn how you can get
                    involved.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What technologies were used to build Kutumbakam?
                  </h3>
                  <p className="text-gray-600">
                    This project was built using Next.js, Tailwind CSS, and
                    Shadcn UI components. It features a responsive design and
                    focuses on accessibility to ensure the platform can be used
                    by anyone during disaster situations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
