import { VendorOnboardingFlow } from "@/components/vendor-onboarding-flow"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VendorOnboardPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Vendor Onboarding</h1>
          <p className="text-muted-foreground">Guide new vendor partners through the onboarding process</p>
        </div>
      </div>

      <VendorOnboardingFlow />
    </div>
  )
}
