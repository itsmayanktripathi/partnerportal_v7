import { ItemSearch } from "@/components/item-search"
import { ItemGrid } from "@/components/item-grid"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Item Management</h1>
          <p className="text-muted-foreground">Search and manage your product catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/items/mass-add">
              <Upload className="mr-2 h-4 w-4" />
              Mass Add
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/items/add">
              <Plus className="mr-2 h-4 w-4" />
              New Item
            </Link>
          </Button>
        </div>
      </div>

      <ItemSearch />
      <ItemGrid />
    </div>
  )
}
