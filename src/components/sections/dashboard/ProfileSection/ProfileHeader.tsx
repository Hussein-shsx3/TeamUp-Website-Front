import Image from "next/image";
import { Send, Pencil, Settings } from "lucide-react";
import { Button, IconLink, LinkButton } from "@/components/ui/buttons";

interface ProfileHeaderProps {
  name: string;
  displayRole: string;
  avatar: string;
  isOwnProfile: boolean;
  nonOwnActionLabel?: string;
}

const ProfileHeader = ({
  name,
  displayRole,
  avatar,
  isOwnProfile,
  nonOwnActionLabel,
}: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4 pb-6 sm:gap-5 sm:pb-8">
      {/* Actions — full-width row so nothing overlaps avatar on narrow screens */}
      <div className="flex w-full min-w-0 flex-wrap items-center justify-end gap-2">
        {isOwnProfile ? (
          <>
            <IconLink
              href="/dashboard/settings/profile"
              aria-label="Settings"
              variant="ghost"
              size="md"
              className="text-content-muted hover:text-primary"
            >
              <Settings aria-hidden="true" />
            </IconLink>
            <LinkButton
              href="/dashboard/profile/edit"
              variant="secondary"
              size="md"
              className="gap-1.5"
            >
              <Pencil size={14} aria-hidden="true" />
              Edit
            </LinkButton>
          </>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="md"
            className="max-sm:w-full gap-2 justify-center shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
          >
            <Send size={14} aria-hidden="true" />
            {nonOwnActionLabel ?? "Invitation"}
          </Button>
        )}
      </div>

      {/* Avatar */}
      <div
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-primary
          sm:h-28 sm:w-28 md:h-32 md:w-32"
      >
        <Image
          src={"/images/user.jpg"}
          alt={name}
          fill
          unoptimized
          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
          className="object-cover"
        />
      </div>

      {/* Name + role */}
      <div className="w-full max-w-full px-0 text-center sm:px-2">
        <p className="break-words font-primary text-lg font-semibold leading-tight text-content sm:text-xl">
          {name}
        </p>
        <p className="mt-1 font-primary text-xs text-content-light sm:text-sm">
          {displayRole}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
