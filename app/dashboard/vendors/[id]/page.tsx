import { VendorDetails } from "@/components/vendor-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface VendorPageProps {
  params: {
    id: string
  }
}

export default function VendorPage({ params }: VendorPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/vendors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Vendors
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendor Details</h1>
            <p className="text-muted-foreground">View and manage vendor information</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/vendors/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Vendor
          </Link>
        </Button>
      </div>

      <VendorDetails vendorId={params.id} />
    </div>
  )
}
