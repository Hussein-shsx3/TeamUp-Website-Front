"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { Input, PasswordInput } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";
import {
  AuthSocialActions,
  AuthSwitchPrompt,
} from "@/components/sections/auth";

/* ── Static data ── */
type Role = "Student" | "Graduate" | "Mentor";

const ROLES: Role[] = ["Student", "Graduate", "Mentor"];

const UNIVERSITIES = [
  "Islamic University of Gaza",
  "Al-Azhar University - Gaza",
  "Al-Aqsa University",
  "University College of Applied Sciences (UCAS)",
  "Gaza University",
  "Palestine Technical College - Deir al-Balah",
  "Al-Quds Open University - Gaza Branch",
];

const MAJORS = [
  "Computer Science",
  "Computer Engineering",
  "Information Technology",
  "Software Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Architecture",
  "Business Administration",
  "Accounting",
  "Finance and Banking",
  "Medicine",
  "Dentistry",
  "Pharmacy",
  "Nursing",
  "English Language and Literature",
  "Arabic Language and Literature",
  "Law",
  "Media and Communication",
  "Education",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Agriculture",
];

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
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  // Start with an empty skills list; avoid duplicate initial values
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [agreed, setAgreed] = useState(false);

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ ...form, role, university, major, skills, agreed });
  };

  return (
    <>
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
          {/* University dropdown */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-university"
              className="font-primary text-sm text-content-light font-medium"
            >
              University
            </label>
            <div className="relative">
              <select
                id="signup-university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200
                  text-sm font-primary text-content bg-white
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                  transition-all duration-200"
              >
                <option value="" disabled>
                  Select
                </option>
                {UNIVERSITIES.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none"
              />
            </div>
          </div>

          {/* Major dropdown */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-major"
              className="font-primary text-sm text-content-light font-medium"
            >
              Major of study
            </label>
            <div className="relative">
              <select
                id="signup-major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200
                  text-sm font-primary text-content bg-white
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                  transition-all duration-200"
              >
                <option value="" disabled>
                  Select
                </option>
                {MAJORS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none"
              />
            </div>
          </div>

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

      <AuthSocialActions submitLabel="Create Account" onSubmit={handleSubmit} />
      <AuthSwitchPrompt
        promptText="Already have an account?"
        actionText="Sign IN"
        onAction={onSwitchToSignIn}
      />
    </>
  );
};

export default SignUpForm;
