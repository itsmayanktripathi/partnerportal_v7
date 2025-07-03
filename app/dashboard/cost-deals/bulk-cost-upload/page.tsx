import { BulkCostUpload } from "@/components/cost-deal/bulk-cost-upload"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BulkCostUploadPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Bulk Cost Upload</h1>
          <p className="text-muted-foreground">Upload cost changes for multiple items using Excel file</p>
        </div>
      </div>

      <BulkCostUpload />
    </div>
  )
}
