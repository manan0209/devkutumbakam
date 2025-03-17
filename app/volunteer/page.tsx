"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VolunteerShareCard } from "@/components/volunteer/volunteer-share-card";
import { useAuth } from "@/lib/auth-context";
import { getPortal, registerVolunteer } from "@/lib/db";
import { Timestamp } from "firebase/firestore";
import { Award, Clock, Coffee, Heart, MapPin, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the Volunteer interface
interface Volunteer {
  id: string;
  userId: string;
  portalId: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  availability: string;
  createdAt?: Timestamp; // This is from Firebase timestamp
  registeredAt: Timestamp | null;
  status?: "active" | "inactive";
}

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [portalId, setPortalId] = useState("");
  const [portalTitle, setPortalTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [registeredVolunteer, setRegisteredVolunteer] =
    useState<Volunteer | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout | null = null;

    if (registeredVolunteer) {
      redirectTimer = setTimeout(() => {
        router.push(`/portal/${registeredVolunteer.portalId}`);
      }, 10000);
    }
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [registeredVolunteer, router]);

  useEffect(() => {
    const id = searchParams.get("portalId");
    if (id) {
      setPortalId(id);
      fetchPortalDetails(id);
    }

    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [searchParams, user]);

  const fetchPortalDetails = async (id: string) => {
    setLoadingPortal(true);
    try {
      const portal = await getPortal(id);
      if (portal) {
        setPortalTitle(portal.title);
      }
    } catch (error) {
      console.error("Error fetching portal details:", error);
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name || !email || !portalId || skills.length === 0 || !availability) {
      setError("Please fill in all required fields");
      return;
    }

    if (!user) {
      setError("You need to be logged in to register as a volunteer");
      router.push(`/login?redirect=/volunteer?portalId=${portalId}`);
      return;
    }

    try {
      setLoading(true);
      const volunteer = {
        userId: user.uid,
        portalId,
        name,
        email,
        phone: phone || "",
        skills,
        availability,
        registeredAt: new Date(),
      };

      const registeredVolunteer = await registerVolunteer(volunteer);
      setSuccess(
        `Thank you for volunteering! You have been registered for ${portalTitle}.`
      );
      setRegisteredVolunteer(registeredVolunteer as unknown as Volunteer);
    } catch (error) {
      console.error("Error registering volunteer:", error);
      setError("An error occurred while registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-chakraBlue-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                Join Our Community
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Become a Kutumbakam Volunteer
              </h1>
              <p className="text-xl text-gray-600">
                Make a real difference in disaster-affected communities by contributing your time, skills, and compassion.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <a href="#volunteer-form">Apply to Volunteer</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Why Volunteer
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The Impact of Your Contribution
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  When you volunteer with Kutumbakam, you become part of a global family working together to build resilience and provide relief during critical times.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-chakraBlue-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-6 w-6 text-chakraBlue" />
                    </div>
                    <CardTitle>Save Lives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Your direct assistance can make the difference between life and death in emergency situations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-saffron-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-saffron" />
                    </div>
                    <CardTitle>Build Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Strengthen social bonds and create resilient networks that persist beyond individual disasters.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indiaGreen-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6 text-indiaGreen" />
                    </div>
                    <CardTitle>Develop Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gain valuable experience in crisis management, leadership, and specialized disaster response.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                  Volunteer Programs
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ways You Can Help
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We offer various volunteering programs to match your skills, availability, and interests.
                </p>
              </div>
              
              <div className="space-y-8">
                <Card>
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image 
                        src="/img.png" 
                        alt="Emergency Response Volunteer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-900">
                            Emergency Response Team
                          </CardTitle>
                          <Badge variant="outline" className="text-indiaGreen border-indiaGreen">
                            High Impact
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center mt-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>On-call commitment required</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Join our frontline team that responds directly to disasters, providing immediate relief, rescue operations, and essential services to affected communities.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">First Aid</Badge>
                          <Badge variant="secondary">Search & Rescue</Badge>
                          <Badge variant="secondary">Logistics</Badge>
                          <Badge variant="secondary">Field Operations</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#volunteer-form">
                            Apply for Emergency Response
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image 
                        src="/img (1).png" 
                        alt="Technical Support Volunteer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-900">
                            Technical Support Team
                          </CardTitle>
                          <Badge variant="outline" className="text-chakraBlue border-chakraBlue">
                            Remote Possible
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center mt-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Flexible hours, 5-10 hours/week</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Support our platform by contributing technical skills to improve our disaster management tools, help with data analysis, or assist with technological solutions.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Software Development</Badge>
                          <Badge variant="secondary">Data Analysis</Badge>
                          <Badge variant="secondary">GIS Mapping</Badge>
                          <Badge variant="secondary">IT Support</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#volunteer-form">
                            Apply for Technical Support
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image 
                        src="/img (2).png" 
                        alt="Community Outreach Volunteer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-900">
                            Community Outreach
                          </CardTitle>
                          <Badge variant="outline" className="text-saffron border-saffron">
                            High Flexibility
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center mt-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>2-5 hours/week, flexible schedule</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Help spread awareness about disaster preparedness, organize local events, conduct training sessions, and build community resilience before disasters strike.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Education</Badge>
                          <Badge variant="secondary">Event Planning</Badge>
                          <Badge variant="secondary">Social Media</Badge>
                          <Badge variant="secondary">Community Building</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#volunteer-form">
                            Apply for Community Outreach
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                  Benefits
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What You'll Gain
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Volunteering with Kutumbakam is a mutually rewarding experience that offers many benefits.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indiaGreen-light rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-indiaGreen" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Training</h3>
                    <p className="text-gray-600">Access specialized disaster response training and certifications recognized across sectors.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-saffron-light rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-saffron" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Network Building</h3>
                    <p className="text-gray-600">Connect with like-minded individuals, professionals, and leaders in disaster management.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-chakraBlue-light rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-chakraBlue" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recognition</h3>
                    <p className="text-gray-600">Your contributions will be acknowledged through our volunteer recognition program.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indiaGreen-light rounded-full flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-indiaGreen" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Growth</h3>
                    <p className="text-gray-600">Develop resilience, leadership, and crisis management skills that benefit all areas of life.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="volunteer-form" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Join Us
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Volunteer Application
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Take the first step toward making a difference. Fill out the form below to express your interest.
                </p>
              </div>
              
              {registeredVolunteer ? (
                <Card className="overflow-hidden">
                  <CardHeader className="text-center bg-success-light pb-8">
                    <div className="mx-auto mb-4 bg-success text-white rounded-full p-3 inline-flex">
                      <Heart className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl text-success">Registration Successful!</CardTitle>
                    <CardDescription>
                      Thank you for volunteering with {portalTitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pt-8">
                    <div className="mb-8">
                      <p className="text-center mb-6">
                        Your skills and support will make a real difference in this relief effort. 
                        You can now access the portal to see how you can help.
                      </p>
                      
                      {registeredVolunteer && (
                        <div className="flex flex-col items-center gap-4">
                          <VolunteerShareCard 
                            volunteer={registeredVolunteer}
                            portalName={portalTitle}
                            className="w-full max-w-md"
                          />
                          
                          <div className="flex gap-4 mt-4">
                            <Button asChild>
                              <Link href={`/portal/${portalId}`}>
                                Go to Portal
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="lg:w-2/3">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Volunteer Registration
                      </h1>
                      {portalTitle && (
                        <p className="text-xl text-gray-600 mb-2">
                          Join the volunteer team for: <span className="font-medium text-primary">{portalTitle}</span>
                        </p>
                      )}
                      <p className="text-gray-600">
                        Thank you for stepping forward to help! Fill out the form below to register as a volunteer.
                      </p>
                    </div>

                    <div className="lg:w-1/3 bg-love-light rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-love" />
                        Why Volunteer?
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 mr-2 text-gray-700 mt-0.5" />
                          <span>Make a direct impact on affected communities</span>
                        </li>
                        <li className="flex items-start">
                          <Users className="h-4 w-4 mr-2 text-gray-700 mt-0.5" />
                          <span>Join a network of compassionate individuals</span>
                        </li>
                        <li className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 text-gray-700 mt-0.5" />
                          <span>Flexible volunteering based on your availability</span>
                        </li>
                        <li className="flex items-start">
                          <Award className="h-4 w-4 mr-2 text-gray-700 mt-0.5" />
                          <span>Gain valuable experience in disaster response</span>
                        </li>
                        <li className="flex items-start">
                          <Coffee className="h-4 w-4 mr-2 text-gray-700 mt-0.5" />
                          <span>Connect with like-minded volunteers</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                      {error}
                    </div>
                  )}

                  {success && !registeredVolunteer && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
                      {success}
                    </div>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Registration Form</CardTitle>
                      <CardDescription>
                        Please provide your details to register as a volunteer
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                              First Name *
                            </label>
                            <Input id="first-name" placeholder="Your first name" required />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                              Last Name *
                            </label>
                            <Input id="last-name" placeholder="Your last name" required />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email Address *
                            </label>
                            <Input id="email" type="email" placeholder="your.email@example.com" required />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                              Phone Number *
                            </label>
                            <Input id="phone" placeholder="+91 1234567890" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium text-gray-700">
                            Location *
                          </label>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <Input id="location" placeholder="City, State, Country" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="volunteer-program" className="text-sm font-medium text-gray-700">
                            Preferred Volunteer Program *
                          </label>
                          <select 
                            id="volunteer-program" 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            required
                          >
                            <option value="" disabled selected>Select a program</option>
                            <option value="emergency-response">Emergency Response Team</option>
                            <option value="technical-support">Technical Support Team</option>
                            <option value="community-outreach">Community Outreach</option>
                            <option value="multiple">Interested in Multiple Programs</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="skills" className="text-sm font-medium text-gray-700">
                            Relevant Skills and Experience
                          </label>
                          <Textarea 
                            id="skills" 
                            placeholder="Please describe any relevant skills, certifications, or experience you have that could be valuable."
                            rows={4}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="motivation" className="text-sm font-medium text-gray-700">
                            Motivation to Volunteer *
                          </label>
                          <Textarea 
                            id="motivation" 
                            placeholder="Why do you want to volunteer with Kutumbakam? What motivates you to help in disaster relief?"
                            rows={4}
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
                            I agree to the volunteer terms and conditions and consent to being contacted about volunteer opportunities.
                          </label>
                        </div>
                        
                        <div>
                          <Button type="submit" size="lg" className="w-full">
                            Submit Application
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                  Volunteer Stories
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Hear From Our Volunteers
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Read about the experiences of those who have already made a difference.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <Image 
                          src="/volunteer1.png" 
                          alt="Volunteer"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-600 italic mb-4">
                        "Volunteering with Kutumbakam during the 2023 floods was life-changing. The team's dedication and the impact we had on affected communities gave me a new perspective on what it means to truly help others."
                      </p>
                      <div>
                        <h4 className="font-semibold text-gray-900">Rohit Sharma</h4>
                        <p className="text-sm text-gray-500">Emergency Response Volunteer, Mumbai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <Image 
                          src="/volunteer2.png" 
                          alt="Volunteer"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-600 italic mb-4">
                        "As a technical volunteer, I've been able to use my software development skills to help build tools that save lives. It's incredibly rewarding to see how technology can make such a difference in disaster response."
                      </p>
                      <div>
                        <h4 className="font-semibold text-gray-900">Priya Patel</h4>
                        <p className="text-sm text-gray-500">Technical Support Volunteer, Bangalore</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
