import ProfileHeader from "./ProfileHeader";
import SkillsCard from "./SkillsCard";
import AcademicCard from "./AcademicCard";
import BioCard from "./BioCard";

interface ProfileSectionProps {
  name: string;
  displayRole: string;
  avatar: string;
  skills: string[];
  university: string;
  major: string;
  bio: string;
  isOwnProfile?: boolean;
}

const ProfileSection = ({
  name,
  displayRole,
  avatar,
  skills,
  university,
  major,
  bio,
  isOwnProfile = false,
}: ProfileSectionProps) => {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white
        shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl"
    >
      <ProfileHeader
        name={name}
        displayRole={displayRole}
        avatar={avatar}
        isOwnProfile={isOwnProfile}
      />
      <SkillsCard skills={skills} />
      <AcademicCard university={university} major={major} />
      <BioCard bio={bio} />
    </div>
  );
};

export default ProfileSection;
