import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeamUp — Auth",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;
