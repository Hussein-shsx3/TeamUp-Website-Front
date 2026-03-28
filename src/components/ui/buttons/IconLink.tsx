import Link from "next/link";
import React from "react";
import {
  variantClasses,
  iconButtonSizeClasses,
  type ButtonVariant,
  type ButtonSize,
} from "./buttonStyles";

export interface IconLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Required when the link has no visible text. */
  "aria-label": string;
  className?: string;
}

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      variant = "ghost",
      size = "md",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        className={`inline-flex shrink-0 items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses[variant]} ${iconButtonSizeClasses[size]} ${className}`}
        {...props}
      />
    );
  },
);

IconLink.displayName = "IconLink";

export default IconLink;
