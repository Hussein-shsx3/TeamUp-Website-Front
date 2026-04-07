import { MOCK_USER } from "@/mock/Dashboard";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/navigation";

export const metadata: Metadata = {
  title: "TeamUp — Edit Profile",
};
import { EditProfileForm } from "@/components/sections/dashboard";

const ProfileEditPage = () => {
  const isMentor = MOCK_USER.userRole === "mentor";

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: isMentor ? "Main Mentor Dashboard" : "Main Student Dashboard",
            href: "/dashboard",
          },
          { label: isMentor ? "Mentor Profile" : "Student Profile" },
        ]}
      />
      <div
        className="overflow-hidden rounded-xl border border-gray-100 bg-white
          shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl"
      >
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
      </div>
    </div>
  );
};

export default ProfileEditPage;
