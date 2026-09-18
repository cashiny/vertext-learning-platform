import { CheckCircle2, Clock, Lock, PlayCircle } from "lucide-react";

type Status = "in-progress" | "completed" | "now-playing" | "locked";

const statusConfig: Record<
  Status,
  { label: string; icon: typeof Clock; className: string }
> = {
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "text-primary-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-green-600",
  },
  "now-playing": {
    label: "Now Playing",
    icon: PlayCircle,
    className: "text-primary-500",
  },
  locked: {
    label: "Locked",
    icon: Lock,
    className: "text-neutral-500",
  },
};

export function StatusIndicator({ status }: { status: Status }) {
  const { label, icon: Icon, className } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans text-sm ${className}`}
    >
      <Icon size={16} />
      {label}
    </span>
  );
}
