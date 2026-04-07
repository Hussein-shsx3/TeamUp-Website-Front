import { MOCK_USER } from "@/mock/Dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { EditProfileForm, SettingsShell } from "@/components/sections/dashboard";

const SettingsProfilePage = () => {
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
          { label: "Mentor Profile" },
        ]}
      />
      <SettingsShell>
        <div className="p-4 sm:p-6 md:p-8">
          <EditProfileForm
            initialName={MOCK_USER.name}
            initialRole={MOCK_USER.role}
            initialUniversity={MOCK_USER.university}
            initialMajor={MOCK_USER.major}
            initialSkills={[...MOCK_USER.skills]}
            initialBio={MOCK_USER.bio}
            initialAvatar={MOCK_USER.avatar}
            actionsAlign="start"
            cancelHref="/dashboard/profile"
            isMentor={isMentor}
          />
        </div>
      </SettingsShell>
    </div>
  );
};

export default SettingsProfilePage;
