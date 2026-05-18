"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Input, PasswordInput } from "@/components/ui/forms";
import Select from "@/components/ui/forms/Select";
import { Heading } from "@/components/ui/typography";
import {
  AuthSocialActions,
  AuthSwitchPrompt,
  AuthErrorBanner,
} from "@/components/sections/auth";
import { useSignUp } from "@/hooks/useAuth";
import {
  useColleges,
  useDepartments,
  useUniversities,
} from "@/hooks/useInstitution";
import { getApiErrorMessage } from "@/lib/apiError";

/* ── Static data ── */
type Role = "Student" | "Graduate" | "Mentor";

const ROLES: Role[] = ["Student", "Graduate", "Mentor"];

const SKILLS_OPTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX",
  "Flutter",
  "Machine Learning",
  "DevOps",
  "Java",
];

interface SignUpFormProps {
  onSwitchToSignIn?: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState<Role>("Student");
  const [universityId, setUniversityId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [major, setMajor] = useState("");
  // Start with an empty skills list; avoid duplicate initial values
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const signUpMutation = useSignUp();

  const universitiesQuery = useUniversities();
  const collegesQuery = useColleges(universityId);
  const departmentsQuery = useDepartments(collegeId);

  const universityOptions = useMemo(
    () => universitiesQuery.data?.universities.map((item) => ({ value: item.id, label: item.name })) ?? [],
    [universitiesQuery.data],
  );

  const collegeOptions = useMemo(
    () => collegesQuery.data?.colleges.map((item) => ({ value: item.id, label: item.name })) ?? [],
    [collegesQuery.data],
  );

  const departmentOptions = useMemo(
    () => departmentsQuery.data?.departments.map((item) => ({ value: item.id, label: item.name })) ?? [],
    [departmentsQuery.data],
  );

  useEffect(() => {
    setCollegeId("");
    setDepartmentId("");
  }, [universityId]);

  useEffect(() => {
    setDepartmentId("");
  }, [collegeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addSkill = (skill: string) => {
    const normalized = skill.trim().replace(/\s+/g, " ");
    if (
      normalized &&
      !skills.some(
        (existing) => existing.toLowerCase() === normalized.toLowerCase(),
      )
    ) {
      setSkills((prev) => [...prev, normalized]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!agreed) {
      setErrorMessage("You must accept the terms before creating an account.");
      return;
    }

    const trimmedFullName = form.fullName.trim();
    const nameParts = trimmedFullName.split(/\s+/).filter(Boolean);

    if (nameParts.length < 2) {
      setErrorMessage("Please enter your first and last name.");
      return;
    }

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    const username = form.email.trim().split("@")[0] || trimmedFullName.replace(/\s+/g, ".").toLowerCase();

    if (!universityId || !collegeId || !departmentId) {
      setErrorMessage("Please select your university, college, and department.");
      return;
    }

    if (skills.length === 0) {
      setErrorMessage("Please add at least one skill.");
      return;
    }

    try {
      const response = await signUpMutation.mutateAsync({
        username,
        email: form.email.trim(),
        password: form.password,
        firstName,
        lastName,
        role: role.toUpperCase() as "STUDENT" | "MENTOR" | "GRADUATE",
        universityId,
        collegeId,
        departmentId,
        major: major.trim() || null,
        skills,
      });

      setSuccessMessage(response.message);
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setRole("Student");
      setUniversityId("");
      setCollegeId("");
      setDepartmentId("");
      setMajor("");
      setSkills([]);
      setSkillInput("");
      setAgreed(false);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Failed to create account."),
      );
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-5">
          <AuthErrorBanner
            message={errorMessage}
            variant="error"
            onClose={() => setErrorMessage("")}
          />
        </div>
      )}

      {successMessage && (
        <div className="mb-5">
          <AuthErrorBanner
            message={successMessage}
            variant="success"
            onClose={() => setSuccessMessage("")}
          />
        </div>
      )}

      <Heading
        level="h3"
        className="font-semibold text-primary text-center mb-5"
      >
        Create your Account
      </Heading>

      <div className="flex flex-col gap-4 mt-4">
        {/* Name + Email */}
        <Input
          id="signup-fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={form.fullName}
          onChange={handleChange}
          placeholder="enter your Name"
        />
        <Input
          id="signup-email"
          name="email"
          type="email"
          label="Email Address"
          value={form.email}
          onChange={handleChange}
          placeholder="enter your email"
        />

        {/* Password row */}
        <div className="grid grid-cols-2 gap-3">
          <PasswordInput
            id="signup-password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            placeholder="enter Password"
          />
          <PasswordInput
            id="signup-confirm"
            name="confirmPassword"
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="enter Password"
          />
        </div>

        {/* Role selector */}
        <div className="flex flex-col gap-2">
          <label className="font-primary text-sm text-content-light font-medium">
            I am A :
          </label>
          <div className="flex items-center gap-6">
            {ROLES.map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 cursor-pointer font-primary text-sm text-content-light"
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="sr-only"
                />
                <span
                  className={`relative w-4 h-4 rounded-full border bg-white transition-colors duration-150 ${
                    role === r ? "border-primary" : "border-primary/60"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary
                      -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ${
                        role === r ? "scale-100" : "scale-0"
                      }`}
                  />
                </span>
                {r}
              </label>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4">
          <Select
            id="signup-university"
            label="University"
            options={[
              {
                value: "",
                label: universitiesQuery.isLoading ? "Loading universities..." : "Select",
              },
              ...universityOptions,
            ]}
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
          />

          <Select
            id="signup-college"
            label="College"
            options={[
              {
                value: "",
                label: universityId
                  ? collegesQuery.isLoading
                    ? "Loading colleges..."
                    : "Select"
                  : "Choose university first",
              },
              ...collegeOptions,
            ]}
            value={collegeId}
            onChange={(e) => setCollegeId(e.target.value)}
            disabled={!universityId}
          />

          <Select
            id="signup-department"
            label="Department"
            options={[
              {
                value: "",
                label: collegeId
                  ? departmentsQuery.isLoading
                    ? "Loading departments..."
                    : "Select"
                  : "Choose college first",
              },
              ...departmentOptions,
            ]}
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            disabled={!collegeId}
          />

          <Input
            id="signup-major"
            name="major"
            type="text"
            label="Major of study"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Optional for now"
          />

          {/* Skills tag input */}
          <div className="flex flex-col gap-2">
            <label className="font-primary text-sm text-content-light font-medium">
              Skills
            </label>
            <div
              className="min-h-[48px] w-full px-3 py-2 rounded-lg border border-gray-200
                flex flex-wrap gap-2 items-center
                focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10
                transition-all duration-200"
            >
              {skills.map((skill, idx) => (
                <div
                  key={`${skill}-${idx}`}
                  className="flex items-center gap-1"
                >
                  <span
                    className="flex items-center gap-1 px-3 py-2 rounded-md bg-primary text-white
                      text-sm leading-none font-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-white/90 hover:text-white transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                  {idx < skills.length - 1 && (
                    <span className="text-content text-sm">,</span>
                  )}
                </div>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill(skillInput);
                  } else if (
                    e.key === "Backspace" &&
                    !skillInput &&
                    skills.length
                  ) {
                    removeSkill(skills[skills.length - 1]);
                  }
                }}
                placeholder={
                  skills.length === 0 ? "Type a skill and press Enter" : ""
                }
                className="flex-1 min-w-[80px] outline-none text-sm font-primary
                  text-content placeholder:text-content-muted bg-transparent"
              />
            </div>

            {/* Suggestions */}
            {skillInput.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {SKILLS_OPTIONS.filter(
                  (s) =>
                    s.toLowerCase().includes(skillInput.toLowerCase()) &&
                    !skills.includes(s),
                ).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s)}
                    className="px-3 py-1 text-xs font-primary border border-gray-200
                        rounded-full text-content hover:border-primary hover:text-primary
                        transition-all duration-150"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer group mb-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-3 md:w-4 h-3 md:h-4 accent-primary flex-shrink-0"
          />
          <span className="font-primary text-xs md:text-sm text-content-light leading-snug">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      <AuthSocialActions
        submitLabel={signUpMutation.isPending ? "Creating..." : "Create Account"}
        onSubmit={handleSubmit}
        submitDisabled={signUpMutation.isPending}
      />
      <AuthSwitchPrompt
        promptText="Already have an account?"
        actionText="Sign IN"
        onAction={onSwitchToSignIn}
      />
    </>
  );
};

export default SignUpForm;
