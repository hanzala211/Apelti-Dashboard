import { Message } from "./Message";
import { CheckInput } from "@components";
import { useEffect, useState } from "react";
import { IMessage } from "@types";
import MessageSkeleton from "./MessageSkeleton";
import { useNavigate } from "react-router-dom";
import { useGetMessagesQuery } from "@api";
import { useAuth } from "@context";

export const MessagesLeftPanel: React.FC = () => {
  const { selectedMessage, setSelectedMessage } = useAuth();
  const [messagesBoolean, setMessagesBoolean] = useState<boolean[]>([]);

  const { data: messages, isLoading: isMessagesLoading } =
    useGetMessagesQuery();

  const navigate = useNavigate();

  const selectAll = messagesBoolean.every((item) => item === true);

  useEffect(() => {
    const booleanData = Array.from(
      { length: messages ? messages?.length : 0 },
      (_, i) => i === -1
    );
    setMessagesBoolean(booleanData);

    if (messages && messages.length > 0) {
      if (window.innerWidth > 768 && !selectedMessage) {
        setSelectedMessage(messages[0]);
        navigate(`/messages?id=${messages[0]._id}`);
      }
    }
  }, [messages, selectedMessage]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setMessagesBoolean(messagesBoolean.map(() => newState));
  };

  const handleIndividualChange = (index: number, value: boolean) => {
    const updatedMessages = [...messagesBoolean];
    updatedMessages[index] = value;
    setMessagesBoolean(updatedMessages);
  };

  const filters = [
    { label: "Recent", value: "recent" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <div
      className={`md:block w-full h-full ${
        selectedMessage === null ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-end w-full">
        <select className="w-fit mr-2 mt-3 rounded-md focus:outline-none focus:border-darkBlue hover:border-darkBlue transition-all duration-200 bg-white py-[3px] px-3 focus-within:outline-none border-basicBlack border-[1px]">
          {filters.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:px-10 px-2 mt-4 w-full">
        <div className="flex gap-2 border-b-[1px] border-silverGray pb-3 mb-3">
          <CheckInput
            checkValue={selectAll}
            handleOnChange={handleSelectAll}
            label="select"
          />
          <label htmlFor="select" className="font-semibold m-0">
            Select All
          </label>
        </div>
        <div className="flex flex-col gap-3 h-[100dvh] max-h-[calc(100dvh-300px)] overflow-y-auto mt-2 w-full">
          {!isMessagesLoading
            ? messages &&
              messages.length > 0 &&
              messages.map((item: IMessage, index: number) => (
                <Message
                  key={index}
                  onCheckChange={(value) =>
                    handleIndividualChange(index, value)
                  }
                  index={index}
                  item={item}
                  messagesBoolean={messagesBoolean}
                />
              ))
            : Array.from({ length: 10 }, (_, i) => (
                <div key={i}>
                  <MessageSkeleton />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
