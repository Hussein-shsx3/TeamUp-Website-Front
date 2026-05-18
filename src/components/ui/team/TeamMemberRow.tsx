import Image from "next/image";

export interface TeamMemberRowProps {
  name: string;
  role: string;
  avatarSrc: string;
  /** Right-side slot (kebab menu, admin actions, or view-only link). */
  trailing?: React.ReactNode;
  className?: string;
}

const TeamMemberRow = ({
  name,
  role,
  avatarSrc,
  trailing,
  className = "",
}: TeamMemberRowProps) => {
  return (
    <div
      className={`flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0 ${className}`.trim()}
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
        <Image
          src={avatarSrc || "/images/user.png"}
          alt=""
          fill
          unoptimized
          className="object-cover"
          sizes="40px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-primary text-sm font-medium text-content">{name}</p>
        <p className="truncate font-primary text-xs text-content-light">{role}</p>
      </div>
      {trailing != null ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
};

export default TeamMemberRow;
