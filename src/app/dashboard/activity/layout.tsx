import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TeamUp — My activity",
};

const ActivityLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default ActivityLayout;
