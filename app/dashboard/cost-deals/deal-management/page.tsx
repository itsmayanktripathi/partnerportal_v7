import { DealManagement } from "@/components/cost-deal/deal-management"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DealManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/cost-deals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cost & Deals
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deal Management</h1>
          <p className="text-muted-foreground">Create and manage promotional deals and discounts</p>
        </div>
      </div>

      <DealManagement />
    </div>
  )
}
