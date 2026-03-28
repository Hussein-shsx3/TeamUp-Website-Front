export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary/50",
  secondary:
    "bg-white text-primary border border-primary hover:bg-primary-light hover:text-primary-dark",
  ghost:
    "bg-transparent text-primary hover:bg-primary-light/40",
  danger:
    "bg-error text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-error/45",
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

/** Square controls for icon-only actions (toolbar, card headers). */
export const iconButtonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8 min-h-8 min-w-8 [&_svg]:size-4",
  md: "h-9 w-9 min-h-9 min-w-9 [&_svg]:size-[18px]",
  lg: "h-10 w-10 min-h-10 min-w-10 [&_svg]:size-5",
};
