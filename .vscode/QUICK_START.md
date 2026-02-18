# Quick Reference - VS Code Setup

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Clone & Open
git clone https://github.com/JawadAli110-git/attendance-portal.git
cd attendance-portal
code .

# 2. Install Extensions
# Click "Install All" when prompted in VS Code

# 3. Install Dependencies & Setup Database
npm install
npx prisma migrate dev --name init
npx prisma db seed

# 4. Start Development
npm run dev

# 5. Open Browser
# Navigate to http://localhost:3000
# Login: admin@school.com / admin123
```

## 🔌 Essential Extensions

Install these from VS Code Extensions marketplace (Ctrl+Shift+X):

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - CSS autocomplete
4. **Prisma** - Database schema support
5. **TypeScript** - Enhanced TS support

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open | `Ctrl+P` | `Cmd+P` |
| Toggle Terminal | `Ctrl+`` | `Cmd+`` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |
| Search Files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Start Debugging | `F5` | `F5` |
| Run Task | `Ctrl+Shift+B` | `Cmd+Shift+B` |

## 🛠️ Tasks (Ctrl+Shift+P → "Run Task")

- **dev** - Start development server
- **build** - Build for production
- **lint** - Run ESLint
- **prisma:studio** - Open database GUI
- **prisma:migrate** - Run migrations
- **prisma:seed** - Seed database

## 🐛 Debug Configurations (F5)

1. **Next.js: debug server-side** - API routes
2. **Next.js: debug client-side** - React components
3. **Next.js: debug full stack** - Both together

## 📝 Common npm Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run linter
```

## 🗄️ Database Commands

```bash
npx prisma studio          # Visual database editor
npx prisma migrate dev     # Create migration
npx prisma db seed         # Seed sample data
npx prisma generate        # Generate client
```

## 🔐 Login Credentials

- **Admin**: admin@school.com / admin123
- **Teacher**: john.smith@school.com / teacher123
- **Student**: alice.anderson@school.com / student123

## 🆘 Troubleshooting

**TypeScript errors?**
```bash
# Use workspace TypeScript version
# Click TS version in status bar → "Use Workspace Version"
```

**Database issues?**
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

**Port 3000 in use?**
```bash
npx kill-port 3000
# Or: PORT=3001 npm run dev
```

**Extensions not working?**
```bash
# Reload VS Code: Ctrl+Shift+P → "Reload Window"
```

---

📖 **Full Guide**: See [VSCODE_SETUP.md](./VSCODE_SETUP.md) for detailed instructions
