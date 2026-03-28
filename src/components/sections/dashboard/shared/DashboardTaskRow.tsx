"use client";

interface DashboardTaskRowProps {
  title: string;
  /** Secondary line, e.g. "Due 20 Dec" or "Student name · Due 20 Dec" */
  meta?: string;
  done: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

/**
 * Shared task row (checkbox + title + meta) — main dashboard & team workspace.
 */
const DashboardTaskRow = ({
  title,
  meta,
  done,
  onToggle,
  disabled = false,
}: DashboardTaskRowProps) => {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={done ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2
          transition-all duration-150 disabled:opacity-50
          ${
            done
              ? "border-primary bg-primary"
              : "border-gray-300 hover:border-primary"
          }`}
      >
        {done && (
          <svg
            viewBox="0 0 10 8"
            className="h-2.5 w-2.5 fill-none stroke-2 stroke-white"
            aria-hidden="true"
          >
            <polyline points="1,4 3.5,6.5 9,1" />
          </svg>
        )}
      </button>
      <div className="min-w-0">
        <p
          className={`font-primary text-sm leading-snug ${
            done ? "text-content-muted line-through" : "text-content"
          }`}
        >
          {title}
        </p>
        {meta ? (
          <p className="mt-0.5 font-primary text-[11px] text-content-muted">
            {meta}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardTaskRow;
