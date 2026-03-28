import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "TeamUp — Dashboard",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
