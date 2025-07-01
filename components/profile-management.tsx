"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Eye } from "lucide-react"

// Mock profile configurations
const profiles = [
  {
    id: "vendor",
    name: "Vendor",
    description: "Customized interface for vendor partners",
    userCount: 2,
    color: "green",
    features: {
      dashboard: {
        enabled: true,
        widgets: ["proposals", "items", "notifications"],
        hiddenWidgets: ["customer_stats", "revenue_analytics"],
      },
      navigation: {
        hiddenMenus: ["customers", "customer_onboarding", "administration"],
        customOrder: ["dashboard", "items", "vendors"],
      },
      itemManagement: {
        viewOnly: ["customer_data", "pricing_history"],
        hidden: ["cost_data", "margin_analysis"],
        allowedActions: ["create_proposal", "view_items"],
      },
      branding: {
        primaryColor: "#10b981",
        logo: "vendor-logo.png",
        theme: "light",
      },
    },
  },
  {
    id: "reviewer",
    name: "Reviewer",
    description: "Interface optimized for review and approval workflows",
    userCount: 1,
    color: "yellow",
    features: {
      dashboard: {
        enabled: true,
        widgets: ["pending_reviews", "items", "vendor_activity"],
        hiddenWidgets: ["customer_onboarding"],
      },
      navigation: {
        hiddenMenus: ["customer_onboarding", "administration"],
        customOrder: ["dashboard", "items", "vendors", "customers"],
      },
      itemManagement: {
        viewOnly: [],
        hidden: [],
        allowedActions: ["review_proposals", "approve_items", "edit_items"],
      },
      branding: {
        primaryColor: "#f59e0b",
        logo: "reviewer-logo.png",
        theme: "light",
      },
    },
  },
  {
    id: "approver",
    name: "Approver",
    description: "Full access interface for approval and customer management",
    userCount: 1,
    color: "blue",
    features: {
      dashboard: {
        enabled: true,
        widgets: ["all_widgets"],
        hiddenWidgets: [],
      },
      navigation: {
        hiddenMenus: ["administration"],
        customOrder: ["dashboard", "customers", "items", "vendors"],
      },
      itemManagement: {
        viewOnly: [],
        hidden: [],
        allowedActions: ["all_actions"],
      },
      branding: {
        primaryColor: "#3b82f6",
        logo: "approver-logo.png",
        theme: "light",
      },
    },
  },
  {
    id: "admin",
    name: "Admin",
    description: "Complete system access with administrative controls",
    userCount: 1,
    color: "purple",
    features: {
      dashboard: {
        enabled: true,
        widgets: ["all_widgets"],
        hiddenWidgets: [],
      },
      navigation: {
        hiddenMenus: [],
        customOrder: ["dashboard", "administration", "customers", "vendors", "items"],
      },
      itemManagement: {
        viewOnly: [],
        hidden: [],
        allowedActions: ["all_actions"],
      },
      branding: {
        primaryColor: "#8b5cf6",
        logo: "admin-logo.png",
        theme: "light",
      },
    },
  },
]

const getProfileColor = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800"
    case "yellow":
      return "bg-yellow-100 text-yellow-800"
    case "blue":
      return "bg-blue-100 text-blue-800"
    case "purple":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ProfileManagement() {
  const [selectedProfile, setSelectedProfile] = useState("vendor")

  const currentProfile = profiles.find((p) => p.id === selectedProfile)

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`cursor-pointer transition-all ${selectedProfile === profile.id ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
            onClick={() => setSelectedProfile(profile.id)}
          >
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Badge className={getProfileColor(profile.color)}>{profile.name}</Badge>
                <p className="text-2xl font-bold">{profile.userCount}</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Configuration */}
      {currentProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {currentProfile.name} Profile Configuration
            </CardTitle>
            <CardDescription>{currentProfile.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dashboard Configuration</CardTitle>
                    <CardDescription>Configure dashboard widgets and layout</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dashboard-enabled">Enable Dashboard</Label>
                      <Switch id="dashboard-enabled" checked={currentProfile.features.dashboard.enabled} />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Visible Widgets</Label>
                      <div className="mt-2 space-y-2">
                        {currentProfile.features.dashboard.widgets.map((widget) => (
                          <div key={widget} className="flex items-center space-x-2">
                            <Switch checked={true} />
                            <Label className="text-sm">{widget.replace("_", " ").toUpperCase()}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentProfile.features.dashboard.hiddenWidgets.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Hidden Widgets</Label>
                        <div className="mt-2 space-y-2">
                          {currentProfile.features.dashboard.hiddenWidgets.map((widget) => (
                            <div key={widget} className="flex items-center space-x-2">
                              <Switch checked={false} />
                              <Label className="text-sm text-muted-foreground">
                                {widget.replace("_", " ").toUpperCase()}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Navigation Configuration</CardTitle>
                    <CardDescription>Configure menu visibility and order</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Menu Order</Label>
                      <div className="mt-2 space-y-2">
                        {currentProfile.features.navigation.customOrder.map((menu, index) => (
                          <div key={menu} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium">{index + 1}.</span>
                            <Label className="text-sm">{menu.replace("_", " ").toUpperCase()}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentProfile.features.navigation.hiddenMenus.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Hidden Menus</Label>
                        <div className="mt-2 space-y-2">
                          {currentProfile.features.navigation.hiddenMenus.map((menu) => (
                            <div key={menu} className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-gray-400" />
                              <Label className="text-sm text-muted-foreground">
                                {menu.replace("_", " ").toUpperCase()}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Item Management Permissions</CardTitle>
                    <CardDescription>Configure data visibility and allowed actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Allowed Actions</Label>
                      <div className="mt-2 space-y-2">
                        {currentProfile.features.itemManagement.allowedActions.map((action) => (
                          <div key={action} className="flex items-center space-x-2">
                            <Switch checked={true} />
                            <Label className="text-sm">{action.replace("_", " ").toUpperCase()}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentProfile.features.itemManagement.viewOnly.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">View-Only Data</Label>
                        <div className="mt-2 space-y-2">
                          {currentProfile.features.itemManagement.viewOnly.map((data) => (
                            <div key={data} className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-600" />
                              <Label className="text-sm">{data.replace("_", " ").toUpperCase()}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentProfile.features.itemManagement.hidden.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Hidden Data</Label>
                        <div className="mt-2 space-y-2">
                          {currentProfile.features.itemManagement.hidden.map((data) => (
                            <div key={data} className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-gray-400" />
                              <Label className="text-sm text-muted-foreground">
                                {data.replace("_", " ").toUpperCase()}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="branding" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Branding & Theme</CardTitle>
                    <CardDescription>Customize visual appearance and branding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">Primary Color</Label>
                        <div className="mt-2 flex items-center space-x-2">
                          <div
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: currentProfile.features.branding.primaryColor }}
                          />
                          <span className="text-sm font-mono">{currentProfile.features.branding.primaryColor}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Theme</Label>
                        <p className="mt-2 text-sm">{currentProfile.features.branding.theme}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Logo</Label>
                        <p className="mt-2 text-sm">{currentProfile.features.branding.logo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Profile Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Preview Profile</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
