"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Mail, Database, Shield, Bell } from "lucide-react"

// Mock system parameters
const systemParameters = {
  general: {
    systemName: "PartnerPortal",
    systemVersion: "1.0.0",
    maintenanceMode: false,
    maxFileUploadSize: "10",
    sessionTimeout: "30",
    defaultLanguage: "en",
    timezone: "UTC",
  },
  email: {
    smtpServer: "smtp.partnerportal.com",
    smtpPort: "587",
    smtpUsername: "noreply@partnerportal.com",
    smtpPassword: "••••••••",
    fromEmail: "noreply@partnerportal.com",
    fromName: "PartnerPortal System",
    enableEmailNotifications: true,
  },
  database: {
    backupFrequency: "daily",
    backupRetention: "30",
    maintenanceWindow: "02:00",
    enableQueryLogging: false,
    connectionPoolSize: "20",
  },
  security: {
    passwordMinLength: "8",
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    maxLoginAttempts: "5",
    lockoutDuration: "15",
    enableTwoFactor: false,
    sessionSecure: true,
  },
  notifications: {
    enableInAppNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    notificationRetention: "90",
    batchNotifications: true,
  },
  workflow: {
    autoApprovalThreshold: "1000",
    escalationTimeout: "24",
    enableWorkflowLogging: true,
    defaultApprover: "admin@partnerportal.com",
    requireDualApproval: false,
  },
}

export function Parameterization() {
  const [parameters, setParameters] = useState(systemParameters)
  const [hasChanges, setHasChanges] = useState(false)

  const updateParameter = (section: string, key: string, value: any) => {
    setParameters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const saveChanges = () => {
    // Simulate saving changes
    console.log("Saving parameters:", parameters)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Parameters</h2>
          <p className="text-muted-foreground">Configure system-wide settings and parameters</p>
        </div>
        <Button onClick={saveChanges} disabled={!hasChanges}>
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={parameters.general.systemName}
                    onChange={(e) => updateParameter("general", "systemName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemVersion">System Version</Label>
                  <Input
                    id="systemVersion"
                    value={parameters.general.systemVersion}
                    onChange={(e) => updateParameter("general", "systemVersion", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                  <Input
                    id="maxFileUploadSize"
                    type="number"
                    value={parameters.general.maxFileUploadSize}
                    onChange={(e) => updateParameter("general", "maxFileUploadSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={parameters.general.sessionTimeout}
                    onChange={(e) => updateParameter("general", "sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={parameters.general.defaultLanguage}
                    onValueChange={(value) => updateParameter("general", "defaultLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={parameters.general.timezone}
                    onValueChange={(value) => updateParameter("general", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={parameters.general.maintenanceMode}
                  onCheckedChange={(checked) => updateParameter("general", "maintenanceMode", checked)}
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>SMTP settings and email preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={parameters.email.smtpServer}
                    onChange={(e) => updateParameter("email", "smtpServer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={parameters.email.smtpPort}
                    onChange={(e) => updateParameter("email", "smtpPort", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={parameters.email.smtpUsername}
                    onChange={(e) => updateParameter("email", "smtpUsername", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={parameters.email.smtpPassword}
                    onChange={(e) => updateParameter("email", "smtpPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={parameters.email.fromEmail}
                    onChange={(e) => updateParameter("email", "fromEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={parameters.email.fromName}
                    onChange={(e) => updateParameter("email", "fromName", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEmailNotifications"
                  checked={parameters.email.enableEmailNotifications}
                  onCheckedChange={(checked) => updateParameter("email", "enableEmailNotifications", checked)}
                />
                <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Password policies and security configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={parameters.security.passwordMinLength}
                    onChange={(e) => updateParameter("security", "passwordMinLength", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={parameters.security.maxLoginAttempts}
                    onChange={(e) => updateParameter("security", "maxLoginAttempts", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={parameters.security.lockoutDuration}
                    onChange={(e) => updateParameter("security", "lockoutDuration", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="passwordRequireSpecialChars"
                    checked={parameters.security.passwordRequireSpecialChars}
                    onCheckedChange={(checked) => updateParameter("security", "passwordRequireSpecialChars", checked)}
                  />
                  <Label htmlFor="passwordRequireSpecialChars">Require Special Characters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="passwordRequireNumbers"
                    checked={parameters.security.passwordRequireNumbers}
                    onCheckedChange={(checked) => updateParameter("security", "passwordRequireNumbers", checked)}
                  />
                  <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="passwordRequireUppercase"
                    checked={parameters.security.passwordRequireUppercase}
                    onCheckedChange={(checked) => updateParameter("security", "passwordRequireUppercase", checked)}
                  />
                  <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableTwoFactor"
                    checked={parameters.security.enableTwoFactor}
                    onCheckedChange={(checked) => updateParameter("security", "enableTwoFactor", checked)}
                  />
                  <Label htmlFor="enableTwoFactor">Enable Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sessionSecure"
                    checked={parameters.security.sessionSecure}
                    onCheckedChange={(checked) => updateParameter("security", "sessionSecure", checked)}
                  />
                  <Label htmlFor="sessionSecure">Secure Sessions (HTTPS Only)</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="notificationRetention">Notification Retention (days)</Label>
                  <Input
                    id="notificationRetention"
                    type="number"
                    value={parameters.notifications.notificationRetention}
                    onChange={(e) => updateParameter("notifications", "notificationRetention", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableInAppNotifications"
                    checked={parameters.notifications.enableInAppNotifications}
                    onCheckedChange={(checked) => updateParameter("notifications", "enableInAppNotifications", checked)}
                  />
                  <Label htmlFor="enableInAppNotifications">Enable In-App Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableEmailNotifications"
                    checked={parameters.notifications.enableEmailNotifications}
                    onCheckedChange={(checked) => updateParameter("notifications", "enableEmailNotifications", checked)}
                  />
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSMSNotifications"
                    checked={parameters.notifications.enableSMSNotifications}
                    onCheckedChange={(checked) => updateParameter("notifications", "enableSMSNotifications", checked)}
                  />
                  <Label htmlFor="enableSMSNotifications">Enable SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="batchNotifications"
                    checked={parameters.notifications.batchNotifications}
                    onCheckedChange={(checked) => updateParameter("notifications", "batchNotifications", checked)}
                  />
                  <Label htmlFor="batchNotifications">Batch Notifications</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Workflow Settings
              </CardTitle>
              <CardDescription>Configure approval workflows and business processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="autoApprovalThreshold">Auto-Approval Threshold ($)</Label>
                  <Input
                    id="autoApprovalThreshold"
                    type="number"
                    value={parameters.workflow.autoApprovalThreshold}
                    onChange={(e) => updateParameter("workflow", "autoApprovalThreshold", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escalationTimeout">Escalation Timeout (hours)</Label>
                  <Input
                    id="escalationTimeout"
                    type="number"
                    value={parameters.workflow.escalationTimeout}
                    onChange={(e) => updateParameter("workflow", "escalationTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultApprover">Default Approver Email</Label>
                  <Input
                    id="defaultApprover"
                    type="email"
                    value={parameters.workflow.defaultApprover}
                    onChange={(e) => updateParameter("workflow", "defaultApprover", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableWorkflowLogging"
                    checked={parameters.workflow.enableWorkflowLogging}
                    onCheckedChange={(checked) => updateParameter("workflow", "enableWorkflowLogging", checked)}
                  />
                  <Label htmlFor="enableWorkflowLogging">Enable Workflow Logging</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireDualApproval"
                    checked={parameters.workflow.requireDualApproval}
                    onCheckedChange={(checked) => updateParameter("workflow", "requireDualApproval", checked)}
                  />
                  <Label htmlFor="requireDualApproval">Require Dual Approval for High-Value Items</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>Database maintenance and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={parameters.database.backupFrequency}
                    onValueChange={(value) => updateParameter("database", "backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    value={parameters.database.backupRetention}
                    onChange={(e) => updateParameter("database", "backupRetention", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceWindow">Maintenance Window</Label>
                  <Input
                    id="maintenanceWindow"
                    value={parameters.database.maintenanceWindow}
                    onChange={(e) => updateParameter("database", "maintenanceWindow", e.target.value)}
                    placeholder="HH:MM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connectionPoolSize">Connection Pool Size</Label>
                  <Input
                    id="connectionPoolSize"
                    type="number"
                    value={parameters.database.connectionPoolSize}
                    onChange={(e) => updateParameter("database", "connectionPoolSize", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableQueryLogging"
                  checked={parameters.database.enableQueryLogging}
                  onCheckedChange={(checked) => updateParameter("database", "enableQueryLogging", checked)}
                />
                <Label htmlFor="enableQueryLogging">Enable Query Logging</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
