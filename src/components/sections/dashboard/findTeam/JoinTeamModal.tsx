"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/modals/Modal";
import { Button } from "@/components/ui/buttons";
import { Select, TagInput, Input, Textarea } from "@/components/ui/forms";
import { FIND_TEAM_ROLE_OPTIONS } from "@/mock/FindTeam";
import { Heading } from "@/components/ui/typography";
import { useCreateJoinRequest } from "@/hooks/useJoinRequest";
import { teamService } from "@/services/team.service";

export interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectId?: string;
  teamId?: string;
}

const JoinTeamModal = ({
  isOpen,
  onClose,
  projectName,
  teamId,
  projectId,
}: JoinTeamModalProps) => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [teamLookupError, setTeamLookupError] = useState("");
  const [isResolvingTeam, setIsResolvingTeam] = useState(false);
  const createJoinRequest = useCreateJoinRequest();

  const isSubmitting = createJoinRequest.isPending;

  /* Reset form when modal closes */
  useEffect(() => {
    if (!isOpen) {
      setRole("");
      setSkills([]);
      setPortfolio("");
      setCoverLetter("");
      setTeamLookupError("");
      setIsResolvingTeam(false);
      createJoinRequest.reset();
    }
  }, [isOpen]);

  const handleSend = async () => {
    setTeamLookupError("");

    let finalTeamId = teamId;

    try {
      if (!finalTeamId && projectId) {
        setIsResolvingTeam(true);
        const teamsResponse = await teamService.getTeams({ projectId });
        finalTeamId = teamsResponse.teams?.[0]?.id ?? "";
      }

      if (!finalTeamId) {
        setTeamLookupError("No joinable team is available for this project yet.");
        return;
      }

      const submittedCoverLetter = [
        coverLetter.trim(),
        role ? `Preferred role: ${role}` : "",
        skills.length > 0 ? `Skills: ${skills.join(", ")}` : "",
        portfolio ? `Portfolio: ${portfolio}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      await createJoinRequest.mutateAsync({
        teamId: finalTeamId,
        coverLetter: submittedCoverLetter || undefined,
      });

      onClose();
    } catch (error) {
      setTeamLookupError(
        error instanceof Error && error.message
          ? error.message
          : "Could not submit the join request.",
      );
    } finally {
      setIsResolvingTeam(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-2xl p-6 sm:p-8"
    >
      <div className="flex flex-col">
        {/* Header */}
        <Heading level="h4" className="pr-10 font-primary font-semibold leading-tight text-content">
          Join Team: [{projectName}]
        </Heading>
        <p className="mt-1 font-primary text-sm text-content-light">
          Tell the team Admin why you are the ideal member for this project.
        </p>

        {/* Fields */}
        <div className="mt-6 flex flex-col gap-4">
          <Select
            id="join-role"
            label="Select Role"
            options={FIND_TEAM_ROLE_OPTIONS}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <TagInput
            id="join-skills"
            label="Top Skills"
            value={skills}
            onChange={setSkills}
            placeholder="Add skill…"
            variant="bordered"
          />

          <Input
            id="join-portfolio"
            name="portfolio"
            label="Portfolio/GitHub Link"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder=""
          />

          <Textarea
            id="join-cover-letter"
            name="coverLetter"
            label="Cover Letter"
            rows={5}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder=""
          />

          {teamLookupError ? (
            <p className="font-primary text-sm text-red-600">
              {teamLookupError}
            </p>
          ) : null}

          {createJoinRequest.error ? (
            <p className="font-primary text-sm text-red-600">
              {(createJoinRequest.error as Error).message}
            </p>
          ) : null}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1 justify-center"
            onClick={handleSend}
            isLoading={isSubmitting || isResolvingTeam}
            loadingLabel={isResolvingTeam ? "Loading team..." : "Sending..."}
          >
            Send Request
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="flex-1 justify-center"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default JoinTeamModal;
