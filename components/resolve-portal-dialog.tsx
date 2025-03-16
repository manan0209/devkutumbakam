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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updatePortalStatus } from "@/lib/db"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ResolvePortalDialogProps {
  portalId: string
  portalName: string
  onResolve: () => void
}

export function ResolvePortalDialog({ portalId, portalName, onResolve }: ResolvePortalDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resolutionSummary, setResolutionSummary] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resolutionSummary.trim()) {
      setError("Please provide a summary of the resolution efforts.")
      return
    }
    
    setLoading(true)
    setError("")
    
    try {
      await updatePortalStatus(portalId, "resolved", resolutionSummary)
      
      // Success handling
      setOpen(false)
      onResolve()
      
      // Reset form
      setResolutionSummary("")
      
      // Refresh the portal data
      router.refresh()
    } catch (err) {
      console.error("Error resolving portal:", err)
      setError("Failed to mark portal as resolved. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 gap-2">
          <CheckCircle2 size={16} />
          Mark as Resolved
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mark Portal as Resolved</DialogTitle>
          <DialogDescription>
            This will mark the disaster relief portal as resolved and archive it.
            Please provide a summary of the resolution efforts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="portal-name">Portal</Label>
              <div className="px-3 py-2 rounded-md bg-gray-50 text-gray-700 font-medium">
                {portalName}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="resolution-summary">Resolution Summary</Label>
              <Textarea
                id="resolution-summary"
                placeholder="Provide a summary of the relief efforts, achievements, and resolution details..."
                value={resolutionSummary}
                onChange={(e) => setResolutionSummary(e.target.value)}
                className="min-h-[120px]"
                required
              />
              <p className="text-xs text-gray-500">
                This summary will be displayed on the portal and in the final update.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Marking as Resolved..." : "Mark as Resolved"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 