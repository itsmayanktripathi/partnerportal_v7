"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Users, FileText, CreditCard, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const onboardingSteps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Company details and contact information",
    icon: Users,
    status: "completed",
  },
  {
    id: 2,
    title: "Business Verification",
    description: "Document verification and compliance",
    icon: FileText,
    status: "completed",
  },
  {
    id: 3,
    title: "Financial Setup",
    description: "Credit terms and payment configuration",
    icon: CreditCard,
    status: "in-progress",
  },
  {
    id: 4,
    title: "System Configuration",
    description: "Account settings and preferences",
    icon: Settings,
    status: "pending",
  },
]

export function CustomerOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(3)

  const completedSteps = onboardingSteps.filter((step) => step.status === "completed").length
  const progress = (completedSteps / onboardingSteps.length) * 100

  const getStepIcon = (step: (typeof onboardingSteps)[0]) => {
    if (step.status === "completed") {
      return <CheckCircle className="h-6 w-6 text-green-600" />
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
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
          <CardDescription>Guide your new retail partner through the setup process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps} of {onboardingSteps.length} completed
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {progress === 100 ? "Onboarding complete!" : `${Math.round(progress)}% complete`}
          </p>
        </CardContent>
      </Card>

      {/* Onboarding Steps */}
      <div className="grid gap-4">
        {onboardingSteps.map((step) => (
          <Card key={step.id} className={`${step.status === "in-progress" ? "border-blue-200 bg-blue-50/50" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getStepIcon(step)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {getStepStatus(step.status)}
                  </div>

                  {step.status === "in-progress" && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Continue Setup</Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  )}

                  {step.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" disabled>
                        Start Step
                      </Button>
                    </div>
                  )}

                  {step.status === "completed" && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="ghost" size="sm">
                        Review
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
          <CardDescription>Common onboarding tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start bg-transparent">
              <FileText className="mr-2 h-4 w-4" />
              Send Welcome Email
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              Schedule Training Call
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <CreditCard className="mr-2 h-4 w-4" />
              Set Credit Terms
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Settings className="mr-2 h-4 w-4" />
              Configure Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
