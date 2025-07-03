"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function MassAddItems() {
  const [uploadStep, setUploadStep] = useState<"upload" | "processing" | "review" | "complete">("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Mock processed data
  const processedItems = [
    {
      row: 1,
      name: "Premium Coffee Beans",
      sku: "PCB-001",
      category: "Food & Beverage",
      vendor: "ABC Supply Co.",
      status: "valid",
      errors: [],
    },
    {
      row: 2,
      name: "Organic Green Tea",
      sku: "OGT-002",
      category: "Food & Beverage",
      vendor: "Premium Foods LLC",
      status: "valid",
      errors: [],
    },
    {
      row: 3,
      name: "Invalid Item",
      sku: "",
      category: "Electronics",
      vendor: "Unknown Vendor",
      status: "error",
      errors: ["SKU is required", "Vendor not found"],
    },
    {
      row: 4,
      name: "Wireless Headphones",
      sku: "WH-003",
      category: "Electronics",
      vendor: "Tech Solutions Pro",
      status: "warning",
      errors: ["Price not specified, using default"],
    },
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setUploadStep("processing")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStep("review")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleConfirmImport = () => {
    setUploadStep("complete")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const validItems = processedItems.filter((item) => item.status === "valid").length
  const warningItems = processedItems.filter((item) => item.status === "warning").length
  const errorItems = processedItems.filter((item) => item.status === "error").length

  return (
    <div className="space-y-6">
      {uploadStep === "upload" && (
        <>
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Excel Upload Instructions
              </CardTitle>
              <CardDescription>Follow these steps to successfully upload your items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Required Columns:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Item Name (required)</li>
                    <li>• SKU (required)</li>
                    <li>• Category (required)</li>
                    <li>• Vendor (required)</li>
                    <li>• Description</li>
                    <li>• Price</li>
                    <li>• Cost</li>
                    <li>• Weight</li>
                    <li>• Dimensions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">File Requirements:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Excel format (.xlsx, .xls)</li>
                    <li>• Maximum 1000 rows</li>
                    <li>• First row should contain headers</li>
                    <li>• File size limit: 10MB</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  View Sample Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Excel File</CardTitle>
              <CardDescription>Select your Excel file containing item data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Excel File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>

              {selectedFile && (
                <Alert>
                  <FileSpreadsheet className="h-4 w-4" />
                  <AlertDescription>
                    Selected file: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleUpload} disabled={!selectedFile} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload and Process
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {uploadStep === "processing" && (
        <Card>
          <CardHeader>
            <CardTitle>Processing File</CardTitle>
            <CardDescription>Please wait while we process your Excel file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">Processing... {uploadProgress}% complete</p>
          </CardContent>
        </Card>
      )}

      {uploadStep === "review" && (
        <>
          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{processedItems.length}</p>
                  </div>
                  <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Valid</p>
                    <p className="text-2xl font-bold text-green-600">{validItems}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                    <p className="text-2xl font-bold text-yellow-600">{warningItems}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Errors</p>
                    <p className="text-2xl font-bold text-red-600">{errorItems}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Table */}
          <Card>
            <CardHeader>
              <CardTitle>Review Items</CardTitle>
              <CardDescription>Review the processed items before importing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedItems.map((item) => (
                    <TableRow key={item.row}>
                      <TableCell>{item.row}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.vendor}</TableCell>
                      <TableCell>
                        {item.errors.length > 0 && (
                          <div className="space-y-1">
                            {item.errors.map((error, index) => (
                              <p key={index} className="text-xs text-red-600">
                                {error}
                              </p>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setUploadStep("upload")}>
              Upload Different File
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Import Valid Items Only</Button>
              <Button onClick={handleConfirmImport} disabled={errorItems > 0}>
                Import All Items
              </Button>
            </div>
          </div>
        </>
      )}

      {uploadStep === "complete" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold">Import Successful!</h3>
                <p className="text-muted-foreground">
                  {validItems} items have been successfully imported to your catalog.
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={() => setUploadStep("upload")}>
                  Import More Items
                </Button>
                <Button>View Imported Items</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
