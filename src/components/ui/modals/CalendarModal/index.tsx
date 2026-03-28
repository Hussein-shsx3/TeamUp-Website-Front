"use client";

import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import {
  MOCK_CALENDAR_EVENTS,
  MockCalendarEvent,
  MOCK_USER,
} from "@/mock/Dashboard";

import CalendarGrid, { dateKey, daysInMonthFn, MONTHS } from "./CalendarGrid";
import EventsList from "./EventsList";
import EventFormPanel, { EventForm, EMPTY_FORM } from "./EventForm";

/* ── roles that can add / edit / delete ── */
const CAN_MANAGE = ["team_admin", "mentor"] as const;

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  const today = new Date();
  const canManage = CAN_MANAGE.includes(
    MOCK_USER.userRole as (typeof CAN_MANAGE)[number],
  );

  /* ── calendar navigation state ── */
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  /* ── right-panel mode ── */
  const [panelMode, setPanelMode] = useState<"events" | "add" | "edit">(
    "events",
  );
  const [editingEvent, setEditingEvent] = useState<MockCalendarEvent | null>(
    null,
  );

  /* ── ⋮ popover ── */
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  /* ── form state ── */
  const [form, setForm] = useState<EventForm>(EMPTY_FORM);

  /* Escape: close form → then modal */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (panelMode !== "events") {
        setPanelMode("events");
        setEditingEvent(null);
      } else onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, panelMode, onClose]);

  if (!isOpen) return null;

  /* ── month navigation ── */
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  /* ── selected day events ── */
  const selKey = dateKey(viewYear, viewMonth, selectedDay);
  const selEvents = MOCK_CALENDAR_EVENTS[selKey] ?? [];

  /* ── date placeholder for form ── */
  const datePlaceholder = `${selectedDay} . ${MONTHS[viewMonth].slice(0, 4)} . ${viewYear}`;

  /* ── handlers ── */
  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setPanelMode("events");
  };

  const handleOpenAdd = () => {
    setForm({
      ...EMPTY_FORM,
      startDate: datePlaceholder,
      endDate: datePlaceholder,
    });
    setPanelMode("add");
    setOpenMenuId(null);
  };

  const handleOpenEdit = (ev: MockCalendarEvent) => {
    setEditingEvent(ev);
    setForm({
      name: ev.title,
      forRole: "All",
      startDate: datePlaceholder,
      startTime: ev.time.split("–")[0]?.trim() ?? "",
      endDate: datePlaceholder,
      endTime: ev.time.split("–")[1]?.trim() ?? "",
      notify: true,
    });
    setPanelMode("edit");
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    /* TODO: connect to API */
    console.log("delete event", id);
    setOpenMenuId(null);
  };

  const handleSubmit = () => {
    /* TODO: connect to API */
    console.log(
      panelMode === "edit" ? "update" : "create",
      form,
      editingEvent?.id,
    );
    setPanelMode("events");
    setEditingEvent(null);
  };

  const handleCancel = () => {
    setPanelMode("events");
    setEditingEvent(null);
  };

  /* ──────────── RENDER */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          w-full max-w-[640px]
          max-h-[90vh] flex flex-col
          overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal header — always visible ── */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center
            justify-center flex-shrink-0"
          >
            <Clock size={16} className="text-white" aria-hidden="true" />
          </div>
          <h2 className="font-primary text-base font-semibold text-content">
            Your Calendar
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close calendar"
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full
              text-content-muted hover:text-red-400 hover:bg-red-50
              transition-colors duration-200"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* ── Body — scrollable on mobile, side-by-side on sm+ ── */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Left: calendar grid — shrinks on mobile, fixed width on desktop */}
          <div
            className="flex-shrink-0 sm:overflow-y-auto
            border-b sm:border-b-0 sm:border-r border-gray-100"
          >
            <CalendarGrid
              viewYear={viewYear}
              viewMonth={viewMonth}
              selectedDay={selectedDay}
              onSelectDay={handleSelectDay}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
            />
          </div>

          {/* Right: events or form — scrollable independently */}
          <div className="flex-1 px-5 py-4 flex flex-col overflow-y-auto min-h-[260px] sm:min-h-0">
            {panelMode === "events" ? (
              <EventsList
                events={selEvents}
                selectedDay={selectedDay}
                viewMonth={viewMonth}
                viewYear={viewYear}
                canManage={canManage}
                openMenuId={openMenuId}
                onOpenMenu={setOpenMenuId}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
                onAddEvent={handleOpenAdd}
              />
            ) : (
              <EventFormPanel
                mode={panelMode}
                form={form}
                selectedDay={selectedDay}
                viewMonth={viewMonth}
                viewYear={viewYear}
                onChange={setForm}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
