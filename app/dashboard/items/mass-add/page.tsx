import { MassAddItems } from "@/components/item/mass-add-items"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MassAddPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/items">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Items
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mass Add Items</h1>
          <p className="text-muted-foreground">Upload multiple items using Excel file</p>
        </div>
      </div>

      <MassAddItems />
    </div>
  )
}
