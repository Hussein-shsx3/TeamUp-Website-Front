import type { ReactNode } from "react";
import { Heading } from "@/components/ui/typography";

interface WorkspaceCardProps {
  title: string;
  /** Optional right side of the header row */
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

const shell =
  "flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]";

const WorkspaceCard = ({
  title,
  headerRight,
  children,
  className = "",
  bodyClassName = "",
}: WorkspaceCardProps) => {
  return (
    <section className={`${shell} ${className}`.trim()}>
      <div className="flex items-center justify-between gap-2">
        <Heading level="h6" className="font-semibold text-content">
          {title}
        </Heading>
        {headerRight}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
};

export default WorkspaceCard;
