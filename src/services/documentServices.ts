import { sendRequest } from "@helpers";

export const documentServices = {
  getDocuments: () => sendRequest({
    method: "GET",
    url: "/invoice/file-details",
    isAuthIncluded: true,
  })
};

