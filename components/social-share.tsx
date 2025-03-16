"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Mail, Share2, Copy, Check, PhoneIcon as WhatsApp } from "lucide-react"

interface SocialShareProps {
  title: string
  description?: string
  url: string
  variant?: "button" | "icon"
  className?: string
}

export function SocialShare({
  title,
  description = "Help spread the word about this disaster relief effort",
  url,
  variant = "button",
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `${title} - ${description}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
      "_blank",
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`, "_blank")
  }

  const shareByEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
      "_blank",
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button className={`gap-2 ${className}`}>
            <Share2 size={16} />
            Share
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className={className}>
            <Share2 size={20} />
            <span className="sr-only">Share</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
          <DialogDescription>Help spread the word about this disaster relief effort</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input value={url} readOnly />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <Button variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={shareOnFacebook}>
              <Facebook className="h-6 w-6 text-blue-600" />
              <span className="mt-1 text-xs">Facebook</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={shareOnTwitter}>
              <Twitter className="h-6 w-6 text-sky-500" />
              <span className="mt-1 text-xs">Twitter</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={shareOnWhatsApp}>
              <WhatsApp className="h-6 w-6 text-green-500" />
              <span className="mt-1 text-xs">WhatsApp</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={shareOnLinkedIn}>
              <Linkedin className="h-6 w-6 text-blue-700" />
              <span className="mt-1 text-xs">LinkedIn</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={shareByEmail}>
              <Mail className="h-6 w-6 text-gray-600" />
              <span className="mt-1 text-xs">Email</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

