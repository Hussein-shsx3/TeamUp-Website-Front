"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminTeamReportRecord } from "@/mock/AdminTeams";

interface TeamsActionsMenuProps {
  team: AdminTeamReportRecord;
  onReject: (team: AdminTeamReportRecord) => void;
}

const TeamsActionsMenu = ({ team, onReject }: TeamsActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 160 });

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
      const width = 160;
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

  return (
    <div ref={rootRef} className="relative shrink-0" onClick={(event) => event.stopPropagation()}>
      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Actions for ${team.reportTitle}`}
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
              <button
                type="button"
                className="flex w-full items-center px-3 py-3 text-left font-primary text-xs text-rose-600 transition-colors hover:bg-slate-50"
                onClick={() => {
                  setOpen(false);
                  onReject(team);
                }}
              >
                Reject
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default TeamsActionsMenu;