import { Breadcrumb } from "@/components/ui/navigation";
import {
  AccountSecurityForm,
  SettingsShell,
} from "@/components/sections/dashboard";

const SettingsAccountPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/dashboard/settings/profile" },
          { label: "Account & Security" },
        ]}
      />
      <SettingsShell>
        <div className="p-4 sm:p-6 md:p-8">
          <AccountSecurityForm />
        </div>
      </SettingsShell>
    </div>
  );
};

export default SettingsAccountPage;
