import { useQuery } from "@tanstack/react-query";
import { DocumentService } from "@services";

export const useGetDocumentsQuery = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const response = await DocumentService.getDocuments();
      return response.data.data;
    },
  });
};
