import { PageHeading } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMemberForm, AddMemberFormSchema, IUser } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TeamForm } from './components/TeamForm';
import { useAuth, useTeam } from '@context';
import { APP_ACTIONS, PERMISSIONS, ROUTES } from '@constants';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TeamTable } from './components/TeamTable';
import { useAddMemberMutation, useDeleteMemberMutation, useGetMembersQuery, useUpdateMemberMutation } from '@api';
import { toast } from '@helpers';

export const TeamPage: React.FC = () => {
  const { userData } = useAuth();
  const { editingUser, setEditingUser, setErrorMessage } = useTeam();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberForm),
    defaultValues: {
      role: 'clerk',
    },
  });

  const { data: teamMembers, isLoading: isTeamLoading } = useGetMembersQuery();

  // Filter out the current user from the team members list
  const filteredTeamMembers = teamMembers?.filter(
    (member: IUser) => member._id !== userData?._id
  );

  const addMemberMutation = useAddMemberMutation();
  const updateMemberMutation = useUpdateMemberMutation();
  const deleteMemberMutation = useDeleteMemberMutation();

  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    if (editingUser !== null) {
      reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        role: editingUser.role,
        phone: editingUser.phone,
        email: editingUser.email,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        role: 'clerk',
        phone: '',
        email: '',
        password: '',
      });
    }
  }, [editingUser, reset]);

  // Handle success and error for add member mutation
  useEffect(() => {
    if (addMemberMutation.status === "success") {
      toast.success('Operation Successful', 'The new user has been successfully registered in the system.');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      reset();
    } else if (addMemberMutation.status === "error") {
      setErrorMessage(addMemberMutation.error?.message || "An error occurred while adding a member");
    }
  }, [addMemberMutation.status]);

  // Handle success and error for update member mutation
  useEffect(() => {
    if (updateMemberMutation.status === "success") {
      toast.success('Operation Successful', 'The user has been successfully updated.');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      setEditingUser(null);
      reset();
    } else if (updateMemberMutation.status === "error") {
      setErrorMessage(updateMemberMutation.error?.message || "An error occurred while updating a member");
    }
  }, [updateMemberMutation.status]);

  // Handle success and error for delete member mutation
  useEffect(() => {
    if (deleteMemberMutation.status === "success") {
      toast.success('Operation Successful', 'The user has been successfully deleted.');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    } else if (deleteMemberMutation.status === "error") {
      toast.error("Error", deleteMemberMutation.error?.message || "An error occurred while deleting a member");
    }
  }, [deleteMemberMutation.status]);

  const onSubmit: SubmitHandler<AddMemberFormSchema> = (data) => {
    console.log('Form Data:', data);
    if (editingUser === null) {
      addMemberMutation.mutate(data);
    } else {
      updateMemberMutation.mutate({ userId: editingUser._id, data });
    }
  };

  if (!userPermissions.includes(APP_ACTIONS.teamPage))
    return <Navigate to={ROUTES.not_available} />;

  return (
    <section className="md:py-9 md:px-14 px-4 pt-20 w-screen md:max-w-[calc(100vw-256px)] h-[100dvh] md:max-h-[calc(100dvh-50px)] max-h-[calc(100dvh-20px)] overflow-y-auto">
      <div className="pb-4 mb-8 border-b-[1px] border-neutralGray">
        <PageHeading label="Team" />
        <p className="text-neutralGray text-sm mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>
      {userPermissions.includes(APP_ACTIONS.addTeam) && (
        <TeamForm
          register={register}
          errors={errors}
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          isAddingMember={
            editingUser
              ? updateMemberMutation.isPending
              : addMemberMutation.isPending
          }
        />
      )}
      <TeamTable
        deleteUserMutation={deleteMemberMutation}
        isTeamLoading={isTeamLoading}
        teamMembers={filteredTeamMembers}
      />
    </section>
  );
};

export default TeamPage;
