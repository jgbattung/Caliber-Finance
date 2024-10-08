
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/Header/Header";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider";
import BottomNav from "@/components/BottomNav/BottomNav";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caliber",
  description: "Finance Tracker made with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} bg-darkest text-primary`}>
          <ThemeProvider>
            <Header />
            <main className="flex flex-row">
              <LeftSidebar />
              <section className="flex items-center justify-center w-full">
                <div>
                  {children}
                </div>
              </section>
              <RightSidebar />
            </main>
            <BottomNav />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  )
}