import { MOCK_USER, MOCK_PROFILE_DISPLAY_ROLE, MOCK_MENTOR_SUPERVISED_PROJECTS } from "@/mock/Dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { ProfileSection } from "@/components/sections/dashboard";

const MyProfilePage = () => {
  const displayRole = MOCK_USER.userRole === "mentor" ? MOCK_USER.role : MOCK_PROFILE_DISPLAY_ROLE;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: displayRole === "Mentor" ? "Mentor Profile" : "Student Profile" },
        ]}
      />
      <ProfileSection
        name={MOCK_USER.name}
        displayRole={displayRole}
        avatar={MOCK_USER.avatar}
        skills={MOCK_USER.skills}
        university={MOCK_USER.university}
        major={MOCK_USER.major}
        bio={MOCK_USER.bio}
        isOwnProfile
        activeProjectsCount={MOCK_USER.userRole === "mentor" ? MOCK_MENTOR_SUPERVISED_PROJECTS.filter((p) => p.status !== "Completed").length : undefined}
        completedProjectsCount={MOCK_USER.userRole === "mentor" ? MOCK_MENTOR_SUPERVISED_PROJECTS.filter((p) => p.status === "Completed").length : undefined}
      />
    </div>
  );
};

export default MyProfilePage;
