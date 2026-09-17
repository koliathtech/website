import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  let base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition";
  let variants: Record<string, string> = {
    default: "bg-primary text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-400 bg-transparent",
  }
  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`} {...props} />
  )
}