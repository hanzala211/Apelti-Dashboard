import { APP_ACTIONS, ICONS, PERMISSIONS } from '@constants';
import { useAuth, useTeam } from '@context';
import { UseMutationResult } from '@tanstack/react-query';
import { IUser } from '@types';
import { Skeleton } from 'antd';

interface TeamTableProps {
  teamMembers: IUser[] | null | undefined;
  isTeamLoading: boolean;
  deleteUserMutation: UseMutationResult<
    null | undefined,
    Error,
    {
      userId: string;
    },
    unknown
  >;
}

export const TeamTable: React.FC<TeamTableProps> = ({
  teamMembers,
  isTeamLoading,
  deleteUserMutation,
}) => {
  const { userData } = useAuth();
  const { setEditingUser } = useTeam();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  return (
    <div className="overflow-x-auto overflow-y-hidden mt-8">
      <table className="w-full md:max-w-[calc(100dvw-256px)] text-left border-collapse">
        <thead className="border border-silverGray">
          <tr className="bg-mistGray">
            <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
              Full Name
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
              Email
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
              Phone
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
              Role
            </th>
            {userData?.role === 'admin' && (
              <>
                <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
                  Edit
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-neutralGray">
                  Delete
                </th>
              </>
            )}
          </tr>
        </thead>

        <tbody className="border border-silverGray">
          {isTeamLoading
            ? Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-y border-silverGray even:bg-basicWhite odd:bg-paleGray"
              >
                <td className="px-4 py-2">
                  <Skeleton.Input active size="small" block />
                </td>
                <td className="px-4 py-2">
                  <Skeleton.Input active size="small" block />
                </td>
                <td className="px-4 py-2">
                  <Skeleton.Input active size="small" block />
                </td>
                <td className="px-4 py-2">
                  <Skeleton.Input active size="small" block />
                </td>
                <td className="px-4 py-2">
                  <Skeleton.Button active size="small" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton.Button active size="small" />
                </td>
              </tr>
            ))
            : teamMembers &&
            teamMembers.map((item, index) => (
              <tr
                key={index}
                className="border-y border-silverGray even:bg-basicWhite odd:bg-paleGray"
              >
                <td className="px-4 py-2 text-sm text-neutralGray">
                  {item.firstName} {item.lastName}
                </td>
                <td className="px-4 py-2 text-sm text-neutralGray">
                  {item.email}
                </td>
                <td className="px-4 py-2 text-sm text-neutralGray">
                  {item.phone}
                </td>
                <td className="px-4 py-2 text-sm text-neutralGray">
                  {item.role[0].toUpperCase()}
                  {item.role.slice(1)}
                </td>
                {userPermissions.includes(APP_ACTIONS.addTeam) && (
                  <>
                    <td
                      className="px-4 py-2 text-sm text-primaryColor cursor-pointer"
                      onClick={() => setEditingUser(item)}
                    >
                      <ICONS.userEdit size={24} />
                    </td>
                    <td
                      className={`px-4 py-2 text-sm text-basicRed ${deleteUserMutation.isPending
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                        }`}
                      onClick={() => {
                        if (!deleteUserMutation.isPending)
                          deleteUserMutation.mutate({ userId: item._id });
                      }}
                    >
                      <ICONS.delete size={24} />
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
