import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export function Select({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <select
        className="h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white pl-4 pr-10 font-sans text-sm text-neutral-900 outline-none focus:border-primary-400"
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />
    </div>
  );
}
