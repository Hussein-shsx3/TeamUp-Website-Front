import type { Metadata } from "next";
import { ReportsManagementView } from "@/components/sections/admin/reports";

export const metadata: Metadata = {
  title: "TeamUp — Admin Reports",
};

export default function AdminReportsPage() {
  return <ReportsManagementView />;
}