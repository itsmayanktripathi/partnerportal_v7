import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, DollarSign, Handshake, AlertCircle } from "lucide-react"

const proposalData = [
  {
    title: "New Item Proposals",
    count: 12,
    description: "Items waiting for approval",
    icon: Package,
    color: "bg-blue-500",
    urgent: 3,
  },
  {
    title: "Cost Change Proposals",
    count: 8,
    description: "Price updates pending review",
    icon: DollarSign,
    color: "bg-green-500",
    urgent: 2,
  },
  {
    title: "Deal Proposals",
    count: 5,
    description: "New deals for consideration",
    icon: Handshake,
    color: "bg-purple-500",
    urgent: 1,
  },
]

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {proposalData.map((item) => (
        <Card key={item.title} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`p-2 rounded-full ${item.color}`}>
              <item.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{item.count}</div>
              {item.urgent > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {item.urgent} urgent
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
