import { BulkDealUpload } from "@/components/cost-deal/bulk-deal-upload"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BulkDealUploadPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Bulk Deal Upload</h1>
          <p className="text-muted-foreground">Upload deal changes for multiple items using Excel file</p>
        </div>
      </div>

      <BulkDealUpload />
    </div>
  )
}
