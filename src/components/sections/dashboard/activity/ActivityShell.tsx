import ActivitySidebar from "./ActivitySidebar";

interface ActivityShellProps {
  children: React.ReactNode;
}

const ActivityShell = ({ children }: ActivityShellProps) => {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white
        shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl"
    >
      <div className="flex min-h-0 flex-col md:min-h-[28rem] md:flex-row md:items-stretch">
        <ActivitySidebar />
        <div className="min-h-0 min-w-0 flex-1 md:flex md:flex-col">{children}</div>
      </div>
    </div>
  );
};

export default ActivityShell;
