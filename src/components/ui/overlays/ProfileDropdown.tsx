"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, ClipboardList, Settings, LogOut, MessageSquareWarning } from "lucide-react";
import { MOCK_USER } from "@/mock/Dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { getAvatarSrc, getDisplayRole, getFullName } from "@/lib/user";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  /** anchor element — dropdown aligns to its right edge */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** Opens the logout confirmation modal (handled by parent, e.g. DashboardHeader). */
  onLogoutRequest?: () => void;
  onReportIssueRequest?: () => void;
  isMentor?: boolean;
  onSupervisionRequestsRequest?: () => void;
}

const ProfileDropdown = ({
  isOpen,
  onClose,
  anchorRef,
  onLogoutRequest,
  onReportIssueRequest,
  isMentor = false,
  onSupervisionRequestsRequest,
}: ProfileDropdownProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { data: currentUser } = useCurrentUser();

  const displayUser = currentUser?.user ?? null;
  const displayName = displayUser
    ? getFullName(displayUser.firstName, displayUser.lastName) || displayUser.username
    : MOCK_USER.name;
  const displayRole = displayUser
    ? getDisplayRole(displayUser.role)
    : MOCK_USER.role;
  const displayAvatar = getAvatarSrc(displayUser?.profilePictureUrl);

  /* ── close on outside click ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose, anchorRef]);

  /* ── close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      aria-label="Profile menu"
      className={`absolute right-0 top-[calc(100%+8px)] z-50
        w-52 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)]
        border border-gray-100 overflow-hidden
        animate-dropdown-in`}
    >
      {/* user row at top — mirrors the header pill */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-primary/5">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
          <Image
            src={displayAvatar}
            alt={displayName}
            fill
            unoptimized
            className="object-cover object-[50%_20%]"
          />
        </div>
        <div className="min-w-0">
          <p className="font-primary text-sm font-semibold text-content truncate">
            {displayName}
          </p>
          <p className="font-primary text-xs text-content-light truncate">
            {displayRole}
          </p>
        </div>
      </div>

      {/* nav items — plain nav, no ARIA menu roles needed */}
      <nav aria-label="User account navigation">
        <Link
          href="/dashboard/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 font-primary text-sm
            text-content hover:bg-primary-light hover:text-primary
            transition-colors duration-150"
        >
          <User size={16} aria-hidden="true" className="flex-shrink-0" />
          <span>{displayName}</span>
        </Link>

        {isMentor ? (
          <button
            type="button"
            onClick={() => {
              onClose();
              onSupervisionRequestsRequest?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 font-primary text-sm
              text-content hover:bg-primary-light hover:text-primary
              transition-colors duration-150"
          >
            <ClipboardList size={16} aria-hidden="true" className="flex-shrink-0" />
            <span>Supervision requests</span>
          </button>
        ) : (
          <Link
            href="/dashboard/activity/saved"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 font-primary text-sm
              text-content hover:bg-primary-light hover:text-primary
              transition-colors duration-150"
          >
            <ClipboardList size={16} aria-hidden="true" className="flex-shrink-0" />
            <span>My Activity</span>
          </Link>
        )}

        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 font-primary text-sm
            text-content hover:bg-primary-light hover:text-primary
            transition-colors duration-150"
        >
          <Settings size={16} aria-hidden="true" className="flex-shrink-0" />
          <span>Settings</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose();
            onReportIssueRequest?.();
          }}
          className="flex w-full items-center gap-3 px-4 py-2.5 font-primary text-sm
            text-content hover:bg-primary-light hover:text-primary
            transition-colors duration-150"
        >
          <MessageSquareWarning size={16} aria-hidden="true" className="flex-shrink-0" />
          <span>Report an Issue</span>
        </button>

        <div className="border-t border-gray-100 mt-1 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogoutRequest?.();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 font-primary text-sm
              text-error transition-colors duration-150 hover:bg-error/10"
          >
            <LogOut size={16} aria-hidden="true" className="flex-shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileDropdown;
