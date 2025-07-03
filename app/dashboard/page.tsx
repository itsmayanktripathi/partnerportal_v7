import { DashboardCards } from "@/components/shared/dashboard-cards"
import { RecentActivity } from "@/components/shared/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your PartnerPortal dashboard. Here's what needs your attention.
        </p>
      </div>

      <DashboardCards />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a href="/dashboard/vendors/add" className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Add New Vendor</div>
              <div className="text-sm text-gray-600">Register a new vendor partner</div>
            </a>
            <a href="/dashboard/items/add" className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Add New Item</div>
              <div className="text-sm text-gray-600">Create a new product item</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
