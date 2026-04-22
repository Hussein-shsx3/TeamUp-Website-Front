import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  RevokeTokensPayload,
  SignUpPayload,
  TokenPayload,
} from "@/types/auth";

export const authQueryKeys = {
  session: ["auth", "session"] as const,
};

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authService.forgotPassword(payload),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
  });

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (payload?: TokenPayload) => authService.refreshToken(payload),
  });

export const useRevokeTokens = () =>
  useMutation({
    mutationFn: (payload: RevokeTokensPayload) => authService.revokeTokens(payload),
  });

export const useValidateToken = (payload?: TokenPayload, enabled = false) =>
  useQuery({
    queryKey: authQueryKeys.session,
    queryFn: () => authService.validateToken(payload),
    enabled,
  });