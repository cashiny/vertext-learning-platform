import { BarChart2, Clock, Layers } from "lucide-react";

interface CourseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: number;
  iconBgClassName?: string;
}

export function CourseCard({
  icon,
  title,
  description,
  level,
  duration,
  moduleCount,
  iconBgClassName = "bg-neutral-900 text-white",
}: CourseCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${iconBgClassName}`}
        >
          {icon}
        </div>
        <h3 className="font-sans text-[18px] font-semibold leading-[26px] text-neutral-900">
          {title}
        </h3>
      </div>
      <p className="font-sans text-sm leading-5 text-neutral-500">
        {description}
      </p>
      <div className="flex items-center gap-4 font-sans text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <BarChart2 size={14} />
          {level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Layers size={14} />
          {moduleCount} modules
        </span>
      </div>
    </div>
  );
}
