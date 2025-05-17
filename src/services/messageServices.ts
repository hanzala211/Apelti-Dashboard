import { sendRequest } from "@helpers";

export const getMessages = () => sendRequest({
  method: "GET",
  url: "/invoice-message/company",
  isAuthIncluded: true
});

export const getComment = (page: number, limit: number, messageId: string) => sendRequest({
  method: "GET",
  url: `/invoice-message/${messageId}?page=${page}&limit=${limit}`,
  isAuthIncluded: true
});

export const postComment = (data: unknown, messageId: string) => sendRequest({
  method: "POST",
  url: `/invoice-message/comment/${messageId}`,
  data,
  isAuthIncluded: true
});
