"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminReportRecord } from "@/mock/AdminReports";

interface ReportsActionsMenuProps {
  report: AdminReportRecord;
  onMarkResolved: (report: AdminReportRecord) => void;
  onMarkInReview: (report: AdminReportRecord) => void;
  onReject: (report: AdminReportRecord) => void;
}

const ReportsActionsMenu = ({
  report,
  onMarkResolved,
  onMarkInReview,
  onReject,
}: ReportsActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 200 });

  useEffect(() => {
    if (!open) return;

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const trigger = rootRef.current?.querySelector("button");
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const width = 200;
      const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
      setMenuPosition({ top: rect.bottom + 8, left, width });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const actions = useMemo(
    () => [
      { label: "Mark as Resolved", className: "", action: () => onMarkResolved(report) },
      { label: "Mark as In Review", className: "", action: () => onMarkInReview(report) },
      { label: "Reject Report", className: "text-rose-600", action: () => onReject(report) },
    ],
    [onMarkInReview, onMarkResolved, onReject, report],
  );

  return (
    <div ref={rootRef} className="relative shrink-0" onClick={(event) => event.stopPropagation()}>
      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Actions for ${report.reportTitle}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full text-content-light hover:bg-slate-100"
      >
        <MoreVertical className="h-4 w-4" />
      </IconButton>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-50 overflow-hidden border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.12)]"
              style={{ top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }}
            >
              {actions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`flex w-full items-center px-3 py-3 text-left font-primary text-xs transition-colors hover:bg-slate-50 ${item.className}`}
                  onClick={() => {
                    setOpen(false);
                    item.action();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default ReportsActionsMenu;