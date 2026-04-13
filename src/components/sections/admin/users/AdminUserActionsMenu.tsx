"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, MoreVertical, UserCheck, UserX } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminUserAction, AdminUserRecord } from "@/mock/AdminUsers";

interface AdminUserActionsMenuProps {
  user: AdminUserRecord;
  onAction: (action: AdminUserAction, user: AdminUserRecord) => void;
}

const AdminUserActionsMenu = ({ user, onAction }: AdminUserActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 176 });

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
      const width = 176;
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

  const actions = useMemo(() => {
    if (user.status === "Pending") {
      return [
        {
          action: "approve" as const,
          label: "Approve",
        },
        {
          action: "warn" as const,
          label: "Warn user",
          textClass: "text-amber-600",
        },
        {
          action: "reject" as const,
          label: "Reject",
          textClass: "text-rose-600",
        },
      ];
    }

    if (user.status === "Blocked") {
      return [
        {
          action: "enable" as const,
          label: "Enable",
          textClass: "text-emerald-600",
        },
      ];
    }

    return [
      {
        action: "disable" as const,
        label: "Disable",
        textClass: "text-rose-600",
      },
      {
        action: "warn" as const,
        label: "Warn user",
        textClass: "text-amber-600",
      },
    ];
  }, [user.status]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Actions for ${user.name}`}
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
                  key={item.action}
                  type="button"
                  className={`flex w-full items-center px-3 py-3 text-left font-primary text-xs transition-colors hover:bg-slate-50 ${item.textClass}`}
                  onClick={() => {
                    setOpen(false);
                    onAction(item.action, user);
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

export default AdminUserActionsMenu;
