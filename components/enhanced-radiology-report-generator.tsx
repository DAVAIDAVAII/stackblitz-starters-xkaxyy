'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function EnhancedRadiologyReportGenerator() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
  })
  const [examType, setExamType] = useState('')
  const [clinicalHistory, setClinicalHistory] = useState('')
  const [findings, setFindings] = useState('')
  const [impression, setImpression] = useState('')
  const [generatedReport, setGeneratedReport] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo,
          examType,
          clinicalHistory,
          findings,
          impression,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedReport(data.report)
        toast({
          title: "Report generated successfully",
          description: "You can now review and edit the generated report.",
        })
      } else {
        throw new Error('Failed to generate report')
      }
    } catch (error) {
      console.error('Error generating report:', error)
      toast({
        title: "Error generating report",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Enhanced Radiology Report Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Patient Name"
            value={patientInfo.name}
            onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
            required
          />
          <Input
            placeholder="Patient Age"
            type="number"
            value={patientInfo.age}
            onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
            required
          />
          <Select onValueChange={(value) => setPatientInfo({ ...patientInfo, gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select onValueChange={setExamType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Exam Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xray">X-Ray</SelectItem>
            <SelectItem value="ct">CT Scan</SelectItem>
            <SelectItem value="mri">MRI</SelectItem>
            <SelectItem value="ultrasound">Ultrasound</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Clinical History"
          value={clinicalHistory}
          onChange={(e) => setClinicalHistory(e.target.value)}
          required
        />
        <Textarea
          placeholder="Findings"
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          required
        />
        <Textarea
          placeholder="Impression"
          value={impression}
          onChange={(e) => setImpression(e.target.value)}
          required
        />
        <Button type="submit">Generate Report</Button>
      </form>
      {generatedReport && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Report</h2>
          <Textarea
            value={generatedReport}
            onChange={(e) => setGeneratedReport(e.target.value)}
            rows={10}
            className="w-full"
          />
          <Button className="mt-4" onClick={() => {/* Implement save functionality */}}>
            Save Report
          </Button>
        </div>
      )}
    </div>
  )
}