import { CustomerDetails } from "@/components/customer-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface CustomerPageProps {
  params: {
    id: string
  }
}

export default function CustomerPage({ params }: CustomerPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customers
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Details</h1>
            <p className="text-muted-foreground">View and manage customer information</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/customers/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Customer
          </Link>
        </Button>
      </div>

      <CustomerDetails customerId={params.id} />
    </div>
  )
}
