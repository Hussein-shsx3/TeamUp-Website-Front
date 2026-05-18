import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/navigation";
import {
  ActivityShell,
  ActivityToolbar,
} from "@/components/sections/dashboard";
import ActivitySavedView from "@/components/sections/dashboard/activity/ActivitySavedView";

export const metadata: Metadata = {
  title: "TeamUp — My Saved Projects",
};

const ActivitySavedPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "My activity" },
        ]}
      />
      <ActivityShell>
        <div className="flex min-h-0 flex-col p-4 sm:p-6 md:p-8">
          <ActivityToolbar />
          <ActivitySavedView />
        </div>
      </ActivityShell>
    </div>
  );
};

export default ActivitySavedPage;