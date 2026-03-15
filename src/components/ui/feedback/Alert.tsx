"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant: AlertVariant;
  message: string;
  /** auto-dismiss after ms — omit to keep it until dismissed */
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const CONFIG: Record<
  AlertVariant,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    iconColor: "text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    iconColor: "text-yellow-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    iconColor: "text-blue-500",
  },
};

const Alert = ({
  variant,
  message,
  duration,
  onClose,
  className = "",
}: AlertProps) => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  };

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  if (!visible) return null;

  const { icon: Icon, bg, border, text, iconColor } = CONFIG[variant];

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border
        font-primary text-sm font-medium
        transition-all duration-300
        ${bg} ${border} ${text}
        ${leaving ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"}
        ${className}`}
    >
      <Icon
        size={17}
        className={`flex-shrink-0 ${iconColor}`}
        aria-hidden="true"
      />
      <span className="flex-1 leading-snug">{message}</span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-150"
      >
        <X size={15} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Alert;
