import { messageServices } from '@services';
import { IMessage, MessageContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

const MessageContext = createContext<MessageContextTypes | undefined>(
  undefined
);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [comment, setComment] = useState<string>('');

  const getMessages = async () => {
    try {
      const response = await messageServices.getMessages();
      console.log(response);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCommentMessage = async (messageID: string) => {
    try {
      const response = await messageServices.postComment({ comment }, messageID)
      console.log(response)
      return response.data.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getComments = async (messageId: string, page: number) => {
    try {
      const response = await messageServices.getComment(page, 3, messageId)
      console.log(response)
      if (response.status === 200) {
        return response.data.data.comments
      }
      return undefined
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        selectedMessage,
        setSelectedMessage,
        getMessages,
        comment,
        setComment,
        postCommentMessage,
        getComments,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextTypes => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('use useMessage inside Message Provider');
  }
  return context;
};
