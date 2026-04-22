import api, {
  clearStoredAuthToken,
  setStoredAuthToken,
} from "@/lib/axios";
import type {
  AuthTokenResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  MessageResponse,
  ResetPasswordPayload,
  RevokeTokensPayload,
  SignUpPayload,
  TokenPayload,
  ValidateTokenResponse,
} from "@/types/auth";

const AUTH_BASE_PATH = "/auth";

const persistToken = (token: string) => {
  setStoredAuthToken(token);
};

const clearToken = () => {
  clearStoredAuthToken();
};

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthTokenResponse>(
      `${AUTH_BASE_PATH}/login`,
      payload,
    );

    persistToken(data.token);
    return data;
  },

  async signUp(payload: SignUpPayload) {
    const { data } = await api.post<AuthTokenResponse>(
      `${AUTH_BASE_PATH}/signup`,
      payload,
    );

    persistToken(data.token);
    return data;
  },

  async verifyEmail(payload: TokenPayload) {
    const { data } = await api.post<MessageResponse>(
      `${AUTH_BASE_PATH}/verify-email`,
      payload,
    );

    return data;
  },

  async refreshToken(payload?: TokenPayload) {
    const { data } = await api.post<AuthTokenResponse>(
      `${AUTH_BASE_PATH}/refresh-token`,
      payload ?? {},
    );

    persistToken(data.token);
    return data;
  },

  async validateToken(payload?: TokenPayload) {
    const { data } = await api.post<ValidateTokenResponse>(
      `${AUTH_BASE_PATH}/validate-token`,
      payload ?? {},
    );

    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload) {
    const { data } = await api.post<ForgotPasswordResponse>(
      `${AUTH_BASE_PATH}/forgot-password`,
      payload,
    );

    return data;
  },

  async resetPassword(payload: ResetPasswordPayload) {
    const { data } = await api.post<AuthTokenResponse>(
      `${AUTH_BASE_PATH}/reset-password`,
      payload,
    );

    persistToken(data.token);
    return data;
  },

  async changePassword(payload: ChangePasswordPayload) {
    const { data } = await api.post<AuthTokenResponse>(
      `${AUTH_BASE_PATH}/change-password`,
      payload,
    );

    persistToken(data.token);
    return data;
  },

  async revokeTokens(payload: RevokeTokensPayload) {
    const { data } = await api.post<MessageResponse>(
      `${AUTH_BASE_PATH}/revoke-tokens`,
      payload,
    );

    clearToken();
    return data;
  },

  clearToken,
};