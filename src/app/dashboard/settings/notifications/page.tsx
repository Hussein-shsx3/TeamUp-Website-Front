import { Breadcrumb } from "@/components/ui/navigation";
import {
  NotificationsSettingsForm,
  SettingsShell,
} from "@/components/sections/dashboard";
import { MOCK_USER } from "@/mock/Dashboard";

const SettingsNotificationsPage = () => {
  const isMentor = MOCK_USER.userRole === "mentor";

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: isMentor ? "Main Mentor Dashboard" : "Main Student Dashboard",
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
