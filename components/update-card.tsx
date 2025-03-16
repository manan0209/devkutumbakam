import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, MessageSquare, Megaphone } from "lucide-react"

interface UpdateProps {
  update: {
    id: string
    title: string
    content: string
    author: string
    timestamp: string
    type: string
  }
}

export function UpdateCard({ update }: UpdateProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {update.type === "urgent" && <AlertTriangle size={16} className="text-red-500" />}
            {update.type === "announcement" && <Megaphone size={16} className="text-primary" />}
            {update.type === "update" && <MessageSquare size={16} className="text-secondary" />}
            <h3 className="font-bold">{update.title}</h3>
          </div>
          <Badge
            variant={
              update.type === "urgent" ? "destructive" : update.type === "announcement" ? "outline" : "secondary"
            }
            className={
              update.type === "announcement"
                ? "bg-love-light text-primary border-primary hover:bg-love-light"
                : update.type === "update"
                  ? "bg-compassion-light text-secondary border-secondary hover:bg-compassion-light"
                  : ""
            }
          >
            {update.type === "urgent" ? "Urgent" : update.type === "announcement" ? "Announcement" : "Update"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-3">{update.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div>By {update.author}</div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {update.timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

