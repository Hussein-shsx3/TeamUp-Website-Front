import { DeleteAccountButton } from "@/components/ui/navigation";
import SettingsSidebar from "./SettingsSidebar";

interface SettingsShellProps {
  children: React.ReactNode;
}

const SettingsShell = ({ children }: SettingsShellProps) => {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white
        shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl"
    >
      <div className="flex min-h-0 flex-col md:min-h-[28rem] md:flex-row md:items-stretch">
        <SettingsSidebar />
        <div className="min-h-0 min-w-0 flex-1 md:flex md:flex-col">{children}</div>
      </div>
      {/* Mobile: destructive action at end of card so it stays discoverable after scrolling */}
      <div className="border-t border-gray-100 md:hidden">
        <div className="p-4 sm:p-5">
          <DeleteAccountButton variant="banner" />
        </div>
      </div>
    </div>
  );
};

export default SettingsShell;
