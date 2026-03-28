import React from "react";
import {
  variantClasses,
  iconButtonSizeClasses,
  type ButtonVariant,
  type ButtonSize,
} from "./buttonStyles";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Required for accessibility when the button has no visible text. */
  "aria-label": string;
  className?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      className = "",
      type = "button",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`inline-flex shrink-0 items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${iconButtonSizeClasses[size]} ${className}`}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
