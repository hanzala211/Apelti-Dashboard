import { sendRequest } from "@helpers";

export const getDocuments = () =>
  sendRequest({
    method: "GET",
    url: "/invoice/file-details",
    isAuthIncluded: true,
  });
