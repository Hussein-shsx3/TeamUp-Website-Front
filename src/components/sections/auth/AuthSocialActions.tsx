"use client";

import { OrDivider, SocialButton, SubmitButton } from "@/components/ui/forms";
import UniversityButton from "./UniversityButton";

interface AuthSocialActionsProps {
  submitLabel: string;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showUniversityButton?: boolean;
  onUniversityClick?: () => void;
  containerClassName?: string;
  socialGridClassName?: string;
}

const AuthSocialActions = ({
  submitLabel,
  onSubmit,
  showUniversityButton = false,
  onUniversityClick,
  containerClassName = "mt-5",
  socialGridClassName = "",
}: AuthSocialActionsProps) => {
  return (
    <div className={`flex flex-col gap-4 ${containerClassName}`.trim()}>
      <SubmitButton label={submitLabel} onClick={onSubmit} />

      {showUniversityButton && (
        <>
          <OrDivider />
          <UniversityButton onClick={onUniversityClick} />
          <div
            className={`grid grid-cols-2 gap-3 ${socialGridClassName}`.trim()}
          >
            <SocialButton label="Google" />
            <SocialButton label="LinkedIn" />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSocialActions;
