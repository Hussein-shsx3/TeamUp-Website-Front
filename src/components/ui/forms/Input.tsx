import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

const Input = ({ label, id, error, className = "", ...props }: InputProps) => {
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
        className={`w-full px-4 py-3 rounded-lg border text-sm font-primary text-content
          placeholder:text-content-muted transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/10
          ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-primary"
          }
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default Input;
