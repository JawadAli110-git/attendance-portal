# 📚 Attendance Portal

A modern, full-stack attendance management system built with Next.js 14, TypeScript, Prisma, and Tailwind CSS. This application provides a complete solution for schools and educational institutions to manage student attendance efficiently.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login system with NextAuth.js
- Three user roles: **Admin**, **Teacher**, and **Student**
- Role-based access control (RBAC)
- Password hashing with bcryptjs

### 👤 User Roles

#### Admin
- Full system access
- Manage users (Create, Read, Update, Delete)
- Manage classes and assignments
- View comprehensive reports and analytics
- Monitor overall attendance statistics

#### Teacher
- Mark attendance for assigned classes
- View class rosters and student lists
- Generate class-specific reports
- Update attendance records

#### Student
- View personal attendance history
- Check attendance percentage and statistics
- Access individual attendance records

### 📊 Dashboard
- **Admin Dashboard**: Overview of total students, teachers, classes, and today's attendance rate
- **Teacher Dashboard**: Assigned classes, quick attendance marking, class statistics
- **Student Dashboard**: Personal attendance percentage, history, and detailed statistics
- Real-time statistics and visualizations
- Attendance trends and insights

### 📋 Attendance Management
- Mark attendance with **Present**, **Absent**, or **Late** status
- Bulk actions (Mark all as present/absent)
- Edit previously marked attendance
- Date-based attendance tracking
- Class-wise attendance management

### 📈 Reports & Analytics
- Generate attendance reports by date range
- Filter by class, section, or individual student
- Summary statistics (present %, absent %, late %)
- Export to CSV for further analysis
- Visual representation of attendance data

### 👥 User Management (Admin Only)
- Create and manage user accounts
- Assign roles (Admin/Teacher/Student)
- Search and filter users by role
- View user details and creation dates

### 📱 Responsive Design
- Fully responsive layout for desktop, tablet, and mobile
- Collapsible sidebar navigation
- Touch-friendly UI elements
- Mobile-optimized attendance marking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Password Hashing**: bcryptjs
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/JawadAli110-git/attendance-portal.git
   cd attendance-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` if needed:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-this-in-production
   ```

4. **Set up the database**
   ```bash
   # Run Prisma migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma Client
   npx prisma generate
   
   # Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Default Login Credentials

After seeding the database, you can log in with these accounts:

### Admin Account
- **Email**: admin@school.com
- **Password**: admin123

### Teacher Accounts
- **Email**: john.smith@school.com
- **Password**: teacher123

- **Email**: sarah.johnson@school.com
- **Password**: teacher123

- **Email**: michael.brown@school.com
- **Password**: teacher123

### Student Account (Example)
- **Email**: alice.anderson@school.com
- **Password**: student123

## 📁 Project Structure

```
attendance-portal/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth authentication
│   │   ├── attendance/        # Attendance CRUD operations
│   │   ├── classes/           # Class management
│   │   ├── dashboard/         # Dashboard data
│   │   └── users/             # User management
│   ├── attendance/            # Attendance pages
│   │   ├── history/          # View attendance history
│   │   └── mark/             # Mark attendance
│   ├── classes/              # Classes management
│   ├── dashboard/            # Dashboard page
│   ├── login/                # Login page
│   ├── reports/              # Reports and analytics
│   ├── users/                # User management (Admin)
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (redirects to login)
│   └── globals.css           # Global styles
├── components/
│   ├── providers.tsx         # Session provider wrapper
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client singleton
│   └── utils.ts              # Utility functions
├── prisma/
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed script
├── types/
│   ├── index.ts              # TypeScript type definitions
│   └── next-auth.d.ts        # NextAuth type extensions
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🗃️ Database Schema

### User
- id, name, email, password, role, createdAt, updatedAt
- Roles: ADMIN, TEACHER, STUDENT

### Class
- id, name, section, teacherId, createdAt
- Relations: teacher (User), students (many-to-many)

### StudentClass (Junction Table)
- id, studentId, classId
- Manages many-to-many relationship between students and classes

### Attendance
- id, studentId, classId, date, status, markedById, createdAt
- Status: PRESENT, ABSENT, LATE
- Tracks who marked the attendance (markedBy)

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db seed` - Seed database with sample data
- `npx prisma migrate dev` - Create and apply migrations

## 🔒 Security Features

- Password hashing with bcryptjs (10 rounds)
- Secure session-based authentication with NextAuth.js
- Role-based access control on all routes
- Server-side session validation
- Protected API routes
- SQL injection protection via Prisma ORM

## 🎨 UI/UX Features

- Clean, modern design with professional color scheme
- Sidebar navigation with icons and labels
- Smooth transitions and animations
- Loading states for data fetching
- Empty states with helpful messages
- Consistent spacing and typography
- Color-coded status indicators
- Responsive tables and cards

## 📊 Sample Data

The seed script creates:
- 1 Admin user
- 3 Teacher users
- 20 Student users
- 4 Classes (Mathematics, Science, English, History)
- 30 days of randomized attendance data
- Students assigned to classes
- Realistic attendance patterns (80% present, 5% late, 15% absent)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues & Future Enhancements

### Future Enhancements
- Dark mode toggle
- Email notifications for low attendance
- Calendar view for attendance
- Attendance reports with charts (Chart.js integration)
- Bulk user import via CSV
- Parent/Guardian accounts
- Mobile app version
- Advanced analytics and insights

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- NextAuth.js for authentication solution

---

**Built with ❤️ using Next.js 14, TypeScript, and Prisma**
