import type { UserRole } from "@/types/auth";

export const DEFAULT_AVATAR_SRC = "/images/user.png";

export const getAvatarSrc = (avatarSrc?: string | null) => {
  return avatarSrc?.trim() || DEFAULT_AVATAR_SRC;
};

export const getDisplayRole = (role?: UserRole | string | null) => {
  switch (role?.toUpperCase()) {
    case "MENTOR":
      return "Mentor";
    case "GRADUATE":
      return "Graduate";
    case "SYSTEM_ADMIN":
      return "Admin";
    case "STUDENT":
      return "Student";
    default:
      return "User";
  }
};

export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
) => {
  return [firstName, lastName].filter(Boolean).join(" ").trim();
};
