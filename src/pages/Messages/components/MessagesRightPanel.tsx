import { DocumentNotFound } from "@components";
import { useAuth } from "@context";
import React from "react";

export const MessagesRightPanel: React.FC = () => {
  const { selectedMessage } = useAuth();

  return (
    <React.Fragment>
      {selectedMessage?.fileUrl ? (
        <img
          src={selectedMessage?.fileUrl}
          alt="Preview"
          className="absolute inset-0 w-[90%] mx-auto h-full object-contain"
        />
      ) : (
        <DocumentNotFound />
      )}
    </React.Fragment>
  );
};
