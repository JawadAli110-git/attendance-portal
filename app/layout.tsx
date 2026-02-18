import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: 'Attendance Portal',
  description: 'School Attendance Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
