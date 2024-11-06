import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper"
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caliber",
  description: "Finance Tracker made with Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-darkest text-primary`}>
        <SessionWrapper>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}