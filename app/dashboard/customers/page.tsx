import { CustomerSearch } from "@/components/customer/customer-search"
import { CustomerList } from "@/components/customer/customer-list"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">Manage your retail partners and customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/customers/onboard">
              <Upload className="mr-2 h-4 w-4" />
              Onboard Customer
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/customers/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
        </div>
      </div>

      <CustomerSearch />
      <CustomerList />
    </div>
  )
}
