import { sendRequest } from '@helpers';

export const authService = {
  signup: (data: unknown) =>
    sendRequest({
      data,
      url: '/user/signup',
      isAuthIncluded: false,
      method: 'POST',
    }),
  login: (data: unknown) =>
    sendRequest({
      data,
      url: '/user/login',
      isAuthIncluded: false,
      method: 'POST',
    }),
  me: () =>
    sendRequest({
      url: '/user/me',
      isAuthIncluded: true,
      method: 'GET',
    }),
  forgotPassword: (data: unknown) =>
    sendRequest({
      data,
      url: '/user/forgot-password',
      isAuthIncluded: false,
      method: 'POST',
    }),
  resetPassword: (data: unknown) =>
    sendRequest({
      data,
      url: '/user/reset-password',
      isAuthIncluded: false,
      method: 'POST',
    }),
};
