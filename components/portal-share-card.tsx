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
import { DisasterPortal } from "@/lib/db"
import { AlertTriangle, Check, Copy, Download, Facebook, Linkedin, Mail, MapPin, Share2, Twitter } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface PortalShareCardProps {
  portal: DisasterPortal
  variant?: "button" | "icon" | "inline"
  className?: string
}

// Disaster type to image mapping
const disasterTypeImages = {
  flood: "/flood.jpg",
  earthquake: "/earthquake.jpg",
  cyclone: "/cyclone.jpg",
  drought: "/cactus.jpg",
  fire: "/wildfire.jpg",
  landslide: "/earthquake.jpg", // Using earthquake image as fallback for landslide
  tsunami: "/flood.jpg", // Using flood image as fallback for tsunami
  chemical: "/flood.jpg", // Using flood image as fallback
  biological: "/earthquake.jpg", // Using earthquake image as fallback
  nuclear: "/earthquake.jpg", // Using earthquake image as fallback
  other: "/earthquake.jpg", // Using earthquake as default
}

export function PortalShareCard({
  portal,
  variant = "button",
  className = "",
}: PortalShareCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [shareTab, setShareTab] = useState<string>("qr")
  const [isDownloading, setIsDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const portalUrl = typeof window !== "undefined" ? `${window.location.origin}/portal/${portal.id}` : ""
  const portalImage = portal.image || disasterTypeImages[portal.disasterType as keyof typeof disasterTypeImages] || "/earthquake.jpg"

  useEffect(() => {
    if (portal.id) {
      // Generate QR code URL using a free QR code API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portalUrl)}&bgcolor=ffffff&color=000000&margin=10`
      setQrCodeUrl(qrUrl)
    }
  }, [portal.id, portalUrl])

  const downloadCard = async () => {
    if (!cardRef.current) return
    
    try {
      setIsDownloading(true)
      
      // Dynamically import html2canvas only when needed
      const html2canvasModule = await import('html2canvas')
      const html2canvas = html2canvasModule.default
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        onclone: (document, element) => {
          // Ensure all text is properly rendered
          const allTextElements = element.querySelectorAll('div, span, p, h1, h2, h3, h4, h5, h6')
          allTextElements.forEach(el => {
            (el as HTMLElement).style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            (el as HTMLElement).style.textRendering = 'geometricPrecision';
          })
        }
      })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `${portal.title.replace(/\s+/g, '_')}_portal_card.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portalUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "resolved":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recently"
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button className={className}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Portal
          </Button>
        ) : variant === "icon" ? (
          <Button variant="outline" size="icon" className={className}>
            <Share2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="link" className={`p-0 h-auto ${className}`}>
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Disaster Portal</DialogTitle>
          <DialogDescription>
            Share this portal with others to help coordinate relief efforts
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="qr" value={shareTab} onValueChange={setShareTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="card">Share Card</TabsTrigger>
          </TabsList>
          
          <TabsContent value="qr" className="mt-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              {qrCodeUrl ? (
                <div className="border rounded-lg p-4 bg-white">
                  <Image 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    width={200} 
                    height={200} 
                    className="mx-auto"
                  />
                  </div>
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-lg"></div>
              )}
              
              <div className="w-full">
                <Label htmlFor="portal-url" className="text-sm text-gray-500 mb-1.5 block">
                  Portal URL
                </Label>
                <div className="flex">
                  <Input 
                    id="portal-url"
                    value={portalUrl} 
                    readOnly 
                    className="flex-1 pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="ml-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Share this disaster portal on social media to reach more people
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(portalUrl)}&text=${encodeURIComponent(`Join the disaster relief efforts for ${portal.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(portalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent(`Join the disaster relief efforts for ${portal.title}`)}&body=${encodeURIComponent(`Please join the disaster relief efforts for ${portal.title}. Visit: ${portalUrl}`)}`}
                    className="flex items-center justify-center"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex">
                <Input 
                  value={portalUrl} 
                  readOnly 
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="ml-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="card" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Download and share this disaster portal card
              </p>
              
              <div 
                ref={cardRef} 
                className="border rounded-lg overflow-hidden bg-white"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px', 
                  margin: '0 auto',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  color: '#000'
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={portalImage}
                    alt={portal.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white line-clamp-2 mb-1" style={{ textRendering: 'geometricPrecision' }}>{portal.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(portal.status)}>
                        {portal.status.charAt(0).toUpperCase() + portal.status.slice(1)}
                      </Badge>
                      
                      <Badge className={getUrgencyColor(portal.urgency)}>
                        {portal.urgency === "high" && <AlertTriangle size={14} className="mr-1" />}
                        {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700 line-clamp-2 mb-3" style={{ textRendering: 'geometricPrecision' }}>{portal.description}</p>
                  
                  <div className="flex flex-wrap items-center text-gray-700 text-sm gap-3">
                    <div className="flex items-center" style={{ textRendering: 'geometricPrecision' }}>
                      <MapPin size={14} className="mr-1" />
                      {portal.location}
                    </div>
                    <div className="flex items-center" style={{ textRendering: 'geometricPrecision' }}>
                      <AlertTriangle size={14} className="mr-1" />
                      {formatDate(portal.createdAt)}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="text-sm" style={{ textRendering: 'geometricPrecision' }}>
                      <span className="font-semibold text-gray-900">Scan to help:</span>
                    </div>
                    {qrCodeUrl && (
                      <div className="bg-white p-1 border border-gray-100 rounded-sm">
                        <Image 
                          src={qrCodeUrl} 
                          alt="QR Code" 
                          width={60} 
                          height={60}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={downloadCard} 
                className="w-full"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
              Download Card
                  </>
                )}
            </Button>
          </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <DialogDescription>
            Help spread the word and coordinate relief efforts.
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 