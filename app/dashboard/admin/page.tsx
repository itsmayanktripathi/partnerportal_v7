import { AdminDashboard } from "@/components/admin-dashboard"
import { Settings, Users, Shield, Palette } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <p className="text-muted-foreground">System administration and configuration management</p>
        </div>
      </div>

      <AdminDashboard />

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/admin/users" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage users and access</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/admin/roles" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Role Management</h3>
                <p className="text-sm text-muted-foreground">Configure roles and permissions</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/admin/profiles" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Palette className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Profile Management</h3>
                <p className="text-sm text-muted-foreground">Customize UI profiles</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/admin/parameterization" className="block">
          <div className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-semibold">Parameterization</h3>
                <p className="text-sm text-muted-foreground">System configuration</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
