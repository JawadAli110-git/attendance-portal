'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Download } from 'lucide-react'

export default function ReportsPage() {
  const { data: session } = useSession()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  const generateReport = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/attendance?startDate=${startDate}&endDate=${endDate}`
      )
      const data = await response.json()
      
      // Calculate statistics
      const present = data.filter((r: any) => r.status === 'PRESENT').length
      const absent = data.filter((r: any) => r.status === 'ABSENT').length
      const late = data.filter((r: any) => r.status === 'LATE').length
      const total = data.length

      setReportData({
        records: data,
        stats: {
          total,
          present,
          absent,
          late,
          presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
        },
      })
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    if (!reportData) return

    const headers = ['Date', 'Student', 'Class', 'Status']
    const rows = reportData.records.map((r: any) => [
      new Date(r.date).toLocaleDateString(),
      r.student.name,
      `${r.class.name} - Section ${r.class.section}`,
      r.status,
    ])

    const csv = [
      headers.join(','),
      ...rows.map((row: any[]) => row.join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance-report-${startDate}-to-${endDate}.csv`
    a.click()
  }

  if (session?.user.role === 'STUDENT') {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">Students cannot access reports</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Generate Attendance Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {reportData && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Report Summary</h2>
              <button
                onClick={downloadCSV}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Download className="h-5 w-5" />
                <span>Download CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Records</p>
                <p className="text-2xl font-bold text-blue-600">{reportData.stats.total}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Present</p>
                <p className="text-2xl font-bold text-green-600">{reportData.stats.present}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Absent</p>
                <p className="text-2xl font-bold text-red-600">{reportData.stats.absent}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{reportData.stats.late}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Attendance %</p>
                <p className="text-2xl font-bold text-purple-600">
                  {reportData.stats.presentPercentage}%
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
