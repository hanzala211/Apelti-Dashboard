import { Input } from '@components';
import { ProfileFormValues } from '@types';
import { RefObject } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface ProfileSettingNameEmailFormProps {
  handleSubmit: UseFormHandleSubmit<ProfileFormValues>;
  register: UseFormRegister<FieldValues>;
  onSubmitName: SubmitHandler<ProfileFormValues>;
  errors: {
    firstName?: FieldError;
    lastName?: FieldError;
    email?: FieldError;
  };
  inputRef: RefObject<HTMLInputElement | null>;
}

export const ProfileSettingNameEmailForm: React.FC<
  ProfileSettingNameEmailFormProps
> = ({ handleSubmit, onSubmitName, register, errors, inputRef }) => {
  return (
    <form onSubmit={handleSubmit(onSubmitName)} className="flex flex-col gap-4">
      <div className="py-4 gap-2 w-full">
        <div className="flex gap-2 items-center w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              register={register('firstName')}
              error={errors.firstName?.message}
              label="First Name"
            />
            <Input
              type="text"
              register={register('lastName')}
              error={errors.lastName?.message}
              label="Last Name"
            />
            <Input
              type="email"
              register={register('email')}
              error={errors.email?.message}
              label="Email"
            />
            <input type="submit" className="hidden" ref={inputRef} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileSettingNameEmailForm;
