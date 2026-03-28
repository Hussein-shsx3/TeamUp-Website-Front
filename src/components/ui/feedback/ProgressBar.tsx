/* Maps 0-100 to the nearest Tailwind w-* class (steps of 5).
   Add this to src/components/ui/feedback/ProgressBar.tsx            */

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
}

/* Tailwind needs static strings — we map to nearest w-* in steps of 5 */
const WIDTH_MAP: Record<number, string> = {
  0: "w-0",
  5: "w-[5%]",
  10: "w-[10%]",
  15: "w-[15%]",
  20: "w-1/5",
  25: "w-1/4",
  30: "w-[30%]",
  35: "w-[35%]",
  40: "w-2/5",
  45: "w-[45%]",
  50: "w-1/2",
  55: "w-[55%]",
  60: "w-3/5",
  65: "w-[65%]",
  70: "w-[70%]",
  75: "w-3/4",
  80: "w-4/5",
  85: "w-[85%]",
  90: "w-[90%]",
  95: "w-[95%]",
  100: "w-full",
};

const snap = (value: number) =>
  Math.round(Math.min(100, Math.max(0, value)) / 5) * 5;

const ProgressBar = ({ value, className = "" }: ProgressBarProps) => {
  const widthClass = WIDTH_MAP[snap(value)] ?? "w-0";

  return (
    <div
      className={`w-full h-2 bg-gray-100 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full bg-primary rounded-full transition-all duration-500 ${widthClass}`}
      />
    </div>
  );
};

export default ProgressBar;
