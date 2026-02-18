import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  await prisma.attendance.deleteMany()
  await prisma.studentClass.deleteMany()
  await prisma.class.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@school.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  })

  // Create Teachers
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@school.com',
        password: await bcrypt.hash('teacher123', 10),
        role: 'TEACHER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@school.com',
        password: await bcrypt.hash('teacher123', 10),
        role: 'TEACHER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Michael Brown',
        email: 'michael.brown@school.com',
        password: await bcrypt.hash('teacher123', 10),
        role: 'TEACHER',
      },
    }),
  ])

  // Create Students
  const studentNames = [
    'Alice Anderson', 'Bob Baker', 'Charlie Clark', 'Diana Davis',
    'Ethan Evans', 'Fiona Foster', 'George Green', 'Hannah Harris',
    'Ian Irving', 'Julia Jones', 'Kevin King', 'Laura Lewis',
    'Mark Miller', 'Nancy Nelson', 'Oliver Owen', 'Patricia Parker',
    'Quinn Quinn', 'Rachel Roberts', 'Samuel Scott', 'Tina Turner'
  ]

  const students = await Promise.all(
    studentNames.map((name, index) =>
      prisma.user.create({
        data: {
          name,
          email: `${name.toLowerCase().replace(' ', '.')}@school.com`,
          password: bcrypt.hashSync('student123', 10),
          role: 'STUDENT',
        },
      })
    )
  )

  // Create Classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: 'Mathematics',
        section: 'A',
        teacherId: teachers[0].id,
      },
    }),
    prisma.class.create({
      data: {
        name: 'Science',
        section: 'B',
        teacherId: teachers[1].id,
      },
    }),
    prisma.class.create({
      data: {
        name: 'English',
        section: 'A',
        teacherId: teachers[2].id,
      },
    }),
    prisma.class.create({
      data: {
        name: 'History',
        section: 'B',
        teacherId: teachers[0].id,
      },
    }),
  ])

  // Assign students to classes
  const studentsPerClass = 5
  for (let i = 0; i < classes.length; i++) {
    const classStudents = students.slice(
      i * studentsPerClass,
      (i + 1) * studentsPerClass
    )
    await Promise.all(
      classStudents.map((student) =>
        prisma.studentClass.create({
          data: {
            studentId: student.id,
            classId: classes[i].id,
          },
        })
      )
    )
  }

  // Create attendance records for the last 30 days
  const today = new Date()
  const statuses = ['PRESENT', 'ABSENT', 'LATE'] as const

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() - dayOffset)
    date.setHours(0, 0, 0, 0)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    for (const cls of classes) {
      const classStudents = await prisma.studentClass.findMany({
        where: { classId: cls.id },
      })

      for (const studentClass of classStudents) {
        // 80% present, 5% late, 15% absent
        const rand = Math.random()
        let status: typeof statuses[number]
        if (rand < 0.8) status = 'PRESENT'
        else if (rand < 0.85) status = 'LATE'
        else status = 'ABSENT'

        await prisma.attendance.create({
          data: {
            studentId: studentClass.studentId,
            classId: cls.id,
            date,
            status,
            markedById: cls.teacherId,
          },
        })
      }
    }
  }

  console.log('Seed completed successfully!')
  console.log(`Created:
    - 1 Admin
    - ${teachers.length} Teachers
    - ${students.length} Students
    - ${classes.length} Classes
    - Attendance records for the last 30 days
    
  Login credentials:
    Admin: admin@school.com / admin123
    Teacher: john.smith@school.com / teacher123
    Student: alice.anderson@school.com / student123
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
