import { ExternalLink, PlayCircle } from "lucide-react";
import { Badge } from "./Badge";

interface LessonCardVideoProps {
  variant: "video";
  title: string;
  description: string;
  lessonLabel: string;
  timestamp: string;
}

interface LessonCardLessonProps {
  variant: "lesson";
  title: string;
  description: string;
  moduleLabel: string;
}

type LessonCardProps = LessonCardVideoProps | LessonCardLessonProps;

export function LessonCard(props: LessonCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <Badge variant={props.variant}>{props.variant}</Badge>
      <h3 className="font-sans text-[18px] font-semibold leading-[26px] text-neutral-900">
        {props.title}
      </h3>
      <p className="font-sans text-sm leading-5 text-neutral-500">
        {props.description}
      </p>
      {props.variant === "video" ? (
        <div className="flex items-center justify-between pt-1">
          <span className="font-sans text-xs text-neutral-500">
            {props.lessonLabel} &middot; {props.timestamp}
          </span>
          <button className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary-500 hover:text-primary-400">
            Watch from {props.timestamp}
            <PlayCircle size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1">
          <span className="font-sans text-xs text-neutral-500">
            {props.moduleLabel}
          </span>
          <button className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary-500 hover:text-primary-400">
            View lesson
            <ExternalLink size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
