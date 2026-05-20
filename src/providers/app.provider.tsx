"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initLenis, initAnchorScrolling, destroyLenis } from "@/lib/lenis";
import { initAOS } from "@/lib/aos";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const pathname = usePathname();
  const shouldUseLenis =
    !pathname.startsWith("/dashboard") && !pathname.startsWith("/admin");

  useEffect(() => {
    initAOS();
  }, []);

  useEffect(() => {
    if (!shouldUseLenis) {
      destroyLenis();
      return;
    }

    initLenis();
    const cleanupAnchors = initAnchorScrolling();

    return () => {
      cleanupAnchors();
      destroyLenis();
    };
  }, [shouldUseLenis]);

  return <>{children}</>;
};

export default AppProvider;