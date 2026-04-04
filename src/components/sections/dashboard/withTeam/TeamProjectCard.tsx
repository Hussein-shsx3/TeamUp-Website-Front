import { MOCK_PROJECT } from "@/mock/Dashboard";
import { MentorProjectCard } from "@/components/ui/cards";

const TeamProjectCard = () => {
  return (
    <MentorProjectCard
      variant="supervise"
      project={{
        id: 0,
        name: MOCK_PROJECT.name,
        supervisor: MOCK_PROJECT.supervisor,
        status: MOCK_PROJECT.status,
        completion: MOCK_PROJECT.completion,
        image: "/images/Team.jpg",
        members: MOCK_PROJECT.teamMembers,
        extraMembers: MOCK_PROJECT.extraMembers,
        workspaceHref: "/dashboard/workspace",
      }}
    />
  );
};

export default TeamProjectCard;
