import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@services";

// Types for the auth requests
export interface SignupRequestData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export interface LoginRequestData {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface ForgotPasswordRequestData {
  email: string;
  [key: string]: unknown;
}

export interface ResetPasswordRequestData {
  email: string;
  forgotPasswordCode: string;
  newPassword: string;
}

// Mutations
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: SignupRequestData) => {
      const response = await AuthService.signup(data);
      return response.data.data;
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginRequestData) => {
      const response = await AuthService.login(data);
      return response.data.data;
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequestData) => {
      const response = await AuthService.forgotPassword(data);
      return response.data.data;
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequestData) => {
      const response = await AuthService.resetPassword(data);
      return response.data.data;
    },
  });
};
