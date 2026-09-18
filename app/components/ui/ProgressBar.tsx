interface ProgressBarProps {
  percent: number;
  showLabel?: boolean;
}

export function ProgressBar({ percent, showLabel = true }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-full flex-1 rounded-xl bg-neutral-200">
        <div
          className="h-full rounded-xl bg-primary-500"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel ? (
        <span className="shrink-0 font-sans text-sm text-neutral-500">
          {clamped}% complete
        </span>
      ) : null}
    </div>
  );
}
