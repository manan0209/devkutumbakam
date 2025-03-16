"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DisasterPortal } from "@/lib/db"
import {
    AlertTriangle,
    ArrowUpRight,
    Clock,
    ExternalLink,
    HeartHandshake,
    MapPin,
    Package,
    Users
} from "lucide-react"
import Link from "next/link"
import { PortalShareCard } from "./portal-share-card"
import Image from "next/image"

interface DisasterPortalCardProps {
  portal: DisasterPortal
  showActions?: boolean
  className?: string
}

// Disaster type to image mapping
const disasterTypeImages = {
  flood: "/templates/flood.jpg",
  earthquake: "/templates/earthquake.jpg",
  cyclone: "/templates/cyclone.jpg",
  drought: "/templates/drought.jpg",
  fire: "/templates/fire.jpg",
  landslide: "/templates/landslide.jpg",
  tsunami: "/templates/tsunami.jpg",
  chemical: "/templates/chemical.jpg",
  biological: "/templates/biological.jpg",
  nuclear: "/templates/nuclear.jpg",
  other: "/templates/other.jpg",
}

// Function to format date
const formatDate = (timestamp: any) => {
  if (!timestamp) return "Recently"
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return "Today"
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}

export function DisasterPortalCard({ portal, showActions = true, className = "" }: DisasterPortalCardProps) {
  const portalImage = portal.image || disasterTypeImages[portal.disasterType as keyof typeof disasterTypeImages] || "/templates/other.jpg"
  
  return (
    <Card className={`overflow-hidden transition hover:shadow-md ${className}`}>
      <div className="relative h-48">
        <Image
          src={portalImage}
          alt={portal.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white line-clamp-2 mb-1">{portal.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={
                portal.status === "active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : portal.status === "resolved"
                  ? "bg-purple-100 text-purple-800 border-purple-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              }
            >
              {portal.status.charAt(0).toUpperCase() + portal.status.slice(1)}
            </Badge>
            
            <Badge
              className={
                portal.urgency === "high"
                  ? "bg-red-100 text-red-800 border-red-200"
                  : portal.urgency === "medium"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              }
            >
              {portal.urgency === "high" && <AlertTriangle size={14} className="mr-1" />}
              {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <p className="text-gray-600 line-clamp-2">{portal.description}</p>
          
          <div className="flex flex-wrap items-center text-gray-500 text-sm gap-3">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {portal.location}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {formatDate(portal.createdAt)}
            </div>
            {portal.status === "resolved" && portal.resolvedAt && (
              <div className="flex items-center">
                <AlertTriangle size={14} className="mr-1" />
                Resolved: {formatDate(portal.resolvedAt)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/portal/${portal.id}`}>
              <span className="flex items-center justify-center">
                <span>View Portal</span>
                <ArrowUpRight size={16} className="ml-2" />
              </span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex-1">
            <Link href={`/volunteer?portalId=${portal.id}`}>
              <span className="flex items-center justify-center">
                <Users size={16} className="mr-1" />
                <span>Volunteer</span>
              </span>
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}