"use client";

import { useEffect, useMemo, useState } from "react";
import Checkbox from "@/components/ui/forms/Checkbox";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import AuthErrorBanner from "@/components/sections/auth/AuthErrorBanner";
import { useCurrentUser } from "@/hooks/useUser";
import { getDisplayRole } from "@/lib/user";
import { MOCK_NOTIFICATION_SETTINGS } from "@/mock/Dashboard";

const sectionCard = "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

const sectionHeadingClassName =
  "mb-4 font-primary font-semibold text-content !text-base sm:!text-lg !leading-snug";

const studentInAppFields = [
  { key: "joinRequests", label: "Join Requests" },
  { key: "invitations", label: "Invitations" },
  { key: "teamMessages", label: "Team Messages" },
  { key: "taskUpdates", label: "Task Updates" },
  { key: "mentorUpdates", label: "Mentor Updates" },
  { key: "deadlines", label: "Deadlines" },
];

const mentorInAppFields = [
  { key: "supervisionRequests", label: "Supervision Requests" },
  { key: "milestoneUpdates", label: "Milestone Updates" },
  { key: "ideaAdoption", label: "Idea Adoption" },
  { key: "teamChat", label: "Team Chat" },
  { key: "systemAlerts", label: "System Alerts" },
  { key: "meetingRequests", label: "Meeting Requests" },
];

const adminInAppFields = [
  { key: "systemAlerts", label: "System Alerts" },
  { key: "securityAlerts", label: "Security Alerts" },
  { key: "reports", label: "Reports" },
  { key: "accountActivity", label: "Account Activity" },
];

const emailFields = [
  { key: "platformEmail", label: "Receive platform notifications via email" },
  { key: "weeklyDigest", label: "Weekly Digest" },
  { key: "securityAlerts", label: "Security Alerts" },
];

interface NotificationsSettingsFormProps {
  cancelHref?: string;
}

const NotificationsSettingsForm = ({
  cancelHref = "/dashboard/settings/profile",
}: NotificationsSettingsFormProps) => {
  const { data: currentUser } = useCurrentUser();
  const role = getDisplayRole(currentUser?.user?.role);
  const isMentor = role === "Mentor";
  const isAdmin = role === "Admin";

  const initialInApp = useMemo(() => {
    if (isMentor) {
      return {
        ...MOCK_NOTIFICATION_SETTINGS.inApp,
        supervisionRequests: true,
        milestoneUpdates: true,
        ideaAdoption: false,
        teamChat: true,
        systemAlerts: true,
        meetingRequests: true,
      };
    }

    if (isAdmin) {
      return {
        systemAlerts: true,
        securityAlerts: true,
        reports: true,
        accountActivity: true,
      };
    }

    return { ...MOCK_NOTIFICATION_SETTINGS.inApp };
  }, [isAdmin, isMentor]);

  const [inApp, setInApp] = useState<Record<string, boolean>>(initialInApp);
  const [email, setEmail] = useState({ ...MOCK_NOTIFICATION_SETTINGS.email });
  const [feedback, setFeedback] = useState<{ variant: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setInApp(initialInApp);
  }, [initialInApp]);

  const fields = isAdmin
    ? adminInAppFields
    : isMentor
      ? mentorInAppFields
      : studentInAppFields;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFeedback({
      variant: "success",
      message: "Notification preferences saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      {feedback ? (
        <div className="mb-5">
          <AuthErrorBanner
            message={feedback.message}
            variant={feedback.variant}
            onClose={() => setFeedback(null)}
          />
        </div>
      ) : null}

      <section aria-labelledby="notif-inapp-heading">
        <Heading
          level="h3"
          id="notif-inapp-heading"
          className={sectionHeadingClassName}
        >
          In-app
        </Heading>
        <div className={`${sectionCard} flex flex-col gap-4`}>
          {fields.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={`notif-inapp-${key}`}
              name={`inApp.${key}`}
              label={label}
              checked={Boolean(inApp[key])}
              onChange={(e) =>
                setInApp((prev) => ({ ...prev, [key]: e.target.checked }))
              }
            />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="notif-email-heading">
        <Heading
          level="h3"
          id="notif-email-heading"
          className={sectionHeadingClassName}
        >
          Email
        </Heading>
        <div className={`${sectionCard} flex flex-col gap-4`}>
          {emailFields.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={`notif-email-${key}`}
              name={`email.${key}`}
              label={label}
              checked={(email as Record<string, boolean>)[key]}
              onChange={(e) =>
                setEmail((prev) => ({ ...prev, [key]: e.target.checked }))
              }
            />
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 pt-3">
        <Button type="submit" variant="primary" size="md" className="min-w-[100px]">
          Save
        </Button>
        <LinkButton
          href={cancelHref}
          variant="secondary"
          size="md"
          className="min-w-[100px]"
        >
          Cancel
        </LinkButton>
      </div>
    </form>
  );
};

export default NotificationsSettingsForm;