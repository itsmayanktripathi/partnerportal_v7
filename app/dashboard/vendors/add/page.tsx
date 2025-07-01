import { AddVendorForm } from "@/components/add-vendor-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddVendorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/vendors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vendors
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Vendor</h1>
          <p className="text-muted-foreground">Register a new vendor partner in the system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
          <CardDescription>Fill in the details below to add a new vendor to your network</CardDescription>
        </CardHeader>
        <CardContent>
          <AddVendorForm />
        </CardContent>
      </Card>
    </div>
  )
}
