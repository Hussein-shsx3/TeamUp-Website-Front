"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/ui/buttons";
import Switch from "@/components/ui/forms/Switch";

const notificationRules = [
  {
    id: "new-user-registration",
    title: "New User Registration",
    description: "Notify when a new user registers",
  },
  {
    id: "pending-user-approval",
    title: "Pending User Approval",
    description: "Notify when users require approval",
  },
  {
    id: "new-idea-submitted",
    title: "New Idea Submitted",
    description: "Notify when a new idea is submitted",
  },
  {
    id: "idea-approval-rejection",
    title: "Idea Approval / Rejection",
    description: "Notify when idea status changes",
  },
  {
    id: "new-team-created",
    title: "New Team Created",
    description: "Notify when a new team is created",
  },
];

const deliveryRules = [
  { id: "in-app-notifications", title: "In-App Notifications" },
  { id: "email-notifications", title: "Email Notifications" },
];

const NotificationsSettingsSection = () => {
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>(
    notificationRules.reduce<Record<string, boolean>>((states, rule) => {
      states[rule.id] = true;
      return states;
    }, {}),
  );

  const [deliveryStates, setDeliveryStates] = useState<Record<string, boolean>>(
    deliveryRules.reduce<Record<string, boolean>>((states, rule) => {
      states[rule.id] = true;
      return states;
    }, {}),
  );

  return (
    <section className="mt-10 w-full max-w-[1240px] space-y-5">
      <div className="rounded-lg border border-[#dfe6f3] bg-white p-5 sm:p-6">
        <div className="space-y-5">
          {notificationRules.map((rule) => (
            <div key={rule.id} className="flex items-start justify-between gap-6">
              <div className="max-w-[540px]">
                <p className="font-primary text-[18px] font-medium leading-6 text-content">
                  {rule.title}
                </p>
                <p className="mt-1 font-primary text-[10px] leading-5 text-[#5f728f]">
                  {rule.description}
                </p>
              </div>

              <Switch
                id={rule.id}
                checked={notificationStates[rule.id]}
                onChange={(checked) =>
                  setNotificationStates((current) => ({
                    ...current,
                    [rule.id]: checked,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#dfe6f3] bg-white p-5 sm:p-6">
        <div className="space-y-5">
          {deliveryRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between gap-6">
              <p className="font-primary text-[18px] font-medium leading-6 text-content">
                {rule.title}
              </p>

              <Switch
                id={rule.id}
                checked={deliveryStates[rule.id]}
                onChange={(checked) =>
                  setDeliveryStates((current) => ({
                    ...current,
                    [rule.id]: checked,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="button" variant="primary" size="md" className="min-w-[100px]">
          Save
        </Button>
        <LinkButton href="/admin" variant="secondary" size="md" className="min-w-[100px]">
          Cancle
        </LinkButton>
      </div>
    </section>
  );
};

export default NotificationsSettingsSection;