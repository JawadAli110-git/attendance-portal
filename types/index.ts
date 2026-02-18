export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
}

export interface Class {
  id: string
  name: string
  section: string
  teacherId: string
  teacher?: User
}

export interface AttendanceRecord {
  id: string
  studentId: string
  classId: string
  date: Date
  status: 'PRESENT' | 'ABSENT' | 'LATE'
  markedById: string
  student?: User
  class?: Class
  markedBy?: User
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  todayAttendanceRate: number
}

export interface AttendanceStats {
  totalDays: number
  present: number
  absent: number
  late: number
  percentage: number
}
