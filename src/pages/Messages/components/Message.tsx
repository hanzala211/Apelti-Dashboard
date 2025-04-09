import { CheckInput, Button } from '@components';
import { COLORS, ICONS } from '@constants';
import { useAuth, useMessage } from '@context';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { CommentResponse, IMessage } from '@types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

interface MessageProps {
  onCheckChange: (value: boolean) => void;
  index: number;
  item: IMessage;
  messagesBoolean: boolean[];
}

type CommentsQueryData = {
  pages: { data: CommentResponse[]; page: number; totalPages: number }[];
  pageParams: number[];
};

export const Message: React.FC<MessageProps> = ({
  onCheckChange,
  index,
  item,
  messagesBoolean,
}) => {
  const { userData } = useAuth();
  const {
    setSelectedMessage,
    selectedMessage,
    comment,
    setComment,
    postCommentMessage,
    getComments,
  } = useMessage();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const postCommentMessageMutation = useMutation({
    mutationFn: (messageId: string) => postCommentMessage(messageId),
    onSuccess: () => {
      setComment('');
      queryClient.setQueryData(
        ['comments', item._id],
        (oldData: CommentsQueryData | undefined) => {
          if (!oldData) return { pages: [], pageParams: [] };
          const newComment = {
            user: userData,
            _id: Date.now(),
            comment: comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          return {
            pages: [
              {
                ...oldData.pages[0],
                data: [newComment, ...oldData.pages[0].data],
              },
              ...oldData.pages.slice(1),
            ],
            pageParams: oldData.pageParams,
          };
        }
      );
    },
  });
  const {
    data: comments,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['comments', item._id],
    queryFn: async ({ pageParam = 1 }) => {
      const commentsResponse = await getComments(item._id, pageParam);
      return commentsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: false,
  });
  const navigate = useNavigate();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(e.target.checked);
  };

  const handleChange = () => {
    navigate(`/messages?id=${item._id}`);
    setSelectedMessage(item);
  };

  const handleFetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleChange}
        className={`flex gap-2 rounded-md cursor-pointer flex-col border-[1px] p-3 w-full ${item._id === selectedMessage?._id
            ? 'bg-softBlue border-darkBlue'
            : ' border-basicSilver'
          }`}
      >
        <div className="flex gap-2 items-center">
          <CheckInput
            checkValue={messagesBoolean[index]}
            handleOnChange={handleCheck}
            label={`${index}`}
          />
          <label htmlFor={`${index}`} className="text-[20px] font-semibold">
            {item.supplierName}
          </label>
        </div>
        <div className="ml-5 space-y-2">
          {item.isDuplicate && (
            <p className="bg-basicRed rounded-md m-0 text-basicWhite w-fit px-3 py-0.5 text-[13px]">
              Duplicate
            </p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-[12px] m-0">{item.fileName}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                refetch();
                setIsCommentOpen((prev) => !prev);
              }}
              className={`text-[12px] ${isCommentOpen && !isCommentsLoading ? 'text-primaryColor' : ''
                } transition-all duration-200 m-0`}
            >
              {isCommentsLoading ? (
                <SyncLoader color={COLORS.primaryColor} size={5} />
              ) : (
                'Add Comments'
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Comment Box */}
      <div
        className={`mt-3 z-10 overflow-hidden transition-all w-full duration-300
    ${isCommentOpen && !isCommentsLoading
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 absolute h-0 translate-y-4 scale-95 pointer-events-none'
          }`}
      >
        <div className="flex gap-4">
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className={`bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-darkBlue hover:border-darkBlue transition-all duration-200`}
            placeholder="Comment"
          />
          <Button
            btnText="Comment"
            className="rounded-md"
            isLoading={postCommentMessageMutation.isPending}
            handleClick={() => postCommentMessageMutation.mutate(item._id)}
          />
        </div>
        <div className="bg-gray-200 shadow-md p-4 mt-2 rounded-md w-full flex flex-col gap-4">
          {/* User Comment */}
          {comments?.pages.map((page) =>
            page.data.map((comment) => (
              <div
                key={comment._id}
                className={`border-b-[1px] border-silverGray pb-2 last:border-b-0`}
              >
                <div className="flex gap-2">
                  <div
                    className={`w-10 h-10 rounded-full bg-grayTxt flex items-center justify-center font-bold text-basicWhite`}
                  >
                    {comment.user.firstName[0].toUpperCase()}
                    {comment.user.lastName[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-semibold">
                      {comment.user.firstName} {comment.user.lastName} (
                      {comment.user.role[0].toUpperCase() +
                        comment.user.role.slice(1)}
                      )
                    </h4>
                    <h5 className="text-[13px]">{comment.user.email}</h5>
                  </div>
                </div>
                <p className="m-0 ml-12 mt-1">{comment.comment}</p>
              </div>
            ))
          )}
          {hasNextPage && (
            <button
              disabled={isFetchingNextPage}
              onClick={handleFetchMore}
              className={`w-fit ${isFetchingNextPage
                  ? 'bg-blue-900 cursor-not-allowed'
                  : 'hover:bg-blue-700'
                } flex gap-2 items-center m-0 bg-primaryColor p-2 rounded-md text-basicWhite transition-all duration-200 text-[14px]`}
            >
              <ICONS.load size={20} color={COLORS.basicWhite} />
              Load More Comments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
