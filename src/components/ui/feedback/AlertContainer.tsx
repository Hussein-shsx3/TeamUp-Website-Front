"use client";

import Alert, { AlertProps } from "./Alert";

export interface AlertItem extends Omit<AlertProps, "onClose"> {
  id: string;
}

interface AlertContainerProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

/**
 * Drop this once at layout level (e.g. inside AppProvider or a page root).
 * Feed it the `alerts` array from useAlerts().
 */
const AlertContainer = ({ alerts, onDismiss }: AlertContainerProps) => {
  if (alerts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[60]
        flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none"
    >
      {alerts.map((alert) => (
        <div key={alert.id} className="pointer-events-auto">
          <Alert
            variant={alert.variant}
            message={alert.message}
            duration={alert.duration}
            onClose={() => onDismiss(alert.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default AlertContainer;
