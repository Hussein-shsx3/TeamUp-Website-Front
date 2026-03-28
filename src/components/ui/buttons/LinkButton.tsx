import Link, { LinkProps } from "next/link";
import React from "react";
import { variantClasses, sizeClasses, type ButtonVariant, type ButtonSize } from "./buttonStyles";

export interface LinkButtonProps
  extends Omit<LinkProps, "href">,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  },
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
