"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, Settings, Activity, AlertTriangle, CheckCircle } from "lucide-react"

const systemStats = {
  totalUsers: 45,
  activeUsers: 38,
  totalRoles: 4,
  activeProfiles: 3,
  systemHealth: "healthy",
  lastBackup: "2024-01-28 02:00 AM",
  pendingApprovals: 7,
  systemAlerts: 2,
}

const recentActivity = [
  {
    id: 1,
    action: "User created",
    user: "John Doe",
    details: "New vendor user account created",
    timestamp: "2 hours ago",
    type: "user",
  },
  {
    id: 2,
    action: "Role updated",
    user: "Admin",
    details: "Reviewer role permissions modified",
    timestamp: "4 hours ago",
    type: "role",
  },
  {
    id: 3,
    action: "Profile customized",
    user: "Sarah Johnson",
    details: "Vendor profile UI settings updated",
    timestamp: "6 hours ago",
    type: "profile",
  },
  {
    id: 4,
    action: "System parameter changed",
    user: "Admin",
    details: "Email notification settings updated",
    timestamp: "1 day ago",
    type: "system",
  },
]

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "2 users have not logged in for over 30 days",
    timestamp: "1 hour ago",
  },
  {
    id: 2,
    type: "info",
    message: "System backup completed successfully",
    timestamp: "2 hours ago",
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{systemStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{systemStats.activeUsers} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Roles</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.totalRoles}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">All roles configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">UI Profiles</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.activeProfiles}</p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Customized profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest administrative actions and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle
                    className={`h-4 w-4 mt-0.5 ${alert.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Backup</label>
              <p className="font-medium">{systemStats.lastBackup}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pending Approvals</label>
              <p className="font-medium">{systemStats.pendingApprovals} items</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">System Alerts</label>
              <p className="font-medium">{systemStats.systemAlerts} active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
