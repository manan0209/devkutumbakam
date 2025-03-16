"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle, Heart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RequestAssistanceForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    disasterType: "",
    urgency: "",
    peopleAffected: "",
    assistanceTypes: [] as string[],
    medicalNeeds: false,
    foodNeeds: false,
    shelterNeeds: false,
    evacuationNeeds: false,
    description: "",
    contactPreference: "phone",
  })

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAssistanceType = (type: string) => {
    setFormData((prev) => {
      const types = [...prev.assistanceTypes]
      if (types.includes(type)) {
        return { ...prev, assistanceTypes: types.filter((t) => t !== type) }
      } else {
        return { ...prev, assistanceTypes: [...types, type] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would submit the form data to an API
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-primary">Assistance Request Submitted</CardTitle>
          <CardDescription className="text-center">Your request has been received</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-love-light rounded-full flex items-center justify-center">
              <CheckCircle className="text-love h-8 w-8" />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request ID: #A{Math.floor(Math.random() * 10000)}</AlertTitle>
            <AlertDescription>Please save this ID for reference. Our team will contact you shortly.</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Request Details</h3>
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
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{formData.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Disaster Type</p>
                <p className="font-medium">{formData.disasterType}</p>
              </div>
              <div>
                <p className="text-gray-500">Assistance Types</p>
                <p className="font-medium">{formData.assistanceTypes.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-500">Urgency</p>
                <p className="font-medium">{formData.urgency}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-500 text-center">
            A relief coordinator will contact you via your preferred method ({formData.contactPreference}) as soon as
            possible.
          </p>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="w-1/2" onClick={() => setSubmitted(false)}>
              Edit Request
            </Button>
            <Button className="w-1/2" onClick={() => (window.location.href = "/")}>
              Return Home
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request Assistance</CardTitle>
        <CardDescription>
          Please provide details about your situation so we can coordinate the appropriate help
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
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
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email address"
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

              <div className="space-y-2">
                <Label>Contact Preference</Label>
                <RadioGroup
                  defaultValue={formData.contactPreference}
                  onValueChange={(value) => handleChange("contactPreference", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone-pref" />
                    <Label htmlFor="phone-pref">Phone Call</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="sms-pref" />
                    <Label htmlFor="sms-pref">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-pref" />
                    <Label htmlFor="email-pref">Email</Label>
                  </div>
                </RadioGroup>
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
                <Label htmlFor="disaster-type">Disaster Type</Label>
                <Select value={formData.disasterType} onValueChange={(value) => handleChange("disasterType", value)}>
                  <SelectTrigger id="disaster-type">
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="cyclone">Cyclone/Hurricane</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="landslide">Landslide</SelectItem>
                    <SelectItem value="drought">Drought</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)}>
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - Immediate help needed</SelectItem>
                      <SelectItem value="urgent">Urgent - Help needed within hours</SelectItem>
                      <SelectItem value="moderate">Moderate - Help needed within days</SelectItem>
                      <SelectItem value="low">Low - Planning for future needs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people-affected">Number of People Affected</Label>
                  <Input
                    id="people-affected"
                    value={formData.peopleAffected}
                    onChange={(e) => handleChange("peopleAffected", e.target.value)}
                    placeholder="Approximate number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type of Assistance Needed (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medical"
                      checked={formData.assistanceTypes.includes("medical")}
                      onCheckedChange={() => toggleAssistanceType("medical")}
                    />
                    <Label htmlFor="medical">Medical Assistance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="food"
                      checked={formData.assistanceTypes.includes("food")}
                      onCheckedChange={() => toggleAssistanceType("food")}
                    />
                    <Label htmlFor="food">Food & Water</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shelter"
                      checked={formData.assistanceTypes.includes("shelter")}
                      onCheckedChange={() => toggleAssistanceType("shelter")}
                    />
                    <Label htmlFor="shelter">Shelter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="evacuation"
                      checked={formData.assistanceTypes.includes("evacuation")}
                      onCheckedChange={() => toggleAssistanceType("evacuation")}
                    />
                    <Label htmlFor="evacuation">Evacuation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rescue"
                      checked={formData.assistanceTypes.includes("rescue")}
                      onCheckedChange={() => toggleAssistanceType("rescue")}
                    />
                    <Label htmlFor="rescue">Rescue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="supplies"
                      checked={formData.assistanceTypes.includes("supplies")}
                      onCheckedChange={() => toggleAssistanceType("supplies")}
                    />
                    <Label htmlFor="supplies">Essential Supplies</Label>
                  </div>
                </div>
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
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Please provide any additional details about your situation and specific needs"
                  rows={5}
                />
              </div>

              <Alert className="bg-love-light border-love">
                <Heart className="h-4 w-4 text-love" />
                <AlertTitle>Your privacy is important</AlertTitle>
                <AlertDescription>
                  Your information will only be shared with verified relief coordinators to facilitate assistance.
                </AlertDescription>
              </Alert>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

