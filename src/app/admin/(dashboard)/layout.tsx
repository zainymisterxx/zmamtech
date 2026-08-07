import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}