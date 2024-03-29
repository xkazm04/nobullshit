import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from './lib/providers/QueryProvider'
import BottomNav from './components/BottomNav'
import AuthContext from './lib/providers/AuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const viewport: Viewport = {
  themeColor: '#0E1017',
}

// 768 x 1024 - Google = md

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <main className="flex  flex-col items-center justify-between p-24">
            <div className="relative mobile-body rounded-[40px] w-full h-full
             min-h-[768px] max-w-[1500px] md:max-w-[1000px] md:min-h-[850px] ">
              <AuthContext>
                <QueryProvider>
                  {children}
                  <div className='absolute bottom-0 w-full'><BottomNav/></div>
                </QueryProvider>
              </AuthContext>
            </div>
            </main>        
        </body>
    </html>
  )
}
