import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id: string;
  options: SelectOption[];
  error?: string;
}

const Select = ({
  label,
  id,
  options,
  error,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-primary text-sm text-content-light font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none px-4 py-3 rounded-lg border text-sm
            font-primary text-content bg-white
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all duration-200
            ${error ? "border-red-400 focus:border-red-400" : "border-gray-200"}
            ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-content-muted pointer-events-none"
          aria-hidden="true"
        />
      </div>
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default Select;
