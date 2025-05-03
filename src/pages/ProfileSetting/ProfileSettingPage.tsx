import {
  DraggableModal,
  DropDown,
  ErrorMessage,
  Input,
  Select,
  SettingPageHeading,
} from '@components';
import { useAuth, useSetting } from '@context';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormValues, profileSchema } from '@types';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProfileSettingEditButton from './components/ProfileSettingEditButton';
import ProfileSettingButtons from './components/ProfileSettingButtons';
import { ICONS } from '@constants';
import { IconButton } from './components/IconButton';
import { MenuProps } from 'antd';
import ProfileSettingNameEmailForm from './components/ProfileSettingNameEmailForm';

export const ProfileSettingPage: React.FC = () => {
  const { userData } = useAuth();
  const { changePassword, errorMessage, changeUserData } = useSetting();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isEditingRole, setIsEditingRole] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    control,
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    shouldUnregister: false,
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      role: userData?.role || '',
    },
  });

  useEffect(() => {
    clearErrors();
    setValue('firstName', userData?.firstName || '');
    setValue('lastName', userData?.lastName || '');
    setValue('email', userData?.email || '');
  }, [
    clearErrors,
    setValue,
    userData,
    isEditingPassword,
    isEditingRole,
    isModalOpen,
  ]);

  const onSubmitName: SubmitHandler<ProfileFormValues> = (data) => {
    setIsModalOpen(false);
    changeUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    reset();
  };

  const onSubmitPassword: SubmitHandler<ProfileFormValues> = (data) => {
    const { oldPassword, newPassword } = data;
    setIsEditingPassword(false);
    changePassword({ currentPassword: oldPassword, newPassword });
    reset();
  };

  const onSubmitRole: SubmitHandler<ProfileFormValues> = (data) => {
    const { role } = data;
    console.log('Role Data:', { role });
    setIsEditingRole(false);
    reset();
  };

  const handleEdit = () => {
    if (inputRef.current !== null) inputRef.current.click();
  };

  const resetForm = () => {
    reset();
  };

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Clerk', value: 'clerk' },
    { label: 'Approver', value: 'Approver' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Payer', value: 'payer' },
  ];

  const items: MenuProps['items'] = [
    {
      label: (
        <IconButton
          className="w-full rounded-none shadow-none"
          label="OVERVIEW"
          icon={ICONS.overview_box}
        />
      ),
      key: '0',
    },
    {
      label: (
        <IconButton
          className="w-full rounded-none shadow-none"
          label="TEAMS"
          icon={ICONS.settings_team}
        />
      ),
      key: '1',
    },
    {
      label: (
        <IconButton
          className="w-full rounded-none shadow-none"
          label="PROJECTS"
          icon={ICONS.setting_project}
        />
      ),
      key: '2',
    },
  ];

  return (
    <section className="w-screen md:max-w-[calc(100vw-256px)] overflow-auto h-[100dvh] md:max-h-[calc(100dvh-300px)]">
      <div className="w-full relative lg:h-[45%] md:h-[35%] h-[25%]">
        <div className="absolute w-full h-full bg-profile-settings bg-no-repeat bg-cover -z-10" />
        <div className="w-full bg-gradient-to-b rounded-xl from-basicWhite/90 to-basicWhite absolute -bottom-10 h-[5rem] p-5 flex items-center justify-between">
          <div className="flex md:gap-6 gap-2 items-center">
            <div className="relative">
              <div
                className={`w-14 h-14 relative rounded-full bg-grayTxt flex items-center justify-center font-bold text-basicWhite`}
              >
                {userData?.firstName[0].toUpperCase()}
                {userData?.lastName[0].toUpperCase()}
                <div className="absolute bottom-2 w-1/3 h-1/3 right-2">
                  <ProfileSettingEditButton
                    handleClick={() => setIsModalOpen(true)}
                    size={15}
                  />
                  <DraggableModal
                    handleOk={handleEdit}
                    modalItems={
                      <ProfileSettingNameEmailForm
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        inputRef={inputRef}
                        onSubmitName={onSubmitName}
                      />
                    }
                    heading="Profile Settings"
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    okText="Edit"
                    onReset={resetForm}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-semibold md:text-[18px] text-[14px]`}>
                {userData?.firstName} {userData?.lastName}
              </span>
              <span className={`text-neutralGray md:text-[14px] text-[12px]`}>
                {userData?.email}
              </span>
            </div>
          </div>
          <div className="lg:flex hidden gap-3 items-center">
            <IconButton
              className="hover:bg-paleGray transition-all duration-200"
              label="OVERVIEW"
              icon={ICONS.overview_box}
            />
            <IconButton
              className="hover:bg-paleGray transition-all duration-200"
              label="TEAMS"
              icon={ICONS.settings_team}
            />
            <IconButton
              className="hover:bg-paleGray transition-all duration-200"
              label="PROJECTS"
              icon={ICONS.setting_project}
            />
          </div>
          <div className="lg:hidden block">
            <DropDown
              items={items}
              label={
                <button>
                  <ICONS.menu />
                </button>
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full xl:max-w-[55%] max-w-[95%] bg-basicWhite mx-auto h-fit rounded-3xl md:p-8 p-5 flex mt-14 text-left flex-col">
        <form
          onSubmit={handleSubmit(onSubmitPassword)}
          className="flex flex-col gap-4"
        >
          <div className="border-b-[1px] pt-4 pb-8 flex md:items-start items-end justify-between gap-2 w-full border-neutralGray">
            <div className="grid xl:grid-cols-[0.5fr_2fr] grid-cols-1 gap-5 items-center">
              <SettingPageHeading label="Password" />
              <div className="flex gap-2 items-center">
                {!isEditingPassword ? (
                  <p className='m-0'>***********</p>
                ) : (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <Input
                      type="password"
                      register={register('oldPassword')}
                      error={errors.oldPassword?.message}
                      placeholder="Old Password"
                    />
                    <Input
                      type="password"
                      register={register('newPassword')}
                      error={errors.newPassword?.message}
                      placeholder="New Password"
                    />
                  </div>
                )}
              </div>
            </div>
            {!isEditingPassword ? (
              <ProfileSettingEditButton
                handleClick={() => setIsEditingPassword(true)}
              />
            ) : (
              <ProfileSettingButtons
                handleCancel={() => setIsEditingPassword(false)}
              />
            )}
          </div>
        </form>

        <form
          onSubmit={handleSubmit(onSubmitRole)}
          className="flex flex-col gap-4"
        >
          <div className="pt-8 pb-4 flex items-end md:items-start justify-between gap-2 w-full">
            <div className="grid lg:grid-cols-[0.5fr_2fr] grid-cols-1 gap-5 items-center">
              <SettingPageHeading label="Approval" />
              <div className="flex gap-2 items-center">
                {!isEditingRole ? (
                  <p className="text-neutralGray m-0 text-[14px]">
                    Role: {userData?.role[0].toUpperCase()}
                    {userData?.role.slice(1)}
                  </p>
                ) : (
                  <Select<ProfileFormValues>
                    control={control}
                    name="role"
                    data={roles}
                  />
                )}
              </div>
            </div>
            {!isEditingRole ? (
              <ProfileSettingEditButton
                handleClick={() => setIsEditingRole(true)}
              />
            ) : (
              <ProfileSettingButtons
                handleCancel={() => setIsEditingRole(false)}
              />
            )}
          </div>
        </form>
        <ErrorMessage error={errorMessage} />
      </div>
    </section>
  );
};

export default ProfileSettingPage;
