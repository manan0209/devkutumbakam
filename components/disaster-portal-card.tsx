"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DisasterPortal } from "@/lib/db"
import {
    AlertTriangle,
    ArrowUpRight,
    Clock,
    MapPin,
    Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface DisasterPortalCardProps {
  portal: DisasterPortal
  showActions?: boolean
  className?: string
  layout?: "vertical" | "horizontal"
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

export function DisasterPortalCard({ 
  portal, 
  showActions = true, 
  className = "",
  layout = "vertical" 
}: DisasterPortalCardProps) {
  const portalImage = portal.image || disasterTypeImages[portal.disasterType as keyof typeof disasterTypeImages] || "/templates/other.jpg"
  const isHorizontal = layout === "horizontal"

  return (
    <Card className={`overflow-hidden transition hover:shadow-md ${isHorizontal ? 'flex' : ''} ${className}`}>
      <div 
        className={`relative ${isHorizontal ? 'w-1/3 min-w-[120px]' : 'h-48'}`} 
        style={isHorizontal ? {aspectRatio: "1/1"} : {}}
      >
        <Image
          src={portalImage}
          alt={portal.title}
          fill
          className="object-cover"
          sizes={isHorizontal ? "(max-width: 768px) 120px, 33vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          priority={true}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {!isHorizontal && (
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
        )}
      </div>
      
      <div className={`flex flex-col ${isHorizontal ? 'flex-1' : ''}`}>
        {isHorizontal && (
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-lg line-clamp-1">{portal.title}</CardTitle>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge
                className={`text-xs px-1.5 py-0 h-5 ${
                  portal.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : portal.status === "resolved"
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {portal.status.charAt(0).toUpperCase() + portal.status.slice(1)}
              </Badge>
              
              <Badge
                className={`text-xs px-1.5 py-0 h-5 ${
                  portal.urgency === "high"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : portal.urgency === "medium"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                {portal.urgency === "high" && <AlertTriangle size={12} className="mr-0.5" />}
                {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)}
              </Badge>
            </div>
          </CardHeader>
        )}
        
        <CardContent className={`${isHorizontal ? 'p-3 pt-2' : 'p-4'}`}>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600 line-clamp-2 text-sm">{portal.description}</p>
            
            <div className="flex flex-wrap items-center text-gray-500 text-xs gap-2">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span className="line-clamp-1">{portal.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                {formatDate(portal.createdAt)}
              </div>
              {portal.status === "resolved" && portal.resolvedAt && (
                <div className="flex items-center">
                  <AlertTriangle size={12} className="mr-1" />
                  Resolved: {formatDate(portal.resolvedAt)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        {showActions && (
          <CardFooter className={`${isHorizontal ? 'p-3 pt-0' : 'p-4 pt-0'} flex gap-2 mt-auto`}>
            <Button asChild size={isHorizontal ? "sm" : "default"} className="flex-1">
              <Link href={`/portal/${portal.id}`}>
                <span className="flex items-center justify-center">
                  <span>View Portal</span>
                  <ArrowUpRight size={isHorizontal ? 14 : 16} className="ml-1" />
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild size={isHorizontal ? "sm" : "default"} className="flex-1">
              <Link href={`/volunteer?portalId=${portal.id}`}>
                <span className="flex items-center justify-center">
                  <Users size={isHorizontal ? 14 : 16} className="mr-1" />
                  <span>Volunteer</span>
                </span>
              </Link>
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  )
}