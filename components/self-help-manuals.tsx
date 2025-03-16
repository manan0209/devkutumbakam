"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DisasterType, getPortal, getSelfHelpManuals, SelfHelpManual } from "@/lib/db"
import { handleFirebaseError } from "@/lib/error-handler"
import { AlertTriangle, Book, BookOpen, Download, Printer, Share2, User } from "lucide-react"
import { useEffect, useState } from "react"
// import { jsPDF } from "jspdf"

interface SelfHelpManualsProps {
  disasterType?: DisasterType;
  portalId?: string;
  showTitle?: boolean;
}

// Disaster type icon mapping
const disasterIcons: Record<string, JSX.Element> = {
  flood: <AlertTriangle className="h-5 w-5 text-blue-500" />,
  earthquake: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  cyclone: <AlertTriangle className="h-5 w-5 text-purple-500" />,
  drought: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  fire: <AlertTriangle className="h-5 w-5 text-red-500" />,
  landslide: <AlertTriangle className="h-5 w-5 text-brown-500" />,
  tsunami: <AlertTriangle className="h-5 w-5 text-cyan-500" />,
  chemical: <AlertTriangle className="h-5 w-5 text-gray-500" />,
  biological: <AlertTriangle className="h-5 w-5 text-green-500" />,
  nuclear: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  other: <AlertTriangle className="h-5 w-5 text-gray-500" />,
}

export function SelfHelpManuals({ disasterType, portalId, showTitle = true }: SelfHelpManualsProps) {
  const [manuals, setManuals] = useState<SelfHelpManual[]>([])
  const [selectedManual, setSelectedManual] = useState<SelfHelpManual | null>(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState<"victims" | "helpers">("victims")
  const [error, setError] = useState<string | null>(null)
  const [exportLoading, setExportLoading] = useState(false)
  const [portalDisasterType, setPortalDisasterType] = useState<DisasterType | undefined>(disasterType)
  
  // First fetch the portal to get its disaster type if portalId is provided
  useEffect(() => {
    const fetchPortalDisasterType = async () => {
      if (portalId) {
        try {
          const portal = await getPortal(portalId)
          if (portal && portal.disasterType) {
            setPortalDisasterType(portal.disasterType)
          }
        } catch (error) {
          console.error("Error fetching portal disaster type:", error)
        }
      }
    }
    
    fetchPortalDisasterType()
  }, [portalId])
  
  // Fetch manuals based on disaster type or portal ID
  useEffect(() => {
    const fetchManuals = async () => {
      setLoading(true)
      try {
        let fetchedManuals: SelfHelpManual[] = []
        
        if (portalId && portalDisasterType) {
          // Get manuals for the portal's disaster type
          fetchedManuals = await getSelfHelpManuals(portalDisasterType)
        } else if (disasterType) {
          // Get manuals for this disaster type
          fetchedManuals = await getSelfHelpManuals(disasterType)
        } else {
          // Get all manuals if neither portalId nor disasterType is specified
          fetchedManuals = await getSelfHelpManuals()
        }
        
        // Filter out any manuals that don't match the disaster type
        if (portalDisasterType) {
          fetchedManuals = fetchedManuals.filter(manual => 
            manual.disasterType === portalDisasterType || manual.disasterType === "other"
          )
        }
        
        setManuals(fetchedManuals)
        
        // Select the first manual by default if available
        if (fetchedManuals.length > 0 && !selectedManual) {
          setSelectedManual(fetchedManuals[0])
        }
      } catch (error) {
        console.error("Error fetching self-help manuals:", error)
        setError(handleFirebaseError(error, { 
          defaultMessage: "Failed to load self-help manuals. Please try again later." 
        }))
      } finally {
        setLoading(false)
      }
    }
    
    fetchManuals()
  }, [disasterType, portalId, portalDisasterType, selectedManual])
  
  // Filter manuals based on user type
  const filteredManuals = manuals.filter(manual => {
    if (userType === "victims") return manual.forVictims
    return manual.forHelpers
  })
  
  // Generate and download PDF
  const handleDownloadPDF = async () => {
    if (!selectedManual) return
    
    try {
      setExportLoading(true)
      
      // Temporarily disabled PDF export functionality
      alert("PDF export is temporarily disabled. Please install jspdf package.")
      
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setExportLoading(false)
    }
  }
  
  // Share manual
  const handleShareManual = async () => {
    if (!selectedManual) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedManual.title,
          text: `Disaster Self-Help Guide: ${selectedManual.title}`,
          url: window.location.href
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
          <button 
            type="button"
            className="absolute top-2 right-2 text-red-700"
            onClick={() => setError(null)}
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      )}
      
      {showTitle && (
        <div>
          <h2 className="text-2xl font-bold mb-1">Self-Help Manuals</h2>
          <p className="text-gray-500">
            {portalDisasterType 
              ? `Essential guides for ${portalDisasterType} disaster response and survival` 
              : "Essential guides for disaster response and survival"}
          </p>
        </div>
      )}
      
      <Tabs defaultValue="victims" className="w-full" onValueChange={(value) => setUserType(value as "victims" | "helpers")}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <TabsList className="self-start">
            <TabsTrigger value="victims" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>For Affected People</span>
            </TabsTrigger>
            <TabsTrigger value="helpers" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>For Relief Workers</span>
            </TabsTrigger>
          </TabsList>
          
          {selectedManual && (
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={exportLoading}
                className="flex items-center gap-2"
              >
                {exportLoading ? 
                  <span className="animate-spin">⏳</span> : 
                  <Download className="h-4 w-4" />
                }
                <span>Download PDF</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShareManual}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.print()}
                className="flex items-center gap-2 print:hidden"
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="victims" className="mt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredManuals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4 print:hidden">
                <h3 className="font-semibold text-lg mb-4">Available Guides</h3>
                {filteredManuals.map((manual) => (
                  <Card 
                    key={manual.id} 
                    className={`cursor-pointer transition hover:shadow-md overflow-hidden ${
                      selectedManual?.id === manual.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedManual(manual)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {manual.disasterType && disasterIcons[manual.disasterType]}
                        <CardTitle className="text-base">{manual.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {manual.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="md:col-span-2">
                {selectedManual ? (
                  <div id="manual-content" className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center gap-2 mb-6">
                      {selectedManual.disasterType && disasterIcons[selectedManual.disasterType]}
                      <h2 className="text-2xl font-bold">{selectedManual.title}</h2>
                    </div>
                    
                    <div className="mb-6">
                      <Badge variant="outline" className="mr-2">
                        {selectedManual.disasterType?.charAt(0).toUpperCase() + selectedManual.disasterType?.slice(1) || "General"}
                      </Badge>
                      <Badge variant="outline">
                        {userType === "victims" ? "For Affected People" : "For Relief Workers"}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-8">
                      {selectedManual.content}
                    </p>
                    
                    {selectedManual.sections && selectedManual.sections.length > 0 && (
                      <div className="space-y-6">
                        {selectedManual.sections.map((section, index) => (
                          <div key={index} className="border-t pt-4">
                            <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                            <div className="text-gray-700 whitespace-pre-line">
                              {section.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a manual to view its content</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No manuals available for {userType === "victims" ? "affected people" : "relief workers"}</p>
                {portalDisasterType && (
                  <p className="mt-2 text-sm">Try checking the general disaster guides section</p>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="helpers" className="mt-0">
          {/* Same content structure as victims tab, but filtered for helpers */}
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredManuals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4 print:hidden">
                <h3 className="font-semibold text-lg mb-4">Available Guides</h3>
                {filteredManuals.map((manual) => (
                  <Card 
                    key={manual.id} 
                    className={`cursor-pointer transition hover:shadow-md overflow-hidden ${
                      selectedManual?.id === manual.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedManual(manual)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {manual.disasterType && disasterIcons[manual.disasterType]}
                        <CardTitle className="text-base">{manual.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {manual.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="md:col-span-2">
                {selectedManual ? (
                  <div id="manual-content" className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center gap-2 mb-6">
                      {selectedManual.disasterType && disasterIcons[selectedManual.disasterType]}
                      <h2 className="text-2xl font-bold">{selectedManual.title}</h2>
                    </div>
                    
                    <div className="mb-6">
                      <Badge variant="outline" className="mr-2">
                        {selectedManual.disasterType?.charAt(0).toUpperCase() + selectedManual.disasterType?.slice(1) || "General"}
                      </Badge>
                      <Badge variant="outline">
                        {userType === "victims" ? "For Affected People" : "For Relief Workers"}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-8">
                      {selectedManual.content}
                    </p>
                    
                    {selectedManual.sections && selectedManual.sections.length > 0 && (
                      <div className="space-y-6">
                        {selectedManual.sections.map((section, index) => (
                          <div key={index} className="border-t pt-4">
                            <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                            <div className="text-gray-700 whitespace-pre-line">
                              {section.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a manual to view its content</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No manuals available for {userType === "victims" ? "affected people" : "relief workers"}</p>
                {portalDisasterType && (
                  <p className="mt-2 text-sm">Try checking the general disaster guides section</p>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}