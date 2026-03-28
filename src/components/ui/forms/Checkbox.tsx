import React from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, className = "", disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 font-primary text-sm text-content
          ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary
            accent-primary focus:ring-2 focus:ring-primary/25 focus:ring-offset-0
            disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />
        <span className="leading-snug">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
