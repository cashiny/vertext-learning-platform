import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-primary-200",
  secondary:
    "border border-primary-500 text-primary-500 hover:bg-primary-100 disabled:border-neutral-200 disabled:text-neutral-300",
  tertiary:
    "border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:text-neutral-300",
  text: "text-primary-500 hover:text-primary-400 disabled:text-neutral-300",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isTextOnly = variant === "text";

  return (
    <button
      disabled={disabled}
      className={`inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-colors disabled:cursor-not-allowed ${
        isTextOnly ? "px-0" : "rounded-md px-4"
      } ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </button>
  );
}
