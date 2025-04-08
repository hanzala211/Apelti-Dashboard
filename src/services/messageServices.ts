import { sendRequest } from "@helpers";

export const messageServices = {
  getMessages: () => sendRequest({
    method: "GET",
    url: "/invoice-message/company",
    isAuthIncluded: true
  }),
  getComment: (page: number, limit: number, messageId: string) => sendRequest({
    method: "GET",
    url: `/invoice-message/${messageId}?page=${page}&limit=${limit}`,
    isAuthIncluded: true
  }),
  postComment: (data: unknown, messageId: string) => sendRequest({
    method: "POST",
    url: `/invoice-message/comment/${messageId}`,
    data,
    isAuthIncluded: true
  })
}