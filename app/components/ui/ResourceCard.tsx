import { FileText } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
}

export function ResourceCard({
  title,
  description,
  fileType,
  fileSize,
}: ResourceCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <FileText size={20} className="mt-0.5 shrink-0 text-neutral-500" />
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-[18px] font-semibold leading-[26px] text-neutral-900">
          {title}
        </h3>
        <p className="font-sans text-sm leading-5 text-neutral-500">
          {description}
        </p>
        <span className="font-sans text-xs text-neutral-500">
          {fileType} &middot; {fileSize}
        </span>
      </div>
    </div>
  );
}
