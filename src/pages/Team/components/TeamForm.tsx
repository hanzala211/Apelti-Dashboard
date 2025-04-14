import { ErrorMessage, Input, PhoneNumberInput, Select } from '@components';
import { useTeam } from '@context';
import { AddMemberFormSchema } from '@types';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

interface TeamFormProps {
  register: UseFormRegister<AddMemberFormSchema>;
  control: Control<AddMemberFormSchema>;
  errors: FieldErrors<AddMemberFormSchema>;
  onSubmit: () => void;
  isAddingMember: boolean;
}

export const TeamForm: React.FC<TeamFormProps> = ({
  register,
  control,
  errors,
  onSubmit,
  isAddingMember,
}) => {
  const { editingUser, setEditingUser, errorMessage } = useTeam();

  const roles = [
    { label: 'Clerk', value: 'clerk' },
    { label: 'Payer', value: 'payer' },
    { label: 'Accountant', value: 'accountant' },
    { label: 'Approver', value: 'approver' },
  ];

  return (
    <div className="bg-basicWhite rounded-lg shadow-md border border-mistGray p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">
          {editingUser === null
            ? 'Add Team Members'
            : `Editing ${editingUser?.firstName} ${editingUser?.lastName}`}
        </h2>
        {editingUser !== null && (
          <button
            className="border-silverGray border-2 px-2 py-1 hover:text-silverGray hover:border-neutralGray transition-all duration-200 rounded-lg text-[13px]"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="relative space-y-4 pb-6 border-b border-gray-300 last:border-0 last:pb-0">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              register={register('firstName')}
              label="First Name"
              type="string"
              error={errors['firstName']?.message}
            />
            <Input
              register={register('lastName')}
              label="Last Name"
              type="string"
              error={errors['lastName']?.message}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              register={register('email')}
              label="Email"
              type="email"
              error={errors['email']?.message}
            />
            <PhoneNumberInput label="Phone" name={'phone'} control={control} />
          </div>
          <div className={`grid ${editingUser ? '' : 'md:grid-cols-2'}  gap-4`}>
            {editingUser == null && (
              <Input
                register={register('password')}
                label="Password"
                type="password"
                error={errors['password']?.message}
              />
            )}
            <Select control={control} name={'role'} label="Role" data={roles} />
          </div>
        </div>
        <ErrorMessage error={errorMessage} />
        <button
          type="submit"
          disabled={isAddingMember}
          className={`w-full ${!isAddingMember
            ? 'hover:bg-blue-800 hover:opacity-90'
            : 'cursor-not-allowed opacity-50'
            } py-3 px-4 bg-primaryColor text-white font-medium rounded-md shadow  transition-all duration-200`}
        >
          {editingUser === null ? 'Add User' : 'Edit User'}
        </button>
      </form>
    </div>
  );
};
