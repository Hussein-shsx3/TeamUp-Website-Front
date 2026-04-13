import type { Metadata } from "next";
import { AdminSettingsView } from "@/components/sections/admin/settings";

export const metadata: Metadata = {
  title: "TeamUp — Admin System Settings",
};

export default function AdminSettingsSystemPage() {
  return <AdminSettingsView activeTab="system" />;
}