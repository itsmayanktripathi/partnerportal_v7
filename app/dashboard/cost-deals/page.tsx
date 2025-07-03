import { CostDealDashboard } from "@/components/cost-deal/cost-deal-dashboard"
import { Button } from "@/components/ui/button"
import { Upload, DollarSign, Percent } from "lucide-react"
import Link from "next/link"

export default function CostDealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cost & Deal Management</h1>
          <p className="text-muted-foreground">Manage pricing, costs, and promotional deals across your catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/cost-deals/bulk-cost-upload">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Cost Upload
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/cost-deals/bulk-deal-upload">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Deal Upload
            </Link>
          </Button>
        </div>
      </div>

      <CostDealDashboard />

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/cost-deals/cost-management" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Cost Management</h3>
                <p className="text-sm text-muted-foreground">Manage item costs and margins</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/cost-deals/deal-management" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Percent className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Deal Management</h3>
                <p className="text-sm text-muted-foreground">Create and manage promotional deals</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/cost-deals/bulk-cost-upload" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Upload className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Bulk Cost Changes</h3>
                <p className="text-sm text-muted-foreground">Upload cost changes via Excel</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/cost-deals/bulk-deal-upload" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Upload className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-semibold">Bulk Deal Changes</h3>
                <p className="text-sm text-muted-foreground">Upload deal changes via Excel</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
