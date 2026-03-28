import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_CALENDAR_EVENTS } from "@/mock/Dashboard";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export const daysInMonthFn = (y: number, m: number) =>
  new Date(y, m + 1, 0).getDate();

export const firstOffsetFn = (y: number, m: number) => {
  const d = new Date(y, m, 1).getDay();
  return d === 0 ? 6 : d - 1;
};

interface CalendarGridProps {
  viewYear: number;
  viewMonth: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarGrid = ({
  viewYear,
  viewMonth,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) => {
  const today = new Date();
  const totalDays = daysInMonthFn(viewYear, viewMonth);
  const offset = firstOffsetFn(viewYear, viewMonth);
  const prevDays = daysInMonthFn(
    viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1,
  );

  const cells: { day: number; current: boolean }[] = [];
  for (let i = 0; i < offset; i++)
    cells.push({ day: prevDays - offset + 1 + i, current: false });
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, current: true });
  for (let i = 1; i <= 42 - cells.length; i++)
    cells.push({ day: i, current: false });

  const isToday = (d: number) =>
    d === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const hasEvents = (d: number) =>
    Boolean(MOCK_CALENDAR_EVENTS[dateKey(viewYear, viewMonth, d)]);

  return (
    <div
      className="flex-shrink-0 px-5 py-4 w-full sm:w-[265px]
        border-b sm:border-b-0 sm:border-r border-gray-100"
    >
      {/* month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onPrevMonth}
          aria-label="Previous month"
          className="w-7 h-7 flex items-center justify-center rounded-full
            hover:bg-gray-100 transition-colors duration-150"
        >
          <ChevronLeft size={15} className="text-content-light" />
        </button>

        <span className="font-primary text-sm font-semibold text-content">
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Next month"
          className="w-7 h-7 flex items-center justify-center rounded-full
            hover:bg-gray-100 transition-colors duration-150"
        >
          <ChevronRight size={15} className="text-content-light" />
        </button>
      </div>

      {/* weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="font-primary text-[10px] font-medium text-content-muted
              text-center py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cell, idx) => {
          const isSel = cell.current && cell.day === selectedDay;
          const isTod = cell.current && isToday(cell.day);
          const hasEv = cell.current && hasEvents(cell.day);

          return (
            <button
              key={idx}
              type="button"
              disabled={!cell.current}
              onClick={() => cell.current && onSelectDay(cell.day)}
              className={`relative flex flex-col items-center justify-center
                w-full aspect-square rounded-full text-[11px] font-primary
                transition-all duration-150
                ${
                  !cell.current
                    ? "text-gray-300 cursor-default"
                    : isSel
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : isTod
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-content hover:bg-gray-100"
                }`}
            >
              {cell.day}
              {hasEv && !isSel && (
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2
                    w-1 h-1 rounded-full
                    ${isTod ? "bg-primary" : "bg-primary/40"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
