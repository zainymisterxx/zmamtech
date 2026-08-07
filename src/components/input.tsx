import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full rounded-xl border border-base-border bg-white px-5 py-3.5
          text-text-primary placeholder:text-text-light
          transition-all duration-300
          focus:border-brand-gold focus:ring-2 focus:ring-brand-goldLight focus:outline-none
          hover:border-brand-gold/40
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`
          w-full rounded-xl border border-base-border bg-white px-5 py-3.5
          text-text-primary placeholder:text-text-light
          transition-all duration-300 resize-none
          focus:border-brand-gold focus:ring-2 focus:ring-brand-goldLight focus:outline-none
          hover:border-brand-gold/40
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
