import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import LoadingAnim from './components/LoadingAnim'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const viewport: Viewport = {
  themeColor: '#0E1017',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingAnim/>}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="w-[393px] h-[852px] relative mobile-body rounded-[40px]">
          {children}
          </div>
          </main>
        </Suspense>
        </body>
    </html>
  )
}