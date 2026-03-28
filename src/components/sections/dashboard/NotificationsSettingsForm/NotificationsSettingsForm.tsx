"use client";

import { useState } from "react";
import Checkbox from "@/components/ui/forms/Checkbox";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { MOCK_NOTIFICATION_SETTINGS } from "@/mock/Dashboard";

const sectionCard =
  "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

const sectionHeadingClassName =
  "mb-4 font-primary font-semibold text-content !text-base sm:!text-lg !leading-snug";

type InAppKey = keyof typeof MOCK_NOTIFICATION_SETTINGS.inApp;
type EmailKey = keyof typeof MOCK_NOTIFICATION_SETTINGS.email;

const inAppFields: { key: InAppKey; label: string }[] = [
  { key: "joinRequests", label: "Join Requests" },
  { key: "invitations", label: "Invitations" },
  { key: "teamMessages", label: "Team Messages" },
  { key: "taskUpdates", label: "Task Updates" },
  { key: "mentorUpdates", label: "Mentor Updates" },
  { key: "deadlines", label: "Deadlines" },
];

const emailFields: { key: EmailKey; label: string }[] = [
  {
    key: "platformEmail",
    label: "Receive platform notifications via email",
  },
  { key: "weeklyDigest", label: "Weekly Digest" },
  { key: "securityAlerts", label: "Security Alerts" },
];

interface NotificationsSettingsFormProps {
  cancelHref?: string;
}

const NotificationsSettingsForm = ({
  cancelHref = "/dashboard/settings/profile",
}: NotificationsSettingsFormProps) => {
  const [inApp, setInApp] = useState({ ...MOCK_NOTIFICATION_SETTINGS.inApp });
  const [email, setEmail] = useState({ ...MOCK_NOTIFICATION_SETTINGS.email });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("save notification settings (mock)", { inApp, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      <section aria-labelledby="notif-inapp-heading">
        <Heading
          level="h3"
          id="notif-inapp-heading"
          className={sectionHeadingClassName}
        >
          In-app
        </Heading>
        <div className={`${sectionCard} flex flex-col gap-4`}>
          {inAppFields.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={`notif-inapp-${key}`}
              name={`inApp.${key}`}
              label={label}
              checked={inApp[key]}
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
              checked={email[key]}
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
        <LinkButton href={cancelHref} variant="secondary" size="md" className="min-w-[100px]">
          Cancel
        </LinkButton>
      </div>
    </form>
  );
};

export default NotificationsSettingsForm;
