"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import Input from "@/components/ui/forms/Input";
import Textarea from "@/components/ui/forms/Textarea";
import TagInput from "@/components/ui/forms/TagInput";
import { Button, IconButton, LinkButton } from "@/components/ui/buttons";

const sectionCard =
  "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

export interface EditProfileFormProps {
  initialName: string;
  initialRole: string;
  initialUniversity: string;
  initialMajor: string;
  initialSkills: string[];
  initialBio: string;
  initialAvatar: string;
  /** Save / Cancel row alignment in the form column. */
  actionsAlign?: "start" | "end";
  cancelHref: string;
  isMentor?: boolean;
}

const EditProfileForm = ({
  initialName,
  initialRole,
  initialUniversity,
  initialMajor,
  initialSkills,
  initialBio,
  initialAvatar,
  actionsAlign = "end",
  cancelHref,
  isMentor = false,
}: EditProfileFormProps) => {
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);
  const [university, setUniversity] = useState(initialUniversity);
  const [major, setMajor] = useState(initialMajor);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [bio, setBio] = useState(initialBio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("save profile (mock)", {
      name,
      role,
      university,
      major,
      skills,
      bio,
    });
  };

  const actionsJustify =
    actionsAlign === "end" ? "justify-end" : "justify-start";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-1 flex-col"
      noValidate
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Avatar — left column only */}
        <div className="flex shrink-0 justify-center lg:justify-start">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36">
            <div
              className={`relative h-full w-full overflow-hidden rounded-full ring-2 ${
                isMentor ? "ring-primary" : "ring-primary"
              }`}
            >
              <Image
                src={initialAvatar || "/images/user.jpg"}
                alt={`${name} — profile photo`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 144px, 176px"
                className="object-cover"
              />
            </div>
            <IconButton
              type="button"
              aria-label="Change profile photo"
              variant="primary"
              size="sm"
              className="absolute bottom-0 right-0 !rounded-full shadow-md ring-2 "
            >
              <Camera aria-hidden="true" className="size-4" />
            </IconButton>
          </div>
        </div>

        {/* Form column — bordered sections + actions stay in this column only (not under avatar) */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className={sectionCard}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <Input
                id="profile-name"
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              {!isMentor && (
                <Input
                  id="profile-role"
                  name="role"
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className={sectionCard}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {isMentor ? (
                <div className="col-span-1 md:col-span-2">
                  <Input
                    id="profile-major"
                    name="major"
                    label="Academic title"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <Input
                    id="profile-university"
                    name="university"
                    label="University"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                  <Input
                    id="profile-major"
                    name="major"
                    label="Major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </>
              )}
            </div>
          </div>

          <div className={sectionCard}>
            <TagInput
              id="profile-skills-input"
              label="My Skills"
              value={skills}
              onChange={setSkills}
              placeholder="Add a skill…"
              variant="minimal"
            />
          </div>

          <div className={sectionCard}>
            <Textarea
              id="profile-bio"
              name="bio"
              label="Bio"
              variant="plain"
              rows={6}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[140px]"
            />
          </div>

          <div className={`flex flex-wrap gap-3 pt-1 ${actionsJustify}`}>
            <Button type="submit" variant="primary" size="md" className="min-w-[100px]">
              Save
            </Button>
            <LinkButton href={cancelHref} variant="secondary" size="md" className="min-w-[100px]">
              Cancel
            </LinkButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
