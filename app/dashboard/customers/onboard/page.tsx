import { CustomerOnboardingFlow } from "@/components/customer-onboarding-flow"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CustomerOnboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Onboarding</h1>
          <p className="text-muted-foreground">Guide new retail partners through the onboarding process</p>
        </div>
      </div>

      <CustomerOnboardingFlow />
    </div>
  )
}
