import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/navigation";
import { TeamWorkspaceView } from "@/components/sections/dashboard";
import { MOCK_USER, resolveWorkspaceView } from "@/mock";

export const metadata: Metadata = {
  title: "TeamUp — Team Work Space",
};

export default async function TeamWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const sp = await searchParams;
  const view = resolveWorkspaceView(MOCK_USER.userRole, sp.view);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Team Work Space" },
        ]}
      />
      <TeamWorkspaceView view={view} />
    </div>
  );
}
