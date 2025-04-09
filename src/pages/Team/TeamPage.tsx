import { PageHeading } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMemberForm, AddMemberFormSchema, IUser } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TeamForm } from './components/TeamForm';
import { useAuth, useTeam } from '@context';
import { APP_ACTIONS, PERMISSIONS, ROUTES } from '@constants';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TeamTable } from './components/TeamTable';

export const TeamPage: React.FC = () => {
  const { userData } = useAuth();
  const { addMember, deleteMember, editingUser, updateUser, getMembers } =
    useTeam();
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
  const { data: teamMembers, isLoading: isTeamLoading } = useQuery<
    IUser[] | null
  >({
    queryKey: ['teamMembers'],
    queryFn: () => getMembers(),
  });
  const addUserMutation = useMutation({
    mutationFn: (sendData: unknown) => addMember(sendData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['teamMembers'],
      });
      reset();
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: (params: { userId: string; data: unknown }) =>
      updateUser(params.userId, params.data),
    onSuccess: (updatedUser, params) => {
      queryClient.setQueryData<IUser[]>(['teamMembers'], (oldData) =>
        oldData
          ? [
            ...oldData.filter((item) => item._id !== params.userId),
            updatedUser as IUser,
          ]
          : [updatedUser as IUser]
      );
      reset();
    },
  });
  const deleteUserMutation = useMutation({
    mutationFn: (params: { userId: string }) => deleteMember(params.userId),
    onSuccess: (_, params) => {
      queryClient.setQueryData<IUser[]>(['teamMembers'], (oldData) =>
        oldData ? oldData.filter((item) => item._id !== params.userId) : []
      );
    },
  });

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

  const onSubmit: SubmitHandler<AddMemberFormSchema> = (data) => {
    console.log('Form Data:', data);
    if (editingUser === null) {
      addUserMutation.mutate(data);
    } else {
      updateUserMutation.mutate({ userId: editingUser._id, data });
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
              ? updateUserMutation.isPending
              : addUserMutation.isPending
          }
        />
      )}
      <TeamTable
        deleteUserMutation={deleteUserMutation}
        isTeamLoading={isTeamLoading}
        teamMembers={teamMembers}
      />
    </section>
  );
};

export default TeamPage;
