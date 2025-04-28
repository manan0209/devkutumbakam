"use client"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllResourceNeeds, getPortal, ResourceNeed } from "@/lib/db"
import Link from "next/link"
import { useEffect, useState } from "react"
import Head from "next/head"

export default function ResourcesPage() {
  const [resources, setResources] = useState<(ResourceNeed & { portalTitle: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const resourceNeeds = await getAllResourceNeeds()
      
      // Fetch portal titles for each resource
      const resourcesWithPortalTitles = await Promise.all(
        resourceNeeds.map(async (resource) => {
          const portal = await getPortal(resource.portalId)
          return {
            ...resource,
            portalTitle: portal?.title || "Unknown Portal"
          }
        })
      )
      
      setResources(resourcesWithPortalTitles)
    } catch (error) {
      console.error("Error fetching resources:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.portalTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || resource.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || resource.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "needed": return "bg-red-100 text-red-800"
      case "partially_fulfilled": return "bg-yellow-100 text-yellow-800"
      case "fulfilled": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Head>
        <title>Disaster Resources | Kutumbakam</title>
        <meta name="description" content="Access disaster preparedness resources, manuals, and guides on Kutumbakam. Empower your community with knowledge and tools for effective disaster response." />
        <meta name="keywords" content="Disaster Resources, Preparedness, Manuals, Guides, Community, Relief, Kutumbakam, Open Source, Emergency, Social Impact" />
        <meta property="og:title" content="Disaster Resources | Kutumbakam" />
        <meta property="og:description" content="Find disaster preparedness resources, manuals, and guides to help your community respond effectively to emergencies." />
        <meta property="og:url" content="https://devkutumbakam.vercel.app/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://devkutumbakam.vercel.app/img%20(1).png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disaster Resources | Kutumbakam" />
        <meta name="twitter:description" content="Access disaster preparedness resources, manuals, and guides for effective community response." />
        <meta name="twitter:image" content="https://devkutumbakam.vercel.app/img%20(1).png" />
        <link rel="canonical" href="https://devkutumbakam.vercel.app/resources" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Resource Needs</h1>
            <p className="text-gray-600 mb-8">
              Browse all resource needs across active disaster relief portals
            </p>

            <div className="bg-white p-6 rounded-lg border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="needed">Needed</SelectItem>
                      <SelectItem value="partially_fulfilled">Partially Fulfilled</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {filteredResources.length} resources found
                </p>
                <Button variant="outline" onClick={fetchResources}>
                  Refresh
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                        <div className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(resource.priority)}`}>
                          {resource.priority.charAt(0).toUpperCase() + resource.priority.slice(1)} Priority
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                          {resource.status === "needed" ? "Needed" : 
                           resource.status === "partially_fulfilled" ? "Partially Fulfilled" : 
                           "Fulfilled"}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">
                            {resource.quantity} {resource.unit || "units"} needed
                          </p>
                          <p className="text-xs text-gray-500">
                            From: {resource.portalTitle}
                          </p>
                        </div>
                        
                        <Button asChild size="sm" disabled={resource.status === "fulfilled"}>
                          <Link href={`/request-assistance?portalId=${resource.portalId}`}>
                            Contribute
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || categoryFilter !== "all" || priorityFilter !== "all" || statusFilter !== "all" 
                    ? "Try adjusting your filters to see more results" 
                    : "There are currently no resource needs in the system"}
                </p>
                <Button asChild variant="outline">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            )}
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}