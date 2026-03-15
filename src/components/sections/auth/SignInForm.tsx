"use client";

import { useState } from "react";
import { Input, PasswordInput } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";
import AuthSocialActions from "./AuthSocialActions";
import AuthSwitchPrompt from "./AuthSwitchPrompt";

interface SignInFormProps {
  onSwitchToSignUp?: () => void;
  onUniversityClick?: () => void;
  onForgotPasswordClick?: () => void;
}

const SignInForm = ({
  onSwitchToSignUp,
  onUniversityClick,
  onForgotPasswordClick,
}: SignInFormProps) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <Heading
        level="h3"
        className="font-semibold text-primary text-center mb-5 md:mb-14"
      >
        Login to Team up !
      </Heading>

      <div className="flex flex-col gap-5 mt-4">
        <Input
          id="signin-email"
          name="email"
          type="email"
          label="Email Address"
          value={form.email}
          onChange={handleChange}
          placeholder="enter your email"
        />
        <div className="flex flex-col gap-1">
          <PasswordInput
            id="signin-password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            placeholder="enter Password"
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="font-primary text-xs text-red-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Forgot password"
            >
              Forget password?
            </button>
          </div>
        </div>
      </div>

      <AuthSocialActions
        submitLabel="Login"
        onSubmit={handleSubmit}
        showUniversityButton
        onUniversityClick={onUniversityClick}
        containerClassName="mt-10"
        socialGridClassName="mt-5"
      />

      <AuthSwitchPrompt
        promptText={"Don't have an account?"}
        actionText="Sign UP"
        onAction={onSwitchToSignUp}
      />
    </>
  );
};

export default SignInForm;
