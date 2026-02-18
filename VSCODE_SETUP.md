# 🚀 VS Code Setup Guide - Attendance Portal

This guide will help you set up the Attendance Portal project in Visual Studio Code for the best development experience.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18.0.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

4. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

## 🔧 Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/JawadAli110-git/attendance-portal.git

# Navigate to the project directory
cd attendance-portal
```

## 📂 Step 2: Open in VS Code

There are several ways to open the project in VS Code:

**Option 1: Using Command Line**
```bash
code .
```

**Option 2: Using VS Code**
1. Open VS Code
2. Click `File` → `Open Folder`
3. Navigate to the `attendance-portal` folder
4. Click `Select Folder`

## 🔌 Step 3: Install Recommended Extensions

When you first open the project, VS Code will prompt you to install recommended extensions. Click **"Install All"** or install them manually:

### Required Extensions:
1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Provides JavaScript/TypeScript linting
   
2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatter for consistent styling

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Intelligent Tailwind CSS class suggestions

4. **Prisma** (`prisma.prisma`)
   - Syntax highlighting and formatting for Prisma schema

5. **TypeScript** (`ms-vscode.vscode-typescript-next`)
   - Enhanced TypeScript support

### Recommended Extensions:
6. **GitLens** (`eamodio.gitlens`)
   - Supercharge your Git capabilities
   
7. **Error Lens** (`usernamehw.errorlens`)
   - Highlight errors inline
   
8. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - Autocomplete file paths
   
9. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Automatically rename paired HTML/JSX tags
   
10. **ES7+ React/Redux Snippets** (`dsznajder.es7-react-js-snippets`)
    - Code snippets for React development

### Manual Installation:
If the prompt doesn't appear:
1. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
2. Search for each extension by name
3. Click **Install**

## 📦 Step 4: Install Project Dependencies

Open the integrated terminal in VS Code (`Ctrl+`` or `View` → `Terminal`):

```bash
# Install all dependencies
npm install
```

This will install all required packages including:
- Next.js
- React
- TypeScript
- Prisma
- Tailwind CSS
- NextAuth.js
- And more...

## 🗄️ Step 5: Set Up the Database

### 5.1 Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` file (it should contain):
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

**Note:** The default values work fine for local development.

### 5.2 Run Database Migrations

```bash
# Create and apply database migrations
npx prisma migrate dev --name init
```

This creates the SQLite database and tables based on the Prisma schema.

### 5.3 Seed the Database

```bash
# Populate the database with sample data
npx prisma db seed
```

This creates:
- 1 Admin user
- 3 Teacher users
- 20 Student users
- 4 Classes
- 30 days of attendance records

## 🚀 Step 6: Start the Development Server

### Using VS Code Tasks:

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Tasks: Run Task"
3. Select "dev"

### Using Terminal:

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

## 🔐 Step 7: Login to the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

Use these default credentials:

**Admin Account:**
- Email: `admin@school.com`
- Password: `admin123`

**Teacher Account:**
- Email: `john.smith@school.com`
- Password: `teacher123`

**Student Account:**
- Email: `alice.anderson@school.com`
- Password: `student123`

## 🛠️ VS Code Features Configured

### Automatic Code Formatting

The project is configured to format code on save:
- **Prettier** handles formatting
- **ESLint** fixes code issues automatically
- Works for TypeScript, JavaScript, CSS, and more

### IntelliSense

You'll get intelligent code completion for:
- TypeScript types
- React components
- Tailwind CSS classes
- Prisma schema
- Import paths

### Debugging

Press `F5` or go to `Run and Debug` panel to use:

1. **Next.js: debug server-side**
   - Debug API routes and server components

2. **Next.js: debug client-side**
   - Debug React components in Chrome

3. **Next.js: debug full stack**
   - Debug both server and client simultaneously

### Tasks

Access common tasks via `Terminal` → `Run Task...`:

- **dev**: Start development server
- **build**: Build for production
- **lint**: Run ESLint
- **prisma:studio**: Open Prisma Studio (database GUI)
- **prisma:migrate**: Run database migrations
- **prisma:seed**: Seed database with sample data

## 📁 Project Structure Overview

```
attendance-portal/
├── .vscode/              # VS Code configuration
│   ├── settings.json     # Editor settings
│   ├── extensions.json   # Recommended extensions
│   ├── launch.json       # Debug configurations
│   └── tasks.json        # Task definitions
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   ├── attendance/      # Attendance pages
│   └── ...
├── components/          # React components
├── lib/                 # Utility functions
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Prisma client
│   └── utils.ts        # Helper functions
├── prisma/             # Database
│   ├── schema.prisma   # Database schema
│   ├── migrations/     # Migration files
│   └── seed.ts         # Seed script
├── types/              # TypeScript types
├── .env                # Environment variables
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## 🎯 Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma studio           # Open Prisma Studio GUI
npx prisma migrate dev      # Create and apply migration
npx prisma db seed          # Seed database
npx prisma generate         # Generate Prisma Client
```

### Git
```bash
git status              # Check status
git add .               # Stage changes
git commit -m "message" # Commit changes
git push                # Push to remote
```

## 🐛 Troubleshooting

### Issue: Extensions not working
**Solution:** Reload VS Code window
- Press `Ctrl+Shift+P` → "Developer: Reload Window"

### Issue: TypeScript errors
**Solution:** Make sure VS Code is using workspace TypeScript
- Click on TypeScript version in status bar
- Select "Use Workspace Version"

### Issue: Tailwind classes not autocompleting
**Solution:** Ensure Tailwind CSS IntelliSense extension is installed and enabled

### Issue: Database errors
**Solution:** Reset the database
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

### Issue: Port 3000 already in use
**Solution:** Kill the process or use a different port
```bash
# Find and kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Issue: npm install fails
**Solution:** Clear npm cache and retry
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 💡 Pro Tips

1. **Use Keyboard Shortcuts:**
   - `Ctrl+P`: Quick file search
   - `Ctrl+Shift+P`: Command palette
   - `Ctrl+B`: Toggle sidebar
   - `Ctrl+J`: Toggle terminal
   - `Ctrl+Shift+F`: Global search

2. **Split Editor:**
   - `Ctrl+\`: Split editor
   - Navigate between editors with `Ctrl+1`, `Ctrl+2`, etc.

3. **Multiple Cursors:**
   - `Alt+Click`: Add cursor
   - `Ctrl+Alt+Up/Down`: Add cursor above/below
   - `Ctrl+D`: Select next occurrence

4. **Integrated Terminal:**
   - Open multiple terminals for different tasks
   - Terminal 1: Development server (`npm run dev`)
   - Terminal 2: Git commands
   - Terminal 3: Database operations

5. **Git Integration:**
   - Use the Source Control panel (Ctrl+Shift+G)
   - View changes, stage files, and commit directly from VS Code

6. **Prisma Studio:**
   - Run `npx prisma studio` to view and edit database data
   - Opens at [http://localhost:5555](http://localhost:5555)

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

## 🆘 Getting Help

If you encounter issues:

1. Check the [main README.md](./README.md) for project documentation
2. Review error messages in the terminal
3. Check VS Code's Output panel (`View` → `Output`)
4. Open an issue on [GitHub](https://github.com/JawadAli110-git/attendance-portal/issues)

---

**Happy Coding! 🎉**
