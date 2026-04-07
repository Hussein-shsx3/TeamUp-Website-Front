import { Breadcrumb } from "@/components/ui/navigation";
import {
  AccountSecurityForm,
  SettingsShell,
} from "@/components/sections/dashboard";
import { MOCK_USER } from "@/mock/Dashboard";

const SettingsAccountPage = () => {
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
