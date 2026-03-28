import React from "react";
import { Input } from "@/components/ui/forms";
import { SubmitButton } from "@/components/ui/forms";
import Select from "@/components/ui/forms/Select";
import { MONTHS } from "./CalendarGrid";

export interface EventForm {
  name: string;
  forRole: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  notify: boolean;
}

export const EMPTY_FORM: EventForm = {
  name: "",
  forRole: "All",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  notify: true,
};

const FOR_ROLE_OPTIONS = [
  { value: "All", label: "All" },
  { value: "team_admin", label: "Team Admin" },
  { value: "mentor", label: "Mentor" },
  { value: "student", label: "Student" },
  { value: "graduate", label: "Graduate" },
];

interface EventFormProps {
  mode: "add" | "edit";
  form: EventForm;
  selectedDay: number;
  viewMonth: number;
  viewYear: number;
  onChange: (updated: EventForm) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const EventFormPanel = ({
  mode,
  form,
  selectedDay,
  viewMonth,
  viewYear,
  onChange,
  onCancel,
  onSubmit,
}: EventFormProps) => {
  const datePlaceholder = `${selectedDay} . ${MONTHS[viewMonth].slice(0, 4)} . ${viewYear}`;

  const set = <K extends keyof EventForm>(key: K, val: EventForm[K]) =>
    onChange({ ...form, [key]: val });

  return (
    <>
      <p className="font-primary text-sm font-semibold text-content mb-4">
        {mode === "edit" ? "Edit Event" : "Add Event"}
      </p>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-0.5">
        {/* Event Name — uses existing Input component */}
        <Input
          id="event-name"
          name="event-name"
          type="text"
          label="Event Name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="First meeting"
        />

        {/* For — uses new Select component */}
        <Select
          id="event-for-role"
          label="For"
          value={form.forRole}
          onChange={(e) => set("forRole", e.target.value)}
          options={FOR_ROLE_OPTIONS}
        />

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <span className="font-primary text-sm text-content-light font-medium">
            Start Date
          </span>
          <div className="flex gap-2">
            <Input
              id="event-start-date"
              name="event-start-date"
              type="text"
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              placeholder={datePlaceholder}
              aria-label="Start date"
              className="flex-1"
            />
            <Input
              id="event-start-time"
              name="event-start-time"
              type="text"
              value={form.startTime}
              onChange={(e) => set("startTime", e.target.value)}
              placeholder="10:00 pm"
              aria-label="Start time"
              className="w-24"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2">
          <span className="font-primary text-sm text-content-light font-medium">
            End Date
          </span>
          <div className="flex gap-2">
            <Input
              id="event-end-date"
              name="event-end-date"
              type="text"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              placeholder={datePlaceholder}
              aria-label="End date"
              className="flex-1"
            />
            <Input
              id="event-end-time"
              name="event-end-time"
              type="text"
              value={form.endTime}
              onChange={(e) => set("endTime", e.target.value)}
              placeholder="11:00 pm"
              aria-label="End time"
              className="w-24"
            />
          </div>
        </div>

        {/* Enable notifications — native checkbox wrapped in accessible label */}
        <label
          htmlFor="event-notify"
          className="flex items-center justify-between cursor-pointer mt-1"
        >
          <span className="font-primary text-sm text-content-light font-medium">
            Enable notifications
          </span>
          <div className="relative">
            <input
              id="event-notify"
              type="checkbox"
              checked={form.notify}
              onChange={(e) => set("notify", e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded flex items-center justify-center
                border transition-all duration-200
                ${
                  form.notify
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-300"
                }`}
              aria-hidden="true"
            >
              {form.notify && (
                <svg
                  viewBox="0 0 10 8"
                  className="w-2.5 h-2 text-white fill-none stroke-current stroke-2"
                  aria-hidden="true"
                >
                  <polyline points="1,4 3.5,6.5 9,1" />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-end gap-2 mt-4 pt-3
        border-t border-gray-100"
      >
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 text-sm font-medium font-primary
                  text-primary border border-primary/30 rounded-lg
                  hover:border-primary hover:bg-primary-light
                  transition-all duration-200"
        >
          Cancel
        </button>
        {/* uses existing SubmitButton component */}
        <SubmitButton
          label={mode === "edit" ? "Update" : "Schedule"}
          onClick={(_e: React.MouseEvent<HTMLButtonElement>) => onSubmit()}
          className="w-auto px-8 !py-3 rounded-lg text-sm border border-primary/30"
        />
      </div>
    </>
  );
};

export default EventFormPanel;
