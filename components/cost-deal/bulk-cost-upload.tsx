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
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react"

interface UploadResult {
  total: number
  successful: number
  failed: number
  errors: Array<{ row: number; sku: string; error: string }>
}

export function BulkCostUpload() {
  const [file, setFile] = useState<File | null>(null)
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
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Simulate upload result
          setUploadResult({
            total: 150,
            successful: 142,
            failed: 8,
            errors: [
              { row: 15, sku: "ABC-001", error: "Invalid cost format" },
              { row: 23, sku: "DEF-002", error: "SKU not found" },
              { row: 45, sku: "GHI-003", error: "Cost cannot be negative" },
              { row: 67, sku: "JKL-004", error: "Missing required field" },
              { row: 89, sku: "MNO-005", error: "Duplicate SKU in file" },
              { row: 101, sku: "PQR-006", error: "Invalid date format" },
              { row: 123, sku: "STU-007", error: "Cost exceeds maximum limit" },
              { row: 134, sku: "VWX-008", error: "Vendor not authorized" },
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
    link.href = "/templates/cost-upload-template.xlsx"
    link.download = "cost-upload-template.xlsx"
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Upload Instructions
          </CardTitle>
          <CardDescription>Follow these steps to successfully upload cost changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Required Columns:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• SKU (Product SKU)</li>
                  <li>• Current Cost</li>
                  <li>• New Cost</li>
                  <li>• Effective Date</li>
                  <li>• Reason for Change</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">File Requirements:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Excel format (.xlsx, .xls)</li>
                  <li>• Maximum 1000 rows</li>
                  <li>• File size limit: 5MB</li>
                  <li>• First row must be headers</li>
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
          <CardTitle>Upload Cost Changes</CardTitle>
          <CardDescription>Select your Excel file containing cost updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this cost update batch..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Processing..." : "Upload Cost Changes"}
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
                <div className="text-sm text-blue-600">Total Records</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{uploadResult.successful}</div>
                <div className="text-sm text-green-600">Successful</div>
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
                    {uploadResult.failed} records failed to process. Please review the errors below and fix them in your
                    file.
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
              <Button>View Updated Items</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
