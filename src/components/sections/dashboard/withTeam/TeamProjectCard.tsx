import Image from "next/image";
import { MOCK_PROJECT, TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";
import { ProgressBar } from "@/components/ui/feedback";
import { LinkButton } from "@/components/ui/buttons";

const TeamProjectCard = () => {
  const { name, supervisor, status, completion, teamMembers, extraMembers } =
    MOCK_PROJECT;

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Project image */}
      <div className="relative w-full h-60">
        <Image
          src="/images/Team.jpg"
          alt="Project workspace"
          fill
          unoptimized
          className="object-cover "
        />
        {/* Status badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full
          bg-white font-primary text-xs font-medium text-primary
          shadow-sm border border-primary/20"
        >
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-4">
        {/* Name + supervisor + member avatars */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-primary text-base font-semibold text-content leading-tight">
              {name}
            </p>
            <p className="font-primary text-xs text-content-light mt-0.5">
              Supervisor by {supervisor}
            </p>
          </div>

          {/* Stacked avatars */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="relative w-7 h-7 rounded-full overflow-hidden
                    ring-2 ring-white flex-shrink-0"
                >
                  <Image
                    src="/images/user.jpg"
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {extraMembers > 0 && (
              <span
                className="ml-1 w-7 h-7 rounded-full bg-primary
                flex items-center justify-center
                font-primary text-[10px] font-bold text-white
                ring-2 ring-white flex-shrink-0"
              >
                +{extraMembers}
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="font-primary text-xs text-content-light">
              Project Completion
            </p>
            <p className="font-primary text-xs font-semibold text-content">
              {completion}%
            </p>
          </div>
          <ProgressBar value={completion} />
        </div>

        {/* CTA */}
        <LinkButton
          href={TEAM_WORKSPACE_HREF}
          variant="primary"
          size="md"
          className="w-fit"
          prefetch
        >
          Go to project workspace
        </LinkButton>
      </div>
    </div>
  );
};

export default TeamProjectCard;
