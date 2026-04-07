"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";

export interface MemberOverflowMenuProps {
  memberId: number;
  memberName: string;
  profileHref?: string;
  onDelete: () => void;
}

const MemberOverflowMenu = ({
  memberId,
  memberName,
  profileHref = `/dashboard/users/${memberId}`,
  onDelete,
}: MemberOverflowMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Actions for ${memberName}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <MoreVertical className="text-content-light" />
      </IconButton>
      {open ? (
        <div
          className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
          role="menu"
        >
          <Link
            href={profileHref}
            className="flex items-center gap-2 px-3 py-2 font-primary text-xs text-content hover:bg-gray-50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <Eye className="h-3.5 w-3.5 text-content-light" />
            Profile
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 font-primary text-xs text-error hover:bg-error/5"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default MemberOverflowMenu;
