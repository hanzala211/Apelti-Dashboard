import { useMutation, useQuery } from '@tanstack/react-query';
import { MessageService } from '@services';

// Types
export interface CommentRequestData {
  comment: string;
  [key: string]: unknown;
}

export interface GetCommentsParams {
  messageId: string;
  page: number;
}

// Mutations
export const usePostCommentMutation = () => {
  return useMutation({
    mutationFn: async ({ data, messageId }: { data: CommentRequestData; messageId: string }) => {
      const response = await MessageService.postComment(data, messageId);
      return response.data.data;
    },
  });
};

// Queries
export const useGetMessagesQuery = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await MessageService.getMessages();
      return response.data.data;
    },
  });
};

export const useGetCommentsQuery = (params: GetCommentsParams) => {
  return useQuery({
    queryKey: ['comments', params.messageId, params.page],
    queryFn: async () => {
      const response = await MessageService.getComment(params.page, 3, params.messageId);
      return response.data.data.comments;
    },
    enabled: !!params.messageId, // Only run query if messageId is provided
  });
};
