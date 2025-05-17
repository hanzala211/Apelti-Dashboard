import { useMutation, useQuery } from '@tanstack/react-query';
import { TeamService } from '@services';

// Types for team requests
export interface MemberRequestData {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export interface UpdateMemberRequestData {
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

// Mutations
export const useAddMemberMutation = () => {
  return useMutation({
    mutationFn: async (data: MemberRequestData) => {
      const response = await TeamService.addMember(data);
      return response.data.data;
    },
  });
};

export const useDeleteMemberMutation = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await TeamService.deleteMember(userId);
      return response.data.data;
    },
  });
};

export const useUpdateMemberMutation = () => {
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: UpdateMemberRequestData }) => {
      const response = await TeamService.updateMember(userId, data);
      return response.data.data;
    },
  });
};

// Queries
export const useGetMembersQuery = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const response = await TeamService.getMember();
      return response.data.data.users;
    },
  });
};
