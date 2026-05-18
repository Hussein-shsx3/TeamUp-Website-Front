import React from "react";
import { Loader2 } from "lucide-react";
import { variantClasses, sizeClasses, type ButtonVariant, type ButtonSize } from "./buttonStyles";

export type { ButtonVariant, ButtonSize };

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  loadingLabel?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      type = "button",
      disabled,
      isLoading = false,
      loadingLabel,
      ...props
    },
    ref,
  ) => {
    const content = isLoading ? loadingLabel ?? props.children : props.children;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${isLoading ? "gap-2" : ""} ${className}`}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
