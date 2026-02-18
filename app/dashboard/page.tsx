'use client'

import { useEffect, useState } from 'react'
import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react'

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  todayAttendanceRate: number
  totalPresent: number
  totalAbsent: number
  totalLate: number
  totalDays: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-500">Failed to load dashboard</div>
      </div>
    )
  }

  const attendancePercentage = stats.totalDays > 0
    ? Math.round((stats.totalPresent / stats.totalDays) * 100)
    : 0

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: "Today's Attendance",
      value: `${stats.todayAttendanceRate}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Attendance Overview (Last 30 Days)
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Present</span>
              <span className="font-semibold text-green-600">
                {stats.totalPresent} ({stats.totalDays > 0 ? Math.round((stats.totalPresent / stats.totalDays) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Absent</span>
              <span className="font-semibold text-red-600">
                {stats.totalAbsent} ({stats.totalDays > 0 ? Math.round((stats.totalAbsent / stats.totalDays) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${stats.totalDays > 0 ? (stats.totalAbsent / stats.totalDays) * 100 : 0}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Late</span>
              <span className="font-semibold text-yellow-600">
                {stats.totalLate} ({stats.totalDays > 0 ? Math.round((stats.totalLate / stats.totalDays) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: `${stats.totalDays > 0 ? (stats.totalLate / stats.totalDays) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Total Records</span>
              <span className="text-2xl font-bold text-blue-600">{stats.totalDays}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700">Attendance Rate</span>
              <span className="text-2xl font-bold text-green-600">{attendancePercentage}%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
              <span className="text-gray-700">Today's Rate</span>
              <span className="text-2xl font-bold text-orange-600">{stats.todayAttendanceRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
