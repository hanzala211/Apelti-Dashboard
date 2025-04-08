import { Message } from './Message';
import { CheckInput } from '@components';
import { useMessage } from '@context';
import { useEffect, useState } from 'react';
import { ICONS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { IMessage } from '@types';
import MessageSkeleton from './MessageSkeleton';
import { useNavigate } from 'react-router-dom';

export const MessagesLeftPanel: React.FC = () => {
  const { setSelectedMessage, selectedMessage, getMessages } = useMessage();
  const [messagesBoolean, setMessagesBoolean] = useState<boolean[]>([]);
  const { data: messages, isLoading: isMessagesLoading } = useQuery<IMessage[] | undefined>({
    queryKey: ["messages"],
    queryFn: getMessages
  })
  const navigate = useNavigate()

  const selectAll = messagesBoolean.every((item) => item === true);

  useEffect(() => {
    const booleanData = Array.from(
      { length: messages ? messages?.length : 0 },
      (_, i) => i === -1
    );
    setMessagesBoolean(booleanData);
    if (window.innerWidth > 768 && messages && messages.length > 0) {
      setSelectedMessage(messages[0]);
      navigate(`/messages?id=${messages[0]._id}`);
    }
  }, [messages]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setMessagesBoolean(messagesBoolean.map(() => newState));
  };

  const handleIndividualChange = (index: number, value: boolean) => {
    const updatedMessages = [...messagesBoolean];
    updatedMessages[index] = value;
    setMessagesBoolean(updatedMessages);
  };

  return (
    <div
      className={`md:block w-full h-full ${selectedMessage === null ? 'block' : 'hidden'
        }`}
    >
      <div className="flex justify-end w-full">
        <span className="px-4 py-2 flex gap-2 items-center cursor-pointer">
          Newest <ICONS.arrowDown />
        </span>
      </div>
      <div className="md:px-10 px-2 mt-4 w-full">
        <div className="flex gap-2">
          <CheckInput
            checkValue={selectAll}
            handleOnChange={handleSelectAll}
            label="select"
          />
          <label htmlFor="select" className="font-semibold">
            Select All
          </label>
        </div>
        <div className="flex flex-col gap-3 h-[100dvh] max-h-[calc(100dvh-260px)] overflow-y-auto mt-2 w-full">
          {!isMessagesLoading ? messages && messages.length > 0 && messages.map((item, index) => (
            <Message
              key={index}
              onCheckChange={(value) => handleIndividualChange(index, value)}
              index={index}
              item={item}
              messagesBoolean={messagesBoolean}
            />
          )) : <div>
            <MessageSkeleton />
          </div>}
        </div>
      </div>
    </div>
  );
};
