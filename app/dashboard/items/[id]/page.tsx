import { ItemDetailTabs } from "@/components/item-detail-tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface ItemPageProps {
  params: {
    id: string
  }
}

export default function ItemPage({ params }: ItemPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/items">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Items
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Item Details</h1>
            <p className="text-muted-foreground">View and manage item information</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/items/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Item
          </Link>
        </Button>
      </div>

      <ItemDetailTabs itemId={params.id} />
    </div>
  )
}
