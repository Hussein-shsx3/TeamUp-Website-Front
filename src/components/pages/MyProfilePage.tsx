import { MOCK_USER, MOCK_PROFILE_DISPLAY_ROLE } from "@/mock/Dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { ProfileSection } from "@/components/sections/dashboard";

const MyProfilePage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Student Profile" },
        ]}
      />
      <ProfileSection
        name={MOCK_USER.name}
        displayRole={MOCK_PROFILE_DISPLAY_ROLE}
        avatar={MOCK_USER.avatar}
        skills={MOCK_USER.skills}
        university={MOCK_USER.university}
        major={MOCK_USER.major}
        bio={MOCK_USER.bio}
        isOwnProfile
      />
    </div>
  );
};

export default MyProfilePage;
