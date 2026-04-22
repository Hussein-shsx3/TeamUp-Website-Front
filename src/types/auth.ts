export type UserRole = "STUDENT" | "MENTOR" | "GRADUATE" | "SYSTEM_ADMIN";

export type RegistrationMethod =
  | "EMAIL"
  | "UNIVERSITY_API"
  | "GOOGLE"
  | "LINKEDIN";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  lastLogin: string | null;
}

export interface AuthTokenResponse {
  success: boolean;
  message: string;
  token: string;
  verificationToken?: string;
  user: AuthUser;
}

export interface ValidateTokenResponse {
  success: boolean;
  valid: boolean;
  user?: AuthUser;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordResponse extends MessageResponse {
  resetToken?: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Exclude<UserRole, "SYSTEM_ADMIN">;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenPayload {
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface RevokeTokensPayload {
  userId: string;
}