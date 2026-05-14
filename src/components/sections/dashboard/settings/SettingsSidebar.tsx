"use client";

import { User, Shield, Bell } from "lucide-react";
import {
  DashboardSidebarNav,
  DeleteAccountButton,
} from "@/components/ui/navigation";
import { SETTINGS_NAV_LINKS } from "@/mock/Dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { getDisplayRole, getFullName } from "@/lib/user";

const navIcon = {
  profile: User,
  account: Shield,
  notifications: Bell,
} as const;

const SettingsSidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const displayUser = currentUser?.user ?? null;
  const isMentor = getDisplayRole(displayUser?.role) === "Mentor";
  const profileLabel =
    getFullName(displayUser?.firstName, displayUser?.lastName) ||
    displayUser?.username ||
    "Profile";

  const items = SETTINGS_NAV_LINKS(isMentor).map((link) => ({
    id: link.id,
    href: link.href,
    label: link.id === "profile" ? profileLabel : link.label,
    icon: navIcon[link.id],
  }));

  return (
    <DashboardSidebarNav
      aria-label="Settings sections"
      items={items}
      className="md:min-h-[28rem]"
      footer={<DeleteAccountButton />}
    />
  );
};

export default SettingsSidebar;
