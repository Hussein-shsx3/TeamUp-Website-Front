"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, X } from "lucide-react";
import { useNotifications } from "@/hooks/useNotification";
import type { NotificationResponse } from "@/types/notification";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const TYPE_STYLES: Record<NotificationResponse["type"], string> = {
  JOIN_REQUEST_RECEIVED: "bg-blue-50 text-blue-500",
  JOIN_REQUEST_ACCEPTED: "bg-blue-50 text-blue-500",
  JOIN_REQUEST_REJECTED: "bg-blue-50 text-blue-500",
  TASK_ASSIGNED: "bg-amber-50 text-amber-500",
  TASK_COMPLETED: "bg-amber-50 text-amber-500",
  MILESTONE_STATUS_CHANGED: "bg-purple-50 text-purple-500",
  MEETING_REMINDER: "bg-sky-50 text-sky-500",
  MESSAGE_RECEIVED: "bg-sky-50 text-sky-500",
  PROJECT_APPROVED: "bg-green-50 text-green-500",
  PROJECT_REJECTED: "bg-red-50 text-red-500",
  MENTOR_INVITATION_SENT: "bg-violet-50 text-violet-500",
  MENTOR_INVITATION_ACCEPTED: "bg-violet-50 text-violet-500",
  MENTOR_INVITATION_REJECTED: "bg-violet-50 text-violet-500",
};

interface PanelContentProps {
  notifications: NotificationResponse[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onMarkOneRead: (id: string) => void;
  onDeleteOne: (id: string) => void;
  onClose: () => void;
  showCloseButton?: boolean;
}

const PanelContent = ({
  notifications,
  unreadCount,
  onMarkAllRead,
  onMarkOneRead,
  onDeleteOne,
  onClose,
  showCloseButton = false,
}: PanelContentProps) => (
  <>
    <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
      <div className="flex items-center gap-2">
        <Bell size={16} className="text-primary" aria-hidden="true" />
        <span className="font-primary text-sm font-semibold text-content">
          Notifications
        </span>
        {unreadCount > 0 && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white font-primary">
            {unreadCount}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1 font-primary text-xs text-primary transition-colors duration-150 hover:text-primary-dark"
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
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-content-muted transition-colors duration-150 hover:bg-gray-100 hover:text-content"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>

    <ul className="flex-1 divide-y divide-gray-50 overflow-y-auto">
      {notifications.length === 0 ? (
        <li className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center">
          <Bell size={28} className="text-content-muted" aria-hidden="true" />
          <p className="font-primary text-sm font-semibold text-content">
            No notifications yet.
          </p>
          <p className="font-primary text-xs text-content-light">
            New updates will appear here.
          </p>
        </li>
      ) : (
        notifications.map((notification) => (
          <li key={notification.id}>
            <div
              className={`flex items-start gap-3 px-4 py-3 transition-colors duration-150 ${notification.isRead ? "bg-white hover:bg-gray-50" : "bg-primary/[0.03] hover:bg-primary/[0.06]"}`}
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base ${TYPE_STYLES[notification.type]}`}
                aria-hidden="true"
              >
                •
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`font-primary text-xs font-semibold leading-snug ${notification.isRead ? "text-content" : "text-primary"}`}
                  >
                    {notification.title}
                  </p>
                  {!notification.isRead && (
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-0.5 line-clamp-2 font-primary text-[11px] leading-relaxed text-content-light">
                  {notification.content}
                </p>
                <p className="mt-1 font-primary text-[10px] text-content-muted">
                  {new Intl.DateTimeFormat("en", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(new Date(notification.createdAt))}
                </p>
                <div className="mt-2 flex gap-3">
                  {!notification.isRead ? (
                    <button
                      type="button"
                      onClick={() => onMarkOneRead(notification.id)}
                      className="font-primary text-[11px] text-primary transition-colors hover:text-primary-dark"
                    >
                      Mark read
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => onDeleteOne(notification.id)}
                    className="font-primary text-[11px] text-content-muted transition-colors hover:text-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>

    <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/60 px-4 py-2.5">
      <Link
        href="/dashboard/settings/notifications"
        className="block w-full text-center font-primary text-xs font-medium text-primary transition-colors duration-150 hover:text-primary-dark"
      >
        View all notifications
      </Link>
    </div>
  </>
);

const NotificationsDropdown = ({
  isOpen,
  onClose,
  anchorRef,
}: NotificationsDropdownProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [sheetRendered, setSheetRendered] = useState(false);
  const {
    notificationsQuery,
    markAllAsReadMutation,
    markAsReadMutation,
    deleteNotificationMutation,
  } = useNotifications();

  const notifications = notificationsQuery.data?.notifications ?? [];
  const unreadCount = notifications.filter((item) => !item.isRead).length;

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

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

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

  const markAllRead = async () => {
    await markAllAsReadMutation.mutateAsync();
  };

  const markOneRead = async (id: string) => {
    await markAsReadMutation.mutateAsync(id);
  };

  const deleteOne = async (id: string) => {
    await deleteNotificationMutation.mutateAsync(id);
  };

  if (!isOpen) return null;

  const sharedProps = {
    notifications,
    unreadCount,
    onMarkAllRead: markAllRead,
    onMarkOneRead: markOneRead,
    onDeleteOne: deleteOne,
    onClose,
  };

  return (
    <>
      <div
        ref={panelRef}
        aria-label="Notifications"
        className="hidden max-h-[480px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)] animate-dropdown-in md:absolute md:right-0 md:top-[calc(100%+8px)] md:z-50 md:flex md:w-[340px]"
      >
        <PanelContent {...sharedProps} />
      </div>

      <div className="fixed inset-0 z-50 md:hidden">
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${sheetRendered ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 flex max-h-[80vh] flex-col rounded-t-3xl bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.14)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${sheetRendered ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex flex-shrink-0 justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-gray-200" aria-hidden="true" />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <PanelContent {...sharedProps} showCloseButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;