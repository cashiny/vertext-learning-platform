import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcutHint?: string;
}

export function SearchInput({
  shortcutHint = "⌘K",
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 focus-within:border-primary-400 ${className}`}
    >
      <Search size={18} className="shrink-0 text-neutral-500" />
      <input
        type="text"
        className="h-full flex-1 border-0 bg-transparent font-sans text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
        {...props}
      />
      {shortcutHint ? (
        <span className="shrink-0 rounded-xs border border-neutral-200 px-1.5 py-0.5 font-sans text-xs text-neutral-500">
          {shortcutHint}
        </span>
      ) : null}
    </div>
  );
}

export function TextInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={`h-11 rounded-md border border-neutral-200 bg-white px-4 font-sans text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-primary-400 ${className}`}
      {...props}
    />
  );
}
