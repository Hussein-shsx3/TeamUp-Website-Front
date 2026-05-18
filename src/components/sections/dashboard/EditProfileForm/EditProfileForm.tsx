"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import Textarea from "@/components/ui/forms/Textarea";
import TagInput from "@/components/ui/forms/TagInput";
import { Button, IconButton, LinkButton } from "@/components/ui/buttons";
import {
  useUpdateCurrentUser,
  useUpdateCurrentUserProfilePicture,
} from "@/hooks/useUser";
import {
  useColleges,
  useDepartments,
  useUniversities,
} from "@/hooks/useInstitution";

const sectionCard = "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";

export interface EditProfileFormProps {
  initialName: string;
  initialRole: string;
  initialUniversityId: string;
  initialCollegeId: string;
  initialDepartmentId: string;
  initialMajor: string;
  initialSkills: string[];
  initialBio: string;
  initialAvatar: string;
  actionsAlign?: "start" | "end";
  cancelHref: string;
  isMentor?: boolean;
}

const EditProfileForm = ({
  initialName,
  initialRole,
  initialUniversityId,
  initialCollegeId,
  initialDepartmentId,
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
  const [universityId, setUniversityId] = useState(initialUniversityId);
  const [collegeId, setCollegeId] = useState(initialCollegeId);
  const [departmentId, setDepartmentId] = useState(initialDepartmentId);
  const [major, setMajor] = useState(initialMajor);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [bio, setBio] = useState(initialBio);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatar);
  const [saveError, setSaveError] = useState("");
  const updateCurrentUser = useUpdateCurrentUser();
  const updateCurrentUserProfilePicture = useUpdateCurrentUserProfilePicture();
  const queryClient = useQueryClient();
  const router = useRouter();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const universitiesQuery = useUniversities();
  const collegesQuery = useColleges(universityId);
  const departmentsQuery = useDepartments(collegeId);

  const universityOptions = useMemo(
    () =>
      universitiesQuery.data?.universities.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [universitiesQuery.data],
  );

  const collegeOptions = useMemo(
    () =>
      collegesQuery.data?.colleges.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [collegesQuery.data],
  );

  const departmentOptions = useMemo(
    () =>
      departmentsQuery.data?.departments.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [departmentsQuery.data],
  );

  useEffect(() => {
    setName(initialName);
    setRole(initialRole);
    setUniversityId(initialUniversityId);
    setCollegeId(initialCollegeId);
    setDepartmentId(initialDepartmentId);
    setMajor(initialMajor);
    setSkills(initialSkills);
    setBio(initialBio);
    setAvatarPreview(initialAvatar);
    setSelectedAvatar(null);
  }, [
    initialName,
    initialRole,
    initialUniversityId,
    initialCollegeId,
    initialDepartmentId,
    initialMajor,
    initialSkills,
    initialBio,
    initialAvatar,
  ]);

  useEffect(() => {
    if (!selectedAvatar) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  const handleAvatarButtonClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedAvatar(null);
      setAvatarPreview(initialAvatar);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select an image file.");
      event.target.value = "";
      return;
    }

    setSaveError("");
    setSelectedAvatar(file);
  };

  const handleUniversityChange = (value: string) => {
    setUniversityId(value);
    setCollegeId("");
    setDepartmentId("");
  };

  const handleCollegeChange = (value: string) => {
    setCollegeId(value);
    setDepartmentId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setSaveError("Name is required.");
      return;
    }

    const nameParts = trimmedName.split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ");

    setSaveError("");

    try {
      await updateCurrentUser.mutateAsync({
        firstName,
        ...(lastName ? { lastName } : {}),
        bio: bio.trim() || null,
        major: major.trim() || null,
        skills,
        universityId: universityId || null,
        collegeId: collegeId || null,
        departmentId: departmentId || null,
      });

      if (selectedAvatar) {
        const formData = new FormData();
        formData.append("profilePicture", selectedAvatar);

        await updateCurrentUserProfilePicture.mutateAsync(formData);
      }

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.replace(cancelHref);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to save profile changes.";

      setSaveError(message);
    }
  };

  const isSaving =
    updateCurrentUser.isPending || updateCurrentUserProfilePicture.isPending;

  const actionsJustify = actionsAlign === "end" ? "justify-end" : "justify-start";

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex shrink-0 justify-center lg:justify-start">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36">
            <div className={`relative h-full w-full overflow-hidden rounded-full ring-2 ${isMentor ? "ring-primary" : "ring-primary"}`}>
              <Image
                src={avatarPreview || "/images/user.png"}
                alt={`${name} — profile photo`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 144px, 176px"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <IconButton
              type="button"
              aria-label="Change profile photo"
              variant="primary"
              size="sm"
              className="absolute bottom-0 right-0 !rounded-full shadow-md ring-2 "
              onClick={handleAvatarButtonClick}
            >
              <Camera aria-hidden="true" className="size-4" />
            </IconButton>
            <p className="mt-2 text-center font-primary text-xs text-content-muted lg:text-left">
              JPG, PNG, or WEBP up to 2 MB.
            </p>
          </div>
        </div>

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
              <Select
                id="profile-university"
                label="University"
                options={[
                  {
                    value: "",
                    label: universitiesQuery.isLoading ? "Loading universities..." : "Select your university",
                  },
                  ...universityOptions,
                ]}
                value={universityId}
                onChange={(e) => handleUniversityChange(e.target.value)}
              />
              <Select
                id="profile-college"
                label="College"
                options={[
                  {
                    value: "",
                    label: universityId ? (collegesQuery.isLoading ? "Loading colleges..." : "Select your college") : "Choose university first",
                  },
                  ...collegeOptions,
                ]}
                value={collegeId}
                onChange={(e) => handleCollegeChange(e.target.value)}
                disabled={!universityId}
              />
              <Select
                id="profile-department"
                label="Department"
                options={[
                  {
                    value: "",
                    label: collegeId ? (departmentsQuery.isLoading ? "Loading departments..." : "Select your department") : "Choose college first",
                  },
                  ...departmentOptions,
                ]}
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                disabled={!collegeId}
              />
              <Input
                id="profile-major"
                name="major"
                label={isMentor ? "Academic title" : "Major"}
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
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
            <Button type="submit" variant="primary" size="md" className="min-w-[100px]" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <LinkButton href={cancelHref} variant="secondary" size="md" className="min-w-[100px]">
              Cancel
            </LinkButton>
          </div>

          {saveError ? <p className="font-primary text-sm text-error">{saveError}</p> : null}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;