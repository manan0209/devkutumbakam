"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Heart, Download, Share2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Logo } from "@/components/logo"
import html2canvas from "html2canvas"

export function VolunteerRegistrationForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    age: "",
    gender: "",
    skills: [] as string[],
    availability: "",
    experience: "",
    emergencyContact: "",
    languages: [] as string[],
    medicalTraining: false,
    drivingLicense: false,
    vehicleAccess: false,
    specialNeeds: "",
    preferredAreas: [] as string[],
    additionalInfo: "",
  })

  const volunteerId = `V${Math.floor(Math.random() * 10000)}`

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const skills = [...prev.skills]
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter((s) => s !== skill) }
      } else {
        return { ...prev, skills: [...skills, skill] }
      }
    })
  }

  const toggleLanguage = (language: string) => {
    setFormData((prev) => {
      const languages = [...prev.languages]
      if (languages.includes(language)) {
        return { ...prev, languages: languages.filter((l) => l !== language) }
      } else {
        return { ...prev, languages: [...languages, language] }
      }
    })
  }

  const togglePreferredArea = (area: string) => {
    setFormData((prev) => {
      const areas = [...prev.preferredAreas]
      if (areas.includes(area)) {
        return { ...prev, preferredAreas: areas.filter((a) => a !== area) }
      } else {
        return { ...prev, preferredAreas: [...areas, area] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would submit the form data to an API
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current)
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `volunteer-card-${volunteerId}.png`
      link.click()
    }
  }

  const copyShareLink = () => {
    // In a real app, this would be a unique URL to the volunteer's profile
    const shareUrl = `https://kutumbakam.org/volunteer/${volunteerId}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (submitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-primary">Registration Successful</CardTitle>
          <CardDescription className="text-center">Thank you for volunteering with Kutumbakam</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-love-light rounded-full flex items-center justify-center">
              <CheckCircle className="text-love h-8 w-8" />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Volunteer ID: #{volunteerId}</AlertTitle>
            <AlertDescription>
              Please save this ID for reference. You&apos;ll need it when reporting for volunteer duties.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Volunteer Card</TabsTrigger>
              <TabsTrigger value="details">Registration Details</TabsTrigger>
            </TabsList>
            <TabsContent value="card" className="space-y-4">
              <div className="flex justify-center">
                <div
                  ref={cardRef}
                  className="w-full max-w-md bg-white border-2 border-primary rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="bg-primary text-white p-4 flex items-center justify-between">
                    <Logo size="sm" withTagline={false} />
                    <div className="text-right">
                      <div className="text-xs">Volunteer ID</div>
                      <div className="font-bold">#{volunteerId}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{formData.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">{formData.location}</div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Skills</div>
                        <div className="font-medium">
                          {formData.skills.slice(0, 3).join(", ")}
                          {formData.skills.length > 3 ? "..." : ""}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Languages</div>
                        <div className="font-medium">{formData.languages.join(", ")}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-xs text-gray-500">Availability:</div>
                      <div className="text-xs font-medium">{formData.availability}</div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-1 text-primary">
                        <Heart size={14} fill="currentColor" />
                        <span className="text-xs">Kutumbakam Volunteer</span>
                      </div>
                      <div className="text-xs text-gray-500">Registered: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" className="gap-2" onClick={downloadCard}>
                  <Download size={16} />
                  Download Card
                </Button>
                <Button className="gap-2" onClick={copyShareLink}>
                  <Share2 size={16} />
                  {copied ? "Link Copied!" : "Share"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Contact</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{formData.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Skills</p>
                    <p className="font-medium">{formData.skills.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Availability</p>
                    <p className="font-medium">{formData.availability}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-500 text-center">
            A coordinator will contact you with information about volunteer opportunities that match your skills and
            availability.
          </p>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="w-1/2" onClick={() => (window.location.href = "/")}>
              Return Home
            </Button>
            <Button className="w-1/2" onClick={() => (window.location.href = "/portal/1")}>
              View Active Portals
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Volunteer Registration</CardTitle>
        <CardDescription>Join our community of volunteers to help those affected by disasters</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter your city, district, or specific location"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="Enter your age"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input
                  id="emergency-contact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  placeholder="Name and phone number of emergency contact"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Skills (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medical-skill"
                      checked={formData.skills.includes("Medical")}
                      onCheckedChange={() => toggleSkill("Medical")}
                    />
                    <Label htmlFor="medical-skill">Medical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="logistics-skill"
                      checked={formData.skills.includes("Logistics")}
                      onCheckedChange={() => toggleSkill("Logistics")}
                    />
                    <Label htmlFor="logistics-skill">Logistics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rescue-skill"
                      checked={formData.skills.includes("Rescue")}
                      onCheckedChange={() => toggleSkill("Rescue")}
                    />
                    <Label htmlFor="rescue-skill">Rescue Operations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="communication-skill"
                      checked={formData.skills.includes("Communication")}
                      onCheckedChange={() => toggleSkill("Communication")}
                    />
                    <Label htmlFor="communication-skill">Communication</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cooking-skill"
                      checked={formData.skills.includes("Cooking")}
                      onCheckedChange={() => toggleSkill("Cooking")}
                    />
                    <Label htmlFor="cooking-skill">Cooking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="counseling-skill"
                      checked={formData.skills.includes("Counseling")}
                      onCheckedChange={() => toggleSkill("Counseling")}
                    />
                    <Label htmlFor="counseling-skill">Counseling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tech-skill"
                      checked={formData.skills.includes("Technical")}
                      onCheckedChange={() => toggleSkill("Technical")}
                    />
                    <Label htmlFor="tech-skill">Technical/IT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="teaching-skill"
                      checked={formData.skills.includes("Teaching")}
                      onCheckedChange={() => toggleSkill("Teaching")}
                    />
                    <Label htmlFor="teaching-skill">Teaching</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Languages Spoken</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hindi"
                      checked={formData.languages.includes("Hindi")}
                      onCheckedChange={() => toggleLanguage("Hindi")}
                    />
                    <Label htmlFor="hindi">Hindi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="english"
                      checked={formData.languages.includes("English")}
                      onCheckedChange={() => toggleLanguage("English")}
                    />
                    <Label htmlFor="english">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tamil"
                      checked={formData.languages.includes("Tamil")}
                      onCheckedChange={() => toggleLanguage("Tamil")}
                    />
                    <Label htmlFor="tamil">Tamil</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="telugu"
                      checked={formData.languages.includes("Telugu")}
                      onCheckedChange={() => toggleLanguage("Telugu")}
                    />
                    <Label htmlFor="telugu">Telugu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bengali"
                      checked={formData.languages.includes("Bengali")}
                      onCheckedChange={() => toggleLanguage("Bengali")}
                    />
                    <Label htmlFor="bengali">Bengali</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marathi"
                      checked={formData.languages.includes("Marathi")}
                      onCheckedChange={() => toggleLanguage("Marathi")}
                    />
                    <Label htmlFor="marathi">Marathi</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={formData.availability} onValueChange={(value) => handleChange("availability", value)}>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings only</SelectItem>
                    <SelectItem value="full-time">Full-time during emergencies</SelectItem>
                    <SelectItem value="on-call">On-call (as needed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Previous Volunteer Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  placeholder="Briefly describe any previous volunteer or relevant experience"
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Additional Qualifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medical-training"
                      checked={formData.medicalTraining}
                      onCheckedChange={(checked) => handleChange("medicalTraining", !!checked)}
                    />
                    <Label htmlFor="medical-training">I have medical training or certification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="driving-license"
                      checked={formData.drivingLicense}
                      onCheckedChange={(checked) => handleChange("drivingLicense", !!checked)}
                    />
                    <Label htmlFor="driving-license">I have a valid driving license</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vehicle-access"
                      checked={formData.vehicleAccess}
                      onCheckedChange={(checked) => handleChange("vehicleAccess", !!checked)}
                    />
                    <Label htmlFor="vehicle-access">I have access to a vehicle</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Areas to Volunteer</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="area-local"
                      checked={formData.preferredAreas.includes("Local")}
                      onCheckedChange={() => togglePreferredArea("Local")}
                    />
                    <Label htmlFor="area-local">Local (within my city/district)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="area-state"
                      checked={formData.preferredAreas.includes("State")}
                      onCheckedChange={() => togglePreferredArea("State")}
                    />
                    <Label htmlFor="area-state">Within my state</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="area-national"
                      checked={formData.preferredAreas.includes("National")}
                      onCheckedChange={() => togglePreferredArea("National")}
                    />
                    <Label htmlFor="area-national">Anywhere in the country</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="area-international"
                      checked={formData.preferredAreas.includes("International")}
                      onCheckedChange={() => togglePreferredArea("International")}
                    />
                    <Label htmlFor="area-international">International</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-needs">Special Needs or Accommodations</Label>
                <Textarea
                  id="special-needs"
                  value={formData.specialNeeds}
                  onChange={(e) => handleChange("specialNeeds", e.target.value)}
                  placeholder="Please mention if you have any special needs or require accommodations"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange("additionalInfo", e.target.value)}
                  placeholder="Any other information you'd like to share"
                  rows={2}
                />
              </div>

              <Alert className="bg-love-light border-love">
                <Heart className="h-4 w-4 text-love" />
                <AlertTitle>Thank you for volunteering</AlertTitle>
                <AlertDescription>
                  Your willingness to help makes a significant difference in disaster relief efforts.
                </AlertDescription>
              </Alert>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit">Complete Registration</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

