import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/navigation";
import FindTeamSection from "@/components/sections/dashboard/findTeam/FindTeamSection";

export const metadata: Metadata = {
  title: "TeamUp — Find a Team",
};

const FindTeamPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Find a team" },
        ]}
      />
      <FindTeamSection />
    </div>
  );
};

export default FindTeamPage;
