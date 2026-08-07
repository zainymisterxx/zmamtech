import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-slate-800 dark:text-slate-100"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full rounded-xl border border-slate-300 dark:border-slate-600
          bg-white dark:bg-[#0D1117]
          px-5 py-3.5
          text-slate-900 dark:text-white
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          transition-all duration-300
          focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none
          hover:border-brand-gold/50 dark:hover:border-brand-gold/50
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
        className="text-sm font-semibold text-slate-800 dark:text-slate-100"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`
          w-full rounded-xl border border-slate-300 dark:border-slate-600
          bg-white dark:bg-[#0D1117]
          px-5 py-3.5
          text-slate-900 dark:text-white
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          transition-all duration-300 resize-none
          focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none
          hover:border-brand-gold/50 dark:hover:border-brand-gold/50
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
