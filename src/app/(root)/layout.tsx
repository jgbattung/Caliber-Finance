
import type { Metadata } from "next";
import "./../globals.css";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";

export const metadata: Metadata = {
  title: "Caliber",
  description: "Finance Tracker made with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
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
    </>
  )
}