import type { Metadata } from "next";
import { MentorDashboard } from "@/components/pages";

export const metadata: Metadata = {
  title: "TeamUp — Mentor Dashboard",
};

const Page = () => <MentorDashboard />;

export default Page;