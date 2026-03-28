"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import {
  MOCK_NOTIFICATIONS,
  MockNotification,
  NotificationType,
} from "@/mock/Dashboard";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

/* colour per notification type */
const TYPE_STYLES: Record<NotificationType, string> = {
  team: "bg-blue-50 text-blue-500",
  feedback: "bg-purple-50 text-purple-500",
  task: "bg-amber-50 text-amber-500",
  system: "bg-gray-100 text-gray-500",
};

/* ── shared inner content ── */
interface PanelContentProps {
  notifications: MockNotification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onMarkOneRead: (id: number) => void;
  onClose: () => void;
  showCloseButton?: boolean;
}

const PanelContent = ({
  notifications,
  unreadCount,
  onMarkAllRead,
  onMarkOneRead,
  onClose,
  showCloseButton = false,
}: PanelContentProps) => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-2">
        <Bell size={16} className="text-primary" aria-hidden="true" />
        <span className="font-primary text-sm font-semibold text-content">
          Notifications
        </span>
        {unreadCount > 0 && (
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full
            bg-primary text-white font-primary text-[10px] font-bold leading-none"
          >
            {unreadCount}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1 font-primary text-xs text-primary
              hover:text-primary-dark transition-colors duration-150"
          >
            <CheckCheck size={13} aria-hidden="true" />
            <span>Mark all read</span>
          </button>
        )}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="w-7 h-7 flex items-center justify-center rounded-full
              text-content-muted hover:text-content hover:bg-gray-100
              transition-colors duration-150 ml-1"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>

    {/* List */}
    <ul className="overflow-y-auto divide-y divide-gray-50 flex-1">
      {notifications.map((notif) => (
        <li key={notif.id}>
          <button
            type="button"
            onClick={() => onMarkOneRead(notif.id)}
            className={`w-full text-left flex items-start gap-3 px-4 py-3
              transition-colors duration-150
              ${notif.read ? "bg-white hover:bg-gray-50" : "bg-primary/[0.03] hover:bg-primary/[0.06]"}`}
          >
            {/* emoji badge */}
            <span
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center
              justify-center text-base ${TYPE_STYLES[notif.type]}`}
              aria-hidden="true"
            >
              {notif.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`font-primary text-xs font-semibold leading-snug
                  ${notif.read ? "text-content" : "text-primary"}`}
                >
                  {notif.title}
                </p>
                {!notif.read && (
                  <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <p
                className="font-primary text-[11px] text-content-light
                leading-relaxed mt-0.5 line-clamp-2"
              >
                {notif.body}
              </p>
              <p className="font-primary text-[10px] text-content-muted mt-1">
                {notif.time}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>

    {/* Footer */}
    <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/60 flex-shrink-0">
      <button
        type="button"
        className="w-full font-primary text-xs text-primary font-medium
          hover:text-primary-dark transition-colors duration-150 text-center"
      >
        View all notifications
      </button>
    </div>
  </>
);

/* ─────────────────────────── main component */

const NotificationsDropdown = ({
  isOpen,
  onClose,
  anchorRef,
}: NotificationsDropdownProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] =
    useState<MockNotification[]>(MOCK_NOTIFICATIONS);
  const [sheetRendered, setSheetRendered] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  /* close on outside click — desktop only */
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

  /* Escape to close */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* body lock + sheet animation on mobile */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setSheetRendered(true)),
      );
    } else {
      document.body.style.overflow = "";
      setSheetRendered(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markOneRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  if (!isOpen) return null;

  const sharedProps = {
    notifications,
    unreadCount,
    onMarkAllRead: markAllRead,
    onMarkOneRead: markOneRead,
    onClose,
  };

  return (
    <>
      {/* ════ DESKTOP: absolute dropdown (md and up) ════ */}
      <div
        ref={panelRef}
        aria-label="Notifications"
        className="hidden md:flex flex-col absolute right-0 top-[calc(100%+8px)] z-50
          w-[340px] max-h-[480px] bg-white rounded-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.14)]
          border border-gray-100 overflow-hidden
          animate-dropdown-in"
      >
        <PanelContent {...sharedProps} />
      </div>

      {/* ════ MOBILE: full-screen bottom sheet (below md) ════ */}
      <div className="md:hidden fixed inset-0 z-50">
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px]
            transition-opacity duration-300
            ${sheetRendered ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        {/* sheet panel — slides up from bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0
            bg-white rounded-t-3xl flex flex-col
            shadow-[0_-8px_32px_rgba(0,0,0,0.14)]
            max-h-[80vh]
            transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${sheetRendered ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div
              className="w-10 h-1 rounded-full bg-gray-200"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col overflow-hidden flex-1">
            <PanelContent {...sharedProps} showCloseButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
