import ProfileHeader from "./ProfileHeader";
import SkillsCard from "./SkillsCard";
import AcademicCard from "./AcademicCard";
import BioCard from "./BioCard";
import ProjectsStats from "./ProjectsStats";
import MentorAreaCard from "./MentorAreaCard";
import MentorAcademicCard from "./MentorAcademicCard";

interface ProfileSectionProps {
  name: string;
  displayRole: string;
  avatar: string;
  skills: string[];
  university: string;
  major: string;
  bio: string;
  isOwnProfile?: boolean;
  activeProjectsCount?: number;
  completedProjectsCount?: number;
  nonOwnActionLabel?: string;
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
  activeProjectsCount,
  completedProjectsCount,
  nonOwnActionLabel,
}: ProfileSectionProps) => {
  const isMentor = displayRole?.toLowerCase() === "mentor";
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white
        shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl p-4 md:p-8"
    >
      <ProfileHeader
        name={name}
        displayRole={displayRole}
        avatar={avatar}
        isOwnProfile={isOwnProfile}
        nonOwnActionLabel={nonOwnActionLabel}
      />
      {isMentor ? (
        <>
          <MentorAreaCard skills={skills} />
          <MentorAcademicCard title={major /* using 'major' as academic title in mock */} />
        </>
      ) : (
        <>
          <SkillsCard skills={skills} />
          <AcademicCard university={university} major={major} />
        </>
      )}
      <BioCard bio={bio} />
      {typeof activeProjectsCount === "number" && typeof completedProjectsCount === "number" && (
        // render the projects stats only when numbers are provided
        // keeps student profile unchanged
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ProjectsStats activeCount={activeProjectsCount} completedCount={completedProjectsCount} />
      )}
    </div>
  );
};

export default ProfileSection;
