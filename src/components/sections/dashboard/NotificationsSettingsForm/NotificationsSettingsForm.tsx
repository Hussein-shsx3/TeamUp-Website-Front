"use client";

import { useState } from "react";
import Checkbox from "@/components/ui/forms/Checkbox";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { MOCK_NOTIFICATION_SETTINGS, MOCK_USER } from "@/mock/Dashboard";

const sectionCard =
  "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

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

const emailFields = [
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
  const isMentor = MOCK_USER.userRole === "mentor";
  const [inApp, setInApp] = useState({ 
    ...MOCK_NOTIFICATION_SETTINGS.inApp,
    supervisionRequests: true,
    milestoneUpdates: false,
    ideaAdoption: true,
    teamChat: true,
    systemAlerts: true,
    meetingRequests: true,
  });
  const [email, setEmail] = useState({ ...MOCK_NOTIFICATION_SETTINGS.email });

  const fields = isMentor ? mentorInAppFields : studentInAppFields;

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
          {fields.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={`notif-inapp-${key}`}
              name={`inApp.${key}`}
              label={label}
              checked={(inApp as any)[key]}
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
              checked={(email as any)[key]}
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
          Cancle
        </LinkButton>
      </div>
    </form>
  );
};

export default NotificationsSettingsForm;
