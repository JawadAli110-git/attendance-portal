import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch attendance records
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    const studentId = searchParams.get('studentId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}

    if (classId) where.classId = classId
    if (studentId) where.studentId = studentId
    if (session.user.role === 'STUDENT') where.studentId = session.user.id
    
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const attendance = await prisma.attendance.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        class: {
          select: {
            id: true,
            name: true,
            section: true,
          }
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Attendance GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

// POST - Mark attendance
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role === 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { classId, date, attendanceRecords } = body

    if (!classId || !date || !attendanceRecords) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const attendanceDate = new Date(date)
    attendanceDate.setHours(0, 0, 0, 0)

    // Delete existing attendance for this class and date
    await prisma.attendance.deleteMany({
      where: {
        classId,
        date: attendanceDate,
      },
    })

    // Create new attendance records
    const records = attendanceRecords.map((record: any) => ({
      studentId: record.studentId,
      classId,
      date: attendanceDate,
      status: record.status,
      markedById: session.user.id,
    }))

    await prisma.attendance.createMany({
      data: records,
    })

    return NextResponse.json({ message: 'Attendance marked successfully' })
  } catch (error) {
    console.error('Attendance POST error:', error)
    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    )
  }
}

// PUT - Update attendance
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role === 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { attendanceId, status } = body

    await prisma.attendance.update({
      where: { id: attendanceId },
      data: { status },
    })

    return NextResponse.json({ message: 'Attendance updated successfully' })
  } catch (error) {
    console.error('Attendance PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update attendance' },
      { status: 500 }
    )
  }
}
