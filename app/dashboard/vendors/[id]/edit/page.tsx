import { EditVendorForm } from "@/components/vendor/edit-vendor-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditVendorPageProps {
  params: {
    id: string
  }
}

export default function EditVendorPage({ params }: EditVendorPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/vendors/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vendor
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Vendor</h1>
          <p className="text-muted-foreground">Update vendor information and settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Vendor Information</CardTitle>
          <CardDescription>Update the vendor details below</CardDescription>
        </CardHeader>
        <CardContent>
          <EditVendorForm vendorId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
