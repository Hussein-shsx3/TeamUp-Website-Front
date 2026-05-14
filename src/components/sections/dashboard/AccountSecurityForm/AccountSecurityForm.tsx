"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/ui/buttons";
import { ChangePasswordModal } from "@/components/ui/modals";
import { Heading } from "@/components/ui/typography";

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
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col" aria-labelledby="account-security-heading">
        <section>
          <Heading
            level="h3"
            id="account-security-heading"
            className={sectionHeadingClassName}
          >
            Change Password
          </Heading>
          <div className={sectionCard}>
            <p className="font-primary text-sm leading-relaxed text-content-light">
              Keep your account secure by updating your password whenever needed.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-7">
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="min-w-[100px]"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change Password
            </Button>
            <LinkButton
              href={cancelHref}
              variant="secondary"
              size="md"
              className="min-w-[100px]"
            >
              Cancel
            </LinkButton>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
};

export default AccountSecurityForm;
