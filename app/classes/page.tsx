'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface Class {
  id: string
  name: string
  section: string
  teacher: {
    id: string
    name: string
    email: string
  }
  _count: {
    students: number
  }
}

export default function ClassesPage() {
  const { data: session } = useSession()
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes')
      const data = await response.json()
      setClasses(data)
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading classes...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {cls.name}
            </h3>
            <p className="text-gray-600 mb-4">Section {cls.section}</p>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Teacher:</span>
                <span className="font-medium text-gray-900">{cls.teacher.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Students:</span>
                <span className="font-medium text-gray-900">{cls._count.students}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500">No classes found</p>
        </div>
      )}
    </div>
  )
}
