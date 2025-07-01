"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Building2, FileText, Shield, Package, Settings, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

const onboardingSteps = [
  {
    id: 1,
    title: "Company Registration",
    description: "Basic company information and contact details",
    icon: Building2,
    status: "completed",
    estimatedTime: "15 minutes",
    requirements: ["Business license", "Tax ID", "Contact information"],
  },
  {
    id: 2,
    title: "Document Verification",
    description: "Upload and verify required business documents",
    icon: FileText,
    status: "completed",
    estimatedTime: "30 minutes",
    requirements: ["Business license", "Insurance certificates", "Tax documents", "Banking information"],
  },
  {
    id: 3,
    title: "Compliance & Certifications",
    description: "Industry certifications and compliance verification",
    icon: Shield,
    status: "in-progress",
    estimatedTime: "45 minutes",
    requirements: ["Industry certifications", "Safety compliance", "Quality standards", "Environmental permits"],
  },
  {
    id: 4,
    title: "Product Catalog Setup",
    description: "Initial product catalog and pricing configuration",
    icon: Package,
    status: "pending",
    estimatedTime: "60 minutes",
    requirements: ["Product specifications", "Pricing structure", "Inventory data", "Product images"],
  },
  {
    id: 5,
    title: "System Integration",
    description: "API setup and system integration configuration",
    icon: Settings,
    status: "pending",
    estimatedTime: "30 minutes",
    requirements: ["API credentials", "System preferences", "Notification settings", "User accounts"],
  },
]

const vendorInfo = {
  companyName: "Premium Manufacturing Co.",
  contactPerson: "Sarah Johnson",
  email: "sarah@premiummanufacturing.com",
  phone: "+1 (555) 987-6543",
  businessType: "Manufacturer",
  registrationDate: "2024-01-20",
  expectedGoLive: "2024-02-15",
}

export function VendorOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(3)

  const completedSteps = onboardingSteps.filter((step) => step.status === "completed").length
  const progress = (completedSteps / onboardingSteps.length) * 100

  const getStepIcon = (step: (typeof onboardingSteps)[0]) => {
    if (step.status === "completed") {
      return <CheckCircle className="h-6 w-6 text-green-600" />
    }
    if (step.status === "in-progress") {
      return (
        <div className="h-6 w-6 rounded-full border-2 border-blue-600 bg-blue-100 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-blue-600" />
        </div>
      )
    }
    return <Circle className="h-6 w-6 text-gray-400" />
  }

  const getStepStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Vendor Information Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Vendor Information
          </CardTitle>
          <CardDescription>Current vendor being onboarded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                <p className="font-semibold">{vendorInfo.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
                <p>{vendorInfo.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p>{vendorInfo.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                <p>{vendorInfo.businessType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                <p>{vendorInfo.registrationDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Expected Go-Live</label>
                <p className="font-semibold text-blue-600">{vendorInfo.expectedGoLive}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
          <CardDescription>Track the vendor's progress through the onboarding process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps} of {onboardingSteps.length} completed
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {progress === 100 ? "Onboarding complete!" : `${Math.round(progress)}% complete`}
            </span>
            <span className="text-muted-foreground">
              Estimated time remaining:{" "}
              {onboardingSteps
                .filter((s) => s.status === "pending")
                .reduce((acc, step) => acc + Number.parseInt(step.estimatedTime), 0)}{" "}
              minutes
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Important Notices */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Action Required:</strong> Compliance & Certifications step is currently in progress and requires
          vendor attention. Expected completion by end of business today.
        </AlertDescription>
      </Alert>

      {/* Onboarding Steps */}
      <div className="grid gap-4">
        {onboardingSteps.map((step) => (
          <Card key={step.id} className={`${step.status === "in-progress" ? "border-blue-200 bg-blue-50/50" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getStepIcon(step)}</div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Estimated time: {step.estimatedTime}</p>
                    </div>
                    {getStepStatus(step.status)}
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Required Documents/Information:</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {step.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {step.status === "in-progress" && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Review Submission</Button>
                      <Button variant="outline" size="sm">
                        Contact Vendor
                      </Button>
                      <Button variant="outline" size="sm">
                        View Documents
                      </Button>
                    </div>
                  )}

                  {step.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" disabled>
                        Waiting for Previous Step
                      </Button>
                      <Button variant="ghost" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  )}

                  {step.status === "completed" && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="ghost" size="sm">
                        Review Completed
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Documents
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common onboarding tasks and vendor communication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-start bg-transparent">
              <FileText className="mr-2 h-4 w-4" />
              Send Welcome Package
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Building2 className="mr-2 h-4 w-4" />
              Schedule Kickoff Call
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Review Compliance
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Package className="mr-2 h-4 w-4" />
              Setup Product Catalog
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Settings className="mr-2 h-4 w-4" />
              Configure Integration
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Escalate Issues
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Timeline</CardTitle>
          <CardDescription>Key milestones and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Registration Completed</p>
                  <p className="text-sm text-green-700">January 20, 2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Document Verification</p>
                  <p className="text-sm text-green-700">January 25, 2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-blue-600 bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Compliance Review</p>
                  <p className="text-sm text-blue-700">Expected: February 1, 2024</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Circle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Product Catalog Setup</p>
                  <p className="text-sm text-gray-600">Expected: February 8, 2024</p>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Circle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Go-Live</p>
                  <p className="text-sm text-gray-600">Target: February 15, 2024</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Target</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
          <CardDescription>Latest interactions with the vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Compliance documents submitted</p>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vendor submitted ISO 9001 certification and safety compliance documents for review.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Kickoff call scheduled</p>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Initial onboarding call scheduled for February 2nd at 2:00 PM EST.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Welcome package sent</p>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Onboarding welcome package with portal access credentials sent to vendor.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
