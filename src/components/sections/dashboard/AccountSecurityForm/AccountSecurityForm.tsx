"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import { Button, LinkButton } from "@/components/ui/buttons";
import { ChangePasswordModal } from "@/components/ui/modals";
import { Heading } from "@/components/ui/typography";
import {
  MOCK_ACCOUNT_SECURITY,
  PROFILE_VISIBILITY_OPTIONS,
} from "@/mock/Dashboard";

const sectionCard =
  "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

const sectionHeadingClassName =
  "mb-4 font-primary font-semibold text-content !text-base sm:!text-lg !leading-snug";

interface AccountSecurityFormProps {
  cancelHref?: string;
}

const AccountSecurityForm = ({
  cancelHref = "/dashboard/settings/profile",
}: AccountSecurityFormProps) => {
  const [studentId, setStudentId] = useState(MOCK_ACCOUNT_SECURITY.studentId);
  const [password, setPassword] = useState(MOCK_ACCOUNT_SECURITY.password);
  const [email, setEmail] = useState(MOCK_ACCOUNT_SECURITY.email);
  const [visibility, setVisibility] = useState<string>(
    MOCK_ACCOUNT_SECURITY.profileVisibility,
  );
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("save account & security (mock)", {
      studentId,
      password,
      email,
      visibility,
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      <section aria-labelledby="account-university-heading">
        <Heading
          level="h3"
          id="account-university-heading"
          className={sectionHeadingClassName}
        >
          University account data
        </Heading>
        <div className="space-y-4">
          <div className={sectionCard}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <Input
                id="account-student-id"
                name="studentId"
                label="ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                autoComplete="username"
              />
              <Input
                id="account-password"
                name="password"
                label="Password"
                type="text"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={sectionCard}>
            <Input
              id="account-email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="account-privacy-heading">
        <Heading
          level="h3"
          id="account-privacy-heading"
          className={sectionHeadingClassName}
        >
          Privacy
        </Heading>
        <div className={sectionCard}>
          <p className="mb-4 font-primary text-sm font-semibold text-content">
            Who can see my profile?
          </p>
          <Select
            id="account-profile-visibility"
            name="profileVisibility"
            options={PROFILE_VISIBILITY_OPTIONS}
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            aria-label="Who can see my profile"
          />
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-7">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 self-start font-primary text-sm font-medium
            text-primary transition-colors hover:text-primary-dark hover:underline"
          onClick={() => setChangePasswordOpen(true)}
        >
          <Lock size={16} aria-hidden="true" className="shrink-0" />
          Change Password
        </button>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="primary" size="md" className="min-w-[100px]">
            Save
          </Button>
          <LinkButton href={cancelHref} variant="secondary" size="md" className="min-w-[100px]">
            Cancel
          </LinkButton>
        </div>
      </div>
    </form>

    <ChangePasswordModal
      isOpen={changePasswordOpen}
      onClose={() => setChangePasswordOpen(false)}
    />
    </>
  );
};

export default AccountSecurityForm;
