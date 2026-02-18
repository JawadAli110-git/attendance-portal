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

    const where: any = {}

    if (session.user.role === 'TEACHER') {
      where.teacherId = session.user.id
    }

    const classes = await prisma.class.findMany({
      where,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        students: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        _count: {
          select: {
            students: true,
          }
        }
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(classes)
  } catch (error) {
    console.error('Classes GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, section, teacherId } = body

    const newClass = await prisma.class.create({
      data: {
        name,
        section,
        teacherId,
      },
    })

    return NextResponse.json(newClass)
  } catch (error) {
    console.error('Classes POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    )
  }
}
