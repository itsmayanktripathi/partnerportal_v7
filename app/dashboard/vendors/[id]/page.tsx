import { VendorDetailTabs } from "@/components/vendor/vendor-detail-tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface VendorPageProps {
  params: Promise<{
    id: string
  }>
}

// Mock data - in real app this would be fetched based on vendorId
const getVendorData = (vendorId: string) => ({
  id: vendorId,
  name: "ABC Supply Co.",
  code: "ABC001",
  status: "active",
  type: "Manufacturer",
  email: "john@abcsupply.com",
  phone: "+1 (555) 123-4567",
  website: "https://www.abcsupply.com",
  taxId: "12-3456789",
  paymentTerms: "Net 30",
  currency: "USD",
  creditLimit: 50000,
  description: "Leading manufacturer of industrial supplies and equipment with over 20 years of experience in the market.",
  createdAt: "2023-03-15",
  updatedAt: "2024-01-15",
})

export default async function VendorPage({ params }: VendorPageProps) {
  const { id } = await params
  const vendor = getVendorData(id)

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
          <Link href={`/dashboard/vendors/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Vendor
          </Link>
        </Button>
      </div>

      <VendorDetailTabs vendor={vendor} />
    </div>
  )
}
