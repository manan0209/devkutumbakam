"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DisasterPortal, searchPortals } from "@/lib/db"
import { AlertTriangle, PlusCircle, Search as SearchIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<DisasterPortal[]>([])
  const [showDialog, setShowDialog] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    try {
      const results = await searchPortals(searchTerm)
      setSearchResults(results)
      setShowDialog(true)
    } catch (error) {
      console.error("Error searching portals:", error)
    } finally {
      setIsSearching(false)
    }
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

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Search disaster portals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1"
      />
      <Button 
        type="submit" 
        onClick={handleSearch}
        disabled={isSearching || !searchTerm.trim()}
      >
        <SearchIcon size={18} className="mr-2" />
        Search
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
            <DialogDescription>
              Disaster relief portals matching &quot;{searchTerm}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((portal) => (
                  <Card key={portal.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{portal.title}</CardTitle>
                        <Badge className={getUrgencyColor(portal.urgency)}>
                          {portal.urgency === "high" && <AlertTriangle size={14} className="mr-1" />}
                          {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{portal.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-700 line-clamp-3">{portal.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/portal/${portal.id}`}>View Portal</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No disaster portals found matching your search.</p>
                <Button asChild className="gap-2">
                  <Link href="/create-portal">
                    <PlusCircle size={16} />
                    Create New Portal
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 