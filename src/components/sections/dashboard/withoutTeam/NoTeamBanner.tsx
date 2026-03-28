import { Heading } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/buttons";

const NoTeamBanner = () => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-3">
        <Heading level="h6" className="font-medium text-content">
          Your dream project is just one team away
        </Heading>
        <p className="font-primary text-sm text-content-light leading-relaxed max-w-2xl">
          You haven&apos;t joined a team yet. Browse available projects or start
          your own to unlock your full dashboard features.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <LinkButton
          href="/dashboard/find-team"
          variant="primary"
          size="md"
          className="flex-1"
        >
          Find a Team
        </LinkButton>
        <LinkButton
          href="/dashboard/create-project"
          variant="secondary"
          size="md"
          className="flex-1"
        >
          Create Project
        </LinkButton>
      </div>
    </div>
  );
};

export default NoTeamBanner;
