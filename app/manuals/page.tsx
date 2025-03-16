import { SelfHelpManuals } from "@/components/self-help-manuals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DisasterType } from "@/lib/db"

export const metadata = {
  title: "Disaster Preparedness Manuals | Kutumbakam",
  description: "Access comprehensive disaster preparedness and response manuals for various disaster types",
}

export default function ManualsPage() {
  const disasterTypes: DisasterType[] = [
    "flood", 
    "earthquake", 
    "cyclone", 
    "drought", 
    "fire", 
    "landslide",
    "tsunami", 
    "chemical", 
    "biological",
    "nuclear"
  ]
  
  return (
    <div className="container py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Disaster Preparedness Manuals</h1>
        <p className="text-gray-600 max-w-3xl">
          Access comprehensive guides and manuals for disaster preparedness, response, and recovery. 
          These resources are designed to help both affected individuals and relief workers.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto p-1">
          <TabsTrigger value="all" className="rounded-md">
            All Manuals
          </TabsTrigger>
          {disasterTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="rounded-md">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <SelfHelpManuals showTitle={false} />
        </TabsContent>
        
        {disasterTypes.map((type) => (
          <TabsContent key={type} value={type}>
            <SelfHelpManuals disasterType={type} showTitle={false} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 