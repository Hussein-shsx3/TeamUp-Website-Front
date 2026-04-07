"use client";

import { User, Shield, Bell } from "lucide-react";
import {
  DashboardSidebarNav,
  DeleteAccountButton,
} from "@/components/ui/navigation";
import { SETTINGS_NAV_LINKS, MOCK_USER } from "@/mock/Dashboard";

const navIcon = {
  profile: User,
  account: Shield,
  notifications: Bell,
} as const;

const SettingsSidebar = () => {
  const isMentor = MOCK_USER.userRole === "mentor";
  
  const items = SETTINGS_NAV_LINKS(isMentor).map((link) => ({
    id: link.id,
    href: link.href,
    label: link.id === "profile" ? MOCK_USER.name : link.label,
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
