import Image from "next/image";
import { MOCK_USER } from "@/mock/Dashboard";
import { ProgressBar } from "@/components/ui/feedback";
import { LinkButton } from "@/components/ui/buttons";

interface UserCardProps {
  showProgress?: boolean;
}

const UserCard = ({ showProgress = false }: UserCardProps) => {
  return (
    <div
      className="hidden lg:flex bg-white rounded-xl border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] px-6 pt-10 pb-8 flex-col items-center gap-4"
    >
      {/* Avatar */}
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden 
        ring-2 ring-primary flex-shrink-0"
      >
        <Image
          src="/images/user.jpg"
          alt={MOCK_USER.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Name + role */}
      <div className="text-center">
        <p className="font-primary text-base font-semibold text-content-light leading-tight">
          {MOCK_USER.name}
        </p>
        <p className="font-primary text-xs text-content-light mt-0.5">
          {MOCK_USER.role}
        </p>
      </div>

      {/* Profile completion — no-team view */}
      {showProgress && (
        <div className="w-full flex flex-col gap-1.5">
          <p className="font-primary text-xs font-semibold text-primary leading-snug">
            Your profile is {MOCK_USER.profileCompletion}% complete!
          </p>
          <p className="font-primary text-[11px] text-content-light leading-snug">
            Add your skills to get noticed by top teams!
          </p>
          <ProgressBar value={MOCK_USER.profileCompletion} className="mt-0.5" />
        </div>
      )}

      {/* Skills — with-team view */}
      {!showProgress && (
        <div className="w-full flex flex-col gap-2 mt-3">
          <p className="font-primary text-sm text-content">
            My Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MOCK_USER.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-[0.3rem] bg-primary-light
                  font-primary text-xs text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Edit profile */}
      <LinkButton
        href="/dashboard/profile"
        variant="secondary"
        size="md"
        className="w-full mt-auto"
      >
        Edit Profile
      </LinkButton>
    </div>
  );
};

export default UserCard;
