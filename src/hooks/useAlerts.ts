import { useState, useCallback } from "react";
import { AlertItem } from "@/components/ui/feedback/AlertContainer";
import { AlertVariant } from "@/components/ui/feedback/Alert";

let _id = 0;
const nextId = () => `alert-${++_id}`;

interface ShowAlertOptions {
  duration?: number;
}

const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const show = useCallback(
    (
      variant: AlertVariant,
      message: string,
      options: ShowAlertOptions = {},
    ) => {
      const id = nextId();
      setAlerts((prev) => [
        ...prev,
        { id, variant, message, duration: options.duration ?? 4000 },
      ]);
      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const success = (msg: string, opts?: ShowAlertOptions) =>
    show("success", msg, opts);
  const error = (msg: string, opts?: ShowAlertOptions) =>
    show("error", msg, opts);
  const warning = (msg: string, opts?: ShowAlertOptions) =>
    show("warning", msg, opts);
  const info = (msg: string, opts?: ShowAlertOptions) =>
    show("info", msg, opts);

  return { alerts, dismiss, success, error, warning, info };
};

export default useAlerts;
