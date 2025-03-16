import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertTriangle, Clock, MapPin, Package, Share2 } from "lucide-react"
import Link from "next/link"
import React from "react"

interface ResourceNeedProps {
  resource: {
    id: string
    portalId: string // Added portalId for linking
    category: string
    title: string
    description: string
    quantity: number
    unit?: string 
    fulfilled: number
    urgency: string
    location: string
    dateNeeded?: string
  }
  onShare?: () => void
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  medicine: <Package className="h-4 w-4 text-blue-500" />,
  food: <Package className="h-4 w-4 text-green-500" />,
  shelter: <Package className="h-4 w-4 text-orange-500" />,
  clothing: <Package className="h-4 w-4 text-purple-500" />,
  water: <Package className="h-4 w-4 text-cyan-500" />,
  transport: <Package className="h-4 w-4 text-red-500" />,
  other: <Package className="h-4 w-4 text-gray-500" />,
}

export function ResourceNeedCard({ resource, onShare }: ResourceNeedProps) {
  const percentFulfilled = Math.round((resource.fulfilled / resource.quantity) * 100)
  
  // Get priority color
  const getUrgencyColor = () => {
    switch (resource.urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  // Progress color
  const getProgressColor = () => {
    if (percentFulfilled >= 100) return "bg-green-500"
    if (percentFulfilled >= 70) return "bg-teal-500"
    if (percentFulfilled >= 30) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className={`h-1 w-full ${getProgressColor()}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 bg-gray-50 hover:bg-gray-100 flex items-center gap-1.5">
              {categoryIcons[resource.category.toLowerCase()] || categoryIcons.other}
              {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
            </Badge>
            <CardTitle className="text-lg flex items-center gap-2 line-clamp-1">
              {resource.title}
              {resource.urgency === "high" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle size={16} className="text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Urgently needed!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
          </div>
          <Badge className={getUrgencyColor()}>
            {resource.urgency.charAt(0).toUpperCase() + resource.urgency.slice(1)} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span className="line-clamp-1">{resource.location}</span>
          </div>
          {resource.dateNeeded && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{resource.dateNeeded}</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{percentFulfilled}% Complete</span>
          </div>
          <Progress 
            value={percentFulfilled} 
            className="h-2" 
            style={{ 
              background: 'rgb(229,231,235)', 
              '--tw-progress-fill': getProgressColor() 
            } as React.CSSProperties} 
          />
          <div className="text-sm text-gray-500">
            {resource.fulfilled} of {resource.quantity} {resource.unit || 'units'} fulfilled
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full" asChild>
          <Link href={`/portal/${resource.portalId}/contribute/${resource.id}`}>
            Contribute
          </Link>
        </Button>
        {onShare && (
          <Button variant="outline" size="icon" onClick={onShare}>
            <Share2 size={16} />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

