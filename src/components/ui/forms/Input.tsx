import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  /** Borderless field for use inside a bordered container (e.g. profile edit cards). */
  variant?: "default" | "plain";
}

const Input = ({
  label,
  id,
  error,
  variant = "default",
  className = "",
  ...props
}: InputProps) => {
  const inputBase =
    "w-full text-sm font-primary text-content placeholder:text-content-muted transition-all duration-200 focus:outline-none";

  const inputVariant =
    variant === "plain"
      ? `rounded-lg border-0 bg-transparent px-0 py-2.5 shadow-none
         focus:ring-0 focus-visible:ring-0 ${error ? "text-red-600" : ""}`
      : `px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/10 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-primary"
        }`;

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
      <input
        id={id}
        className={`${inputBase} ${inputVariant} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default Input;
