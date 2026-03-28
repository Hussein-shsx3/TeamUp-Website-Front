import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
  /** No border on the textarea — use when the parent supplies the outline (e.g. profile bio card). */
  variant?: "default" | "plain";
}

const Textarea = ({
  label,
  id,
  error,
  variant = "default",
  className = "",
  ...props
}: TextareaProps) => {
  const inputVariant =
    variant === "plain"
      ? `border-0 bg-transparent px-0 py-1 shadow-none ring-0
         focus:ring-0 focus-visible:ring-0 resize-y
         ${error ? "text-red-600" : ""}`
      : `px-4 py-3 rounded-xl border resize-none focus:ring-2 focus:ring-primary/10 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-primary"
        }`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-primary text-sm font-medium text-content-light"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full text-sm font-primary text-content placeholder:text-content-muted
          transition-all duration-200 focus:outline-none
          ${inputVariant}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default Textarea;
