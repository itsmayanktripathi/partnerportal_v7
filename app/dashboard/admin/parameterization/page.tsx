import { Parameterization } from "@/components/admin/parameterization"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ParameterizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Parameterization</h1>
          <p className="text-muted-foreground">Configure system parameters and settings</p>
        </div>
      </div>

      <Parameterization />
    </div>
  )
}
