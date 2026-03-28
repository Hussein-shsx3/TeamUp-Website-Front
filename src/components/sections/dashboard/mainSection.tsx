import { MOCK_USER } from "@/mock/Dashboard";

import UserCard from "./shared/UserCard";
import TeamProjectCard from "./withTeam/TeamProjectCard";
import MilestoneRoadmap from "./withTeam/MilestoneRoadmap";
import UpcomingTasks from "./withTeam/UpcomingTasks";
import RecentActivity from "./withTeam/RecentActivity";
import NoTeamBanner from "./withoutTeam/NoTeamBanner";
import RecommendedProjects from "./withoutTeam/RecommendedProjects";

const MainSection = () => {
  const { hasTeam } = MOCK_USER;

  /* ── WITH TEAM ── */
  if (hasTeam) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column — project + bottom row */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <TeamProjectCard />

          {/* Bottom row: milestone / tasks / activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MilestoneRoadmap />
            <UpcomingTasks />
            <RecentActivity />
          </div>
        </div>

        {/* Right column — user card */}
        <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <UserCard />
        </div>
      </div>
    );
  }

  /* ── WITHOUT TEAM ── */
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left column — banner + recommended */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <NoTeamBanner />
        <RecommendedProjects />
      </div>

      {/* Right column — user card with progress */}
      <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
        <UserCard showProgress />
      </div>
    </div>
  );
};

export default MainSection;
