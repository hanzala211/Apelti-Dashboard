import { sendRequest } from '@helpers';

export const signup = (data: unknown) =>
  sendRequest({
    data,
    url: '/user/signup',
    isAuthIncluded: false,
    method: 'POST',
  });

export const login = (data: unknown) =>
  sendRequest({
    data,
    url: '/user/login',
    isAuthIncluded: false,
    method: 'POST',
  });

export const me = () =>
  sendRequest({
    url: '/user/me',
    isAuthIncluded: true,
    method: 'GET',
  });

export const forgotPassword = (data: unknown) =>
  sendRequest({
    data,
    url: '/user/forgot-password',
    isAuthIncluded: false,
    method: 'POST',
  });

export const resetPassword = (data: unknown) =>
  sendRequest({
    data,
    url: '/user/reset-password',
    isAuthIncluded: false,
    method: 'POST',
  });
