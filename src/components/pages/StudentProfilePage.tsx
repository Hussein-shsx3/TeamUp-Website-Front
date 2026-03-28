import { MOCK_STUDENT_PROFILE } from "@/mock/Dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { ProfileSection } from "@/components/sections/dashboard";

const StudentProfilePage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Student Profile" },
        ]}
      />
      <ProfileSection
        name={MOCK_STUDENT_PROFILE.name}
        displayRole={MOCK_STUDENT_PROFILE.displayRole}
        avatar="/images/user.jpg"
        skills={MOCK_STUDENT_PROFILE.skills}
        university={MOCK_STUDENT_PROFILE.university}
        major={MOCK_STUDENT_PROFILE.major}
        bio={MOCK_STUDENT_PROFILE.bio}
        isOwnProfile={false}
      />
    </div>
  );
};

export default StudentProfilePage;
