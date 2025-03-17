"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VolunteerShareCard } from "@/components/volunteer/volunteer-share-card"
import { useAuth } from "@/lib/auth-context"
import { registerVolunteer, Volunteer } from "@/lib/db"
import { AlertTriangle, Heart } from "lucide-react"
import { useState } from "react"
import { Badge } from "../ui/badge"

interface VolunteerRegistrationDialogProps {
  portalId: string
  portalTitle: string
  buttonVariant?: "primary" | "outline" | "secondary"
  buttonSize?: "default" | "sm" | "lg"
  className?: string
}

export function VolunteerRegistrationDialog({
  portalId,
  portalTitle,
  buttonVariant = "primary",
  buttonSize = "default",
  className = "",
}: VolunteerRegistrationDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [availability, setAvailability] = useState<string>("Flexible")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registeredVolunteer, setRegisteredVolunteer] = useState<Volunteer | null>(null)
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const skillOptions = [
    "First Aid",
    "Medical",
    "Search & Rescue", 
    "Logistics",
    "Transportation",
    "Food Preparation",
    "Communications",
    "Technical Support",
    "Languages",
    "Coordination"
  ]

  const availabilityOptions = [
    "Flexible",
    "Weekdays",
    "Weekends",
    "Evenings",
    "Full-time",
    "On-call"
  ]

  const handleSkillToggle = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    )
  }

  const handleRegister = async () => {
    setError("")
    
    if (!user) {
      setError("Please sign in to register as a volunteer")
      return
    }

    if (!name) {
      setName(user.displayName || "")
    }
    
    if (!email) {
      setEmail(user.email || "")
    }

    if (skills.length === 0) {
      setError("Please select at least one skill")
      return
    }

    try {
      setLoading(true)
      const volunteer = {
        userId: user.uid,
        portalId,
        name: name || user.displayName || "",
        email: email || user.email || "",
        phone,
        skills,
        availability,
        registeredAt: new Date()
      }

      const registeredVolunteeer = await registerVolunteer(volunteer)
      setRegisteredVolunteer(registeredVolunteeer as unknown as Volunteer)
      setSuccess(true)
    } catch (error) {
      console.error("Error registering volunteer:", error)
      setError("Failed to register. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant === "primary" ? "default" : buttonVariant === "outline" ? "outline" : "secondary"}
          size={buttonSize}
          className={`gap-2 ${buttonVariant === "primary" ? "bg-love hover:bg-love-dark" : ""} ${className}`}
        >
          <Heart size={buttonSize === "sm" ? 14 : 16} />
          Volunteer Now
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        {success && registeredVolunteer ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 bg-green-100 text-green-700 rounded-full p-3 inline-flex">
                <Heart className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center">Thank You for Volunteering!</DialogTitle>
              <DialogDescription className="text-center">
                You have successfully registered as a volunteer for {portalTitle}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center py-4">
              <VolunteerShareCard 
                volunteer={registeredVolunteer}
                portalName={portalTitle}
                variant="inline"
                className="mb-4"
              />
              
              <p className="text-sm text-center text-muted-foreground mb-4">
                Your support will make a real difference in this relief effort.
                Thank you for joining our volunteer team.
              </p>
              
              <Button onClick={() => setOpen(false)} className="w-full">
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Volunteer for {portalTitle}</DialogTitle>
              <DialogDescription>
                Register as a volunteer to contribute your skills and time to this relief effort.
              </DialogDescription>
            </DialogHeader>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm flex items-start">
                <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name || user?.displayName || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email || user?.email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Skills (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <Badge
                      key={skill}
                      variant={skills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer ${skills.includes(skill) ? "bg-primary" : ""}`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="availability">Availability</Label>
                <select
                  id="availability"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setOpen(false)} variant="outline" disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register as Volunteer"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 