import type { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "article" | "main"
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  )
}
