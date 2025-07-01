import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "submitted new item proposal",
    item: "Premium Coffee Beans",
    time: "2 hours ago",
    status: "pending",
    avatar: "SJ",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "updated cost for",
    item: "Organic Tea Leaves",
    time: "4 hours ago",
    status: "approved",
    avatar: "MC",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "proposed new deal for",
    item: "Bulk Spice Package",
    time: "1 day ago",
    status: "under review",
    avatar: "ED",
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "uploaded bulk items via",
    item: "Excel Import",
    time: "2 days ago",
    status: "completed",
    avatar: "AR",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "under review":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your vendor partners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>{activity.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
