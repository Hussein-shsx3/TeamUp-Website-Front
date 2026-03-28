"use client";

import { Bookmark, FolderOpen } from "lucide-react";
import { DashboardSidebarNav } from "@/components/ui/navigation";
import { ACTIVITY_NAV_LINKS } from "@/mock/Activity";

const navIcon = {
  saved: Bookmark,
  purchases: FolderOpen,
} as const;

const items = ACTIVITY_NAV_LINKS.map((link) => ({
  id: link.id,
  href: link.href,
  label: link.label,
  icon: navIcon[link.id],
}));

const ActivitySidebar = () => {
  return (
    <DashboardSidebarNav
      aria-label="My activity sections"
      items={items}
      className="md:min-h-[28rem]"
    />
  );
};

export default ActivitySidebar;
