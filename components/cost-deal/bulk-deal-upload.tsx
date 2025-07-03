"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, CheckCircle, AlertTriangle, Percent } from "lucide-react"

interface UploadResult {
  total: number
  successful: number
  failed: number
  errors: Array<{ row: number; sku: string; error: string }>
}

export function BulkDealUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [dealType, setDealType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [notes, setNotes] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file || !dealType) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Simulate upload result
          setUploadResult({
            total: 85,
            successful: 78,
            failed: 7,
            errors: [
              { row: 12, sku: "ABC-001", error: "Invalid discount percentage" },
              { row: 25, sku: "DEF-002", error: "Start date cannot be in the past" },
              { row: 38, sku: "GHI-003", error: "End date must be after start date" },
              { row: 52, sku: "JKL-004", error: "SKU not found in catalog" },
              { row: 64, sku: "MNO-005", error: "Discount exceeds maximum allowed" },
              { row: 71, sku: "PQR-006", error: "Deal name already exists" },
              { row: 83, sku: "STU-007", error: "Invalid deal type" },
            ],
          })
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const downloadTemplate = () => {
    // In real app, this would download an actual Excel template
    const link = document.createElement("a")
    link.href = "/templates/deal-upload-template.xlsx"
    link.download = "deal-upload-template.xlsx"
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Deal Upload Instructions
          </CardTitle>
          <CardDescription>Follow these steps to successfully upload promotional deals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Required Columns:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Deal Name</li>
                  <li>• SKU (Product SKU)</li>
                  <li>• Discount Type (%, $)</li>
                  <li>• Discount Value</li>
                  <li>• Start Date</li>
                  <li>• End Date</li>
                  <li>• Minimum Quantity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Deal Types:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Percentage Discount</li>
                  <li>• Fixed Amount Discount</li>
                  <li>• Buy X Get Y Free</li>
                  <li>• Volume Discount</li>
                  <li>• Bundle Deal</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Deal Changes</CardTitle>
          <CardDescription>Select your Excel file containing promotional deals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dealType">Deal Type</Label>
            <Select value={dealType} onValueChange={setDealType} disabled={isUploading}>
              <SelectTrigger>
                <SelectValue placeholder="Select deal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Discount</SelectItem>
                <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                <SelectItem value="bogo">Buy X Get Y Free</SelectItem>
                <SelectItem value="volume">Volume Discount</SelectItem>
                <SelectItem value="bundle">Bundle Deal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Excel File</Label>
            <Input id="file" type="file" accept=".xlsx,.xls" onChange={handleFileChange} disabled={isUploading} />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Campaign Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this promotional campaign..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing deals...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <Button onClick={handleUpload} disabled={!file || !dealType || isUploading} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Processing..." : "Upload Deals"}
          </Button>
        </CardContent>
      </Card>

      {/* Upload Results */}
      {uploadResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Upload Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{uploadResult.total}</div>
                <div className="text-sm text-blue-600">Total Deals</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{uploadResult.successful}</div>
                <div className="text-sm text-green-600">Created</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{uploadResult.failed}</div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
            </div>

            {uploadResult.failed > 0 && (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {uploadResult.failed} deals failed to process. Please review the errors below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-medium">Errors:</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {uploadResult.errors.map((error, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <span className="font-medium">Row {error.row}</span>
                          <span className="mx-2">•</span>
                          <span className="font-mono text-sm">{error.sku}</span>
                        </div>
                        <Badge variant="destructive">{error.error}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Error Report
              </Button>
              <Button>View Active Deals</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
