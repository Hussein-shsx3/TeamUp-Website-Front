"use client";

import { User, Shield, Bell } from "lucide-react";
import {
  DashboardSidebarNav,
  DeleteAccountButton,
} from "@/components/ui/navigation";
import { SETTINGS_NAV_LINKS } from "@/mock/Dashboard";

const navIcon = {
  profile: User,
  account: Shield,
  notifications: Bell,
} as const;

const items = SETTINGS_NAV_LINKS.map((link) => ({
  id: link.id,
  href: link.href,
  label: link.label,
  icon: navIcon[link.id],
}));

const SettingsSidebar = () => {
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
