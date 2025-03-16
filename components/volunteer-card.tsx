"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volunteer } from "@/lib/db"
import { Timestamp } from "firebase/firestore"
import { CalendarClock, Mail, MapPin, Phone, User2, Clock, Award, MessageCircle } from "lucide-react"
import { Badge } from "./ui/badge"
import { VolunteerShareCard } from "./volunteer-share-card"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface VolunteerCardProps {
  volunteer: Volunteer
  portalName?: string
  portalId?: string
  minimal?: boolean
  showContactButton?: boolean
  showAssignButton?: boolean
}

export function VolunteerCard({ 
  volunteer, 
  portalName = "", 
  portalId = "", 
  minimal = false,
  showContactButton = false,
  showAssignButton = false 
}: VolunteerCardProps) {
  let registeredDate = 'N/A';
  
  if (volunteer.registeredAt) {
    // Check if it's a Firestore Timestamp object
    if (volunteer.registeredAt instanceof Timestamp) {
      registeredDate = volunteer.registeredAt.toDate().toLocaleDateString();
    } 
    // Otherwise handle it based on its type
    else {
      // Convert to appropriate type without using 'any'
      const timestamp = volunteer.registeredAt as (string | number | Date);
      registeredDate = new Date(timestamp).toLocaleDateString();
    }
  }
  
  // Format skills for better display
  const formattedSkills = volunteer.skills.map(skill => skill.trim()).filter(Boolean);
  
  // Limit displayed skills to 3 for UI
  const displaySkills = formattedSkills.slice(0, 3);
  const hasMoreSkills = formattedSkills.length > 3;

  if (minimal) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg gap-4 bg-white hover:shadow-sm transition-shadow">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{volunteer.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5 truncate">
            {displaySkills.join(", ")}
            {hasMoreSkills && " +more"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 hover:bg-green-100">
            Active
          </Badge>
          {volunteer.availability && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Clock size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Available: {volunteer.availability}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="h-1 w-full bg-green-500"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <User2 className="h-4 w-4 mr-2 text-gray-500" />
              {volunteer.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {formattedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {displaySkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-2 py-0">
                      {skill}
                    </Badge>
                  ))}
                  {hasMoreSkills && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-100 px-2 py-0">
                            +{formattedSkills.length - 3} more
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{formattedSkills.slice(3).join(", ")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              ) : 'No skills specified'}
            </CardDescription>
          </div>
          <VolunteerShareCard 
            volunteer={volunteer} 
            portalName={portalName}
            variant="icon"
          />
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-2.5">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4 text-blue-500" />
          <span className="truncate">{volunteer.email}</span>
        </div>
        {volunteer.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4 text-green-500" />
            <span>{volunteer.phone}</span>
          </div>
        )}
        {volunteer.availability && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Available: {volunteer.availability}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarClock className="h-4 w-4 text-purple-500" />
          <span>Registered: {registeredDate}</span>
        </div>
      </CardContent>
      {(showContactButton || showAssignButton) && (
        <CardFooter className="gap-2 pt-0">
          {showContactButton && (
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle size={14} className="mr-1" />
              Contact
            </Button>
          )}
          {showAssignButton && (
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/portal/${portalId}/assign/${volunteer.id}`}>
                <Award size={14} className="mr-1" />
                Assign
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

