import * as React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
}

export function Select({ value, onValueChange, children, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={e => onValueChange(e.target.value)}
      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-primary focus:ring-primary focus:outline-none transition"
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  )
}

export function SelectValue({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) {
  return (
    <span className="text-gray-700">{children || placeholder}</span>
  )
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string
  children: React.ReactNode
}
export function SelectItem({ value, children, ...props }: SelectItemProps) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}