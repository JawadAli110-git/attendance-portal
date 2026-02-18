import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = session.user.role
    const userId = session.user.id

    // Get basic counts
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' }
    })

    const totalTeachers = await prisma.user.count({
      where: { role: 'TEACHER' }
    })

    const totalClasses = await prisma.class.count()

    // Get today's attendance rate
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayAttendance = await prisma.attendance.findMany({
      where: {
        date: today
      }
    })

    const presentToday = todayAttendance.filter(a => a.status === 'PRESENT').length
    const todayAttendanceRate = todayAttendance.length > 0
      ? Math.round((presentToday / todayAttendance.length) * 100)
      : 0

    // Get recent attendance data for charts (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    let attendanceData
    if (role === 'STUDENT') {
      attendanceData = await prisma.attendance.findMany({
        where: {
          studentId: userId,
          date: {
            gte: thirtyDaysAgo
          }
        },
        orderBy: {
          date: 'asc'
        }
      })
    } else {
      attendanceData = await prisma.attendance.findMany({
        where: {
          date: {
            gte: thirtyDaysAgo
          }
        },
        orderBy: {
          date: 'asc'
        }
      })
    }

    // Group attendance by date
    const attendanceByDate = attendanceData.reduce((acc: any, record) => {
      const dateKey = record.date.toISOString().split('T')[0]
      if (!acc[dateKey]) {
        acc[dateKey] = { present: 0, absent: 0, late: 0, total: 0 }
      }
      acc[dateKey].total++
      if (record.status === 'PRESENT') acc[dateKey].present++
      else if (record.status === 'ABSENT') acc[dateKey].absent++
      else if (record.status === 'LATE') acc[dateKey].late++
      return acc
    }, {})

    // Calculate statistics
    const stats = {
      totalPresent: attendanceData.filter(a => a.status === 'PRESENT').length,
      totalAbsent: attendanceData.filter(a => a.status === 'ABSENT').length,
      totalLate: attendanceData.filter(a => a.status === 'LATE').length,
      totalDays: attendanceData.length,
    }

    return NextResponse.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalClasses,
        todayAttendanceRate,
        ...stats,
      },
      attendanceByDate,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
