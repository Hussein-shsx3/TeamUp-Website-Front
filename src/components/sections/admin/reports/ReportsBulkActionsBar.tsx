"use client";

interface ReportsBulkActionsBarProps {
  selectedCount: number;
  onReject: () => void;
}

const ReportsBulkActionsBar = ({ selectedCount, onReject }: ReportsBulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="w-full rounded-2xl border border-primary/35 bg-primary/5 px-8 py-4 shadow-[0_8px_24px_rgba(37,99,235,0.08)] sm:rounded-full sm:py-3 md:w-[70%]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-full items-center justify-center gap-2 px-3 py-2 text-sm text-primary sm:w-auto sm:justify-start sm:py-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
            {selectedCount}
          </span>
          report{selectedCount > 1 ? "s" : ""} selected
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
          <button
            type="button"
            onClick={onReject}
            className="w-full rounded-full border border-rose-200 bg-white px-4 py-2 font-primary text-sm font-medium text-rose-500 transition-colors hover:border-rose-300 hover:text-rose-600 sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsBulkActionsBar;