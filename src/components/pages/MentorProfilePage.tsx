import { MOCK_MENTOR_PROFILE } from "@/mock/Dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { ProfileSection } from "@/components/sections/dashboard";

const MentorProfilePage = () => {
  const mentor = MOCK_MENTOR_PROFILE;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Mentor Dashboard", href: "/dashboard" },
          { label: "Mentor Profile" },
        ]}
      />

      <ProfileSection
        name={mentor.name}
        displayRole={mentor.displayRole}
        avatar={mentor.avatar}
        skills={mentor.skills}
        university={mentor.university}
        major={mentor.major}
        bio={mentor.bio}
        isOwnProfile={false}
        nonOwnActionLabel="Request Supervision"
      />
    </div>
  );
};

export default MentorProfilePage;
