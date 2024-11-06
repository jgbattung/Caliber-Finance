import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: 'Caliber Finance',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }: {  children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center h-dvh">
      {children}
    </main>
  )
}
