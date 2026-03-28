import { Breadcrumb } from "@/components/ui/navigation";
import {
  NotificationsSettingsForm,
  SettingsShell,
} from "@/components/sections/dashboard";

const SettingsNotificationsPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
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
