import { useRef, useEffect } from "react";
import {
  Video,
  ClipboardList,
  CalendarDays,
  MoreVertical,
  Trash2,
  Pencil,
} from "lucide-react";
import { MockCalendarEvent } from "@/mock/Dashboard";
import { MONTHS } from "./CalendarGrid";

/* ── icon per event type ── */
const EVENT_ICON: Record<MockCalendarEvent["type"], React.ReactNode> = {
  session: <Video size={14} className="text-primary" aria-hidden="true" />,
  meeting: (
    <CalendarDays size={14} className="text-accent-dark" aria-hidden="true" />
  ),
  deadline: (
    <ClipboardList size={14} className="text-amber-500" aria-hidden="true" />
  ),
};

const EVENT_ICON_BG: Record<MockCalendarEvent["type"], string> = {
  session: "bg-primary/10",
  meeting: "bg-accent/15",
  deadline: "bg-amber-50",
};

interface EventsListProps {
  events: MockCalendarEvent[];
  selectedDay: number;
  viewMonth: number;
  viewYear: number;
  canManage: boolean;
  openMenuId: number | null;
  onOpenMenu: (id: number | null) => void;
  onEdit: (ev: MockCalendarEvent) => void;
  onDelete: (id: number) => void;
  onAddEvent: () => void;
}

const EventsList = ({
  events,
  selectedDay,
  viewMonth,
  viewYear,
  canManage,
  openMenuId,
  onOpenMenu,
  onEdit,
  onDelete,
  onAddEvent,
}: EventsListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  /* close ⋮ on outside click */
  useEffect(() => {
    if (openMenuId === null) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        onOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuId, onOpenMenu]);

  return (
    <>
      <p className="font-primary text-sm font-semibold text-content mb-4">
        {selectedDay} {MONTHS[viewMonth]} {viewYear}{" "}
        <span className="font-normal text-content-light">Events</span>
      </p>

      {events.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-6">
          <CalendarDays
            size={32}
            className="text-gray-200"
            aria-hidden="true"
          />
          <p className="font-primary text-sm text-content-muted text-center">
            No events for this day
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2 flex-1">
          {events.map((ev) => (
            <li key={ev.id} className="relative">
              <div
                className="flex items-center gap-2.5 px-3 py-2.5
                  rounded-xl border border-gray-100 bg-gray-50/60
                  hover:bg-gray-50 transition-colors duration-150"
              >
                {/* icon badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center
                    justify-center flex-shrink-0 ${EVENT_ICON_BG[ev.type]}`}
                >
                  {EVENT_ICON[ev.type]}
                </div>

                {/* text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-primary text-xs font-semibold
                    text-content leading-snug truncate"
                  >
                    {ev.title}
                  </p>
                  <p className="font-primary text-[11px] text-content-light mt-0.5">
                    {ev.time}
                  </p>
                </div>

                {/* ⋮ — only team_admin / mentor */}
                {canManage && (
                  <div
                    className="relative flex-shrink-0"
                    ref={openMenuId === ev.id ? menuRef : null}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onOpenMenu(openMenuId === ev.id ? null : ev.id)
                      }
                      aria-label="Event options"
                      className="w-7 h-7 flex items-center justify-center
                        rounded-full text-content-muted hover:bg-gray-200
                        transition-colors duration-150"
                    >
                      <MoreVertical size={14} aria-hidden="true" />
                    </button>

                    {openMenuId === ev.id && (
                      <div
                        className="absolute right-0 top-8 z-50
                          bg-white rounded-xl border border-gray-100
                          shadow-[0_4px_20px_rgba(0,0,0,0.12)]
                          py-1 w-28 animate-dropdown-in"
                      >
                        <button
                          type="button"
                          onClick={() => onDelete(ev.id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2
                            text-red-500 hover:bg-red-50 font-primary text-xs
                            transition-colors duration-150"
                        >
                          <Trash2 size={13} aria-hidden="true" />
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(ev)}
                          className="w-full flex items-center gap-2.5 px-3 py-2
                            text-content hover:bg-primary-light hover:text-primary
                            font-primary text-xs transition-colors duration-150"
                        >
                          <Pencil size={13} aria-hidden="true" />
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add Event — only team_admin / mentor */}
      {canManage && (
        <div className="mt-auto pt-4 flex justify-end">
          <button
            type="button"
            onClick={onAddEvent}
            className="px-5 py-2 rounded-lg bg-primary text-white
              font-primary text-sm font-medium hover:bg-primary-dark
              transition-all duration-200
              shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
          >
            Add Event
          </button>
        </div>
      )}
    </>
  );
};

export default EventsList;
