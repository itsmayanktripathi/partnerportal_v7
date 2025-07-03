import { VendorList } from "@/components/vendor/vendor-list"
import { VendorFilters } from "@/components/vendor/vendor-filters"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground">Manage your vendor partners and their information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/vendors/onboard">
              <Upload className="mr-2 h-4 w-4" />
              Onboard Vendor
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/vendors/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Vendor
            </Link>
          </Button>
        </div>
      </div>

      <VendorFilters />
      <VendorList />
    </div>
  )
}
