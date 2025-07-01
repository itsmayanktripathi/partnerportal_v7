import { RoleManagement } from "@/components/role-management"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function RoleManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground">Configure user roles and permissions</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/roles/add">
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Link>
        </Button>
      </div>

      <RoleManagement />
    </div>
  )
}
