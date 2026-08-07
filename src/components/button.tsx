import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer"

  const variants = {
    primary:
      "bg-brand-gold text-white hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]",
    secondary:
      "bg-text-primary text-white hover:bg-text-secondary hover:shadow-hover active:scale-[0.97]",
    outline:
      "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white active:scale-[0.97]",
  }

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
