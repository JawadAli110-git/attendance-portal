'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Check, X, Clock, Save } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
}

interface Class {
  id: string
  name: string
  section: string
  students: Array<{
    student: Student
  }>
}

interface AttendanceRecord {
  studentId: string
  status: 'PRESENT' | 'ABSENT' | 'LATE'
}

export default function MarkAttendancePage() {
  const { data: session } = useSession()
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>
  >({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchClasses()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      const cls = classes.find((c) => c.id === selectedClass)
      if (cls) {
        const initialRecords: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {}
        cls.students.forEach((s) => {
          initialRecords[s.student.id] = 'PRESENT'
        })
        setAttendanceRecords(initialRecords)
      }
    }
  }, [selectedClass, classes])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes')
      const data = await response.json()
      setClasses(data)
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    }
  }

  const handleStatusChange = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const markAllPresent = () => {
    const updatedRecords = { ...attendanceRecords }
    Object.keys(updatedRecords).forEach((studentId) => {
      updatedRecords[studentId] = 'PRESENT'
    })
    setAttendanceRecords(updatedRecords)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const records = Object.entries(attendanceRecords).map(([studentId, status]) => ({
        studentId,
        status,
      }))

      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: selectedClass,
          date: selectedDate,
          attendanceRecords: records,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        alert('Failed to mark attendance')
      }
    } catch (error) {
      console.error('Failed to mark attendance:', error)
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const selectedClassData = classes.find((c) => c.id === selectedClass)

  if (session?.user.role !== 'TEACHER') {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">Only teachers can access this page</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mark Attendance</h1>

      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Attendance marked successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a class...</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={markAllPresent}
              disabled={!selectedClass}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      {selectedClassData && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">
                Students ({selectedClassData.students.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {selectedClassData.students.map(({ student }) => (
                <div
                  key={student.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'PRESENT')}
                      className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                        attendanceRecords[student.id] === 'PRESENT'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span>Present</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'LATE')}
                      className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                        attendanceRecords[student.id] === 'LATE'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Clock className="h-4 w-4" />
                      <span>Late</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'ABSENT')}
                      className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                        attendanceRecords[student.id] === 'ABSENT'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <X className="h-4 w-4" />
                      <span>Absent</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>{loading ? 'Saving...' : 'Save Attendance'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {!selectedClass && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500">Please select a class to mark attendance</p>
        </div>
      )}
    </div>
  )
}
