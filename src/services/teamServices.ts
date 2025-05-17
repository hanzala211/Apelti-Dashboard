import { sendRequest } from '@helpers';

export const addMember = (data: unknown) =>
  sendRequest({
    url: '/company/user',
    data,
    isAuthIncluded: true,
    method: 'POST',
  });

export const getMember = () =>
  sendRequest({
    url: '/company/users',
    isAuthIncluded: true,
    method: 'GET',
  });

export const deleteMember = (userId: string) =>
  sendRequest({
    url: `/company/user/${userId}`,
    isAuthIncluded: true,
    method: 'DELETE',
  });

export const updateMember = (userId: string, data: unknown) =>
  sendRequest({
    url: `/company/user/${userId}`,
    isAuthIncluded: true,
    data,
    method: 'PUT',
  });
