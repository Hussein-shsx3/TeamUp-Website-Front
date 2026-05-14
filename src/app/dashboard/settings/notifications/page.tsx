"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import {
  NotificationsSettingsForm,
  SettingsShell,
} from "@/components/sections/dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { getDisplayRole } from "@/lib/user";

const SettingsNotificationsPage = () => {
  const { data: currentUser } = useCurrentUser();
  const displayUser = currentUser?.user ?? null;
  const displayRole = getDisplayRole(displayUser?.role);
  const isMentor = displayRole === "Mentor";

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: isMentor
              ? "Main Mentor Dashboard"
              : displayRole === "Admin"
                ? "Main Admin Dashboard"
                : "Main Student Dashboard",
            href: "/dashboard",
          },
          { label: "Settings", href: "/dashboard/settings/profile" },
          { label: "Notifications" },
        ]}
      />
      <SettingsShell>
        <div className="p-4 sm:p-6 md:p-8">
          <NotificationsSettingsForm />
        </div>
      </SettingsShell>
    </div>
  );
};

export default SettingsNotificationsPage;
