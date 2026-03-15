import Image from "next/image";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Input, PasswordInput, SubmitButton } from "@/components/ui/forms";

interface UniversityLoginStepProps {
  onSubmit: (universityId: string, password: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const UniversityLoginStep = ({
  onSubmit,
  onBack,
  isLoading = false,
}: UniversityLoginStepProps) => {
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(universityId, password);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {/* University header — real logo image (475x137) */}
      <div className="relative w-full h-[137px] mb-2">
        <Image
          src="/images/logo 1.svg"
          alt="Al-Azhar University - Gaza"
          fill
          unoptimized
          quality={100}
          className="object-contain object-left"
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Form fields */}
      <div className="w-full flex flex-col gap-4 mb-5">
        <Input
          id="university-id"
          name="universityId"
          type="text"
          label="University ID"
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          placeholder="Enter your Student or Staff ID"
        />

        <PasswordInput
          id="uni-password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter Password"
        />
      </div>

      {/* Submit */}
      <SubmitButton
        label={isLoading ? "Logging in…" : "Login"}
        onClick={handleSubmit}
        disabled={isLoading || !universityId || !password}
      />

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-primary text-xs text-content-light mt-5
          hover:text-primary transition-colors duration-150 self-start"
        aria-label="Back"
      >
        <ChevronLeft size={14} aria-hidden="true" className="text-content-light" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default UniversityLoginStep;
