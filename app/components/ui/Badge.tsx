type BadgeVariant = "video" | "lesson" | "popular";

const variantClasses: Record<BadgeVariant, string> = {
  video: "bg-primary-500 text-white",
  lesson: "bg-neutral-700 text-white",
  popular: "bg-primary-100 text-primary-500",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-xs px-2 py-0.5 font-sans text-xs font-medium uppercase tracking-wide ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
