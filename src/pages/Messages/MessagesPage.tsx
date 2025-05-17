import { DocumentNotFound, PageHeading, ResizableSlider } from "@components";
import { MessagesLeftPanel } from "./components/MessagesLeftPanel";
import { MessagesRightPanel } from "./components/MessagesRightPanel";
import { APP_ACTIONS, ICONS, PERMISSIONS, ROUTES } from "@constants";
import { useAuth } from "@context";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const MessagesPage: React.FC = () => {
  const { userData, selectedMessage, setSelectedMessage } = useAuth();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const messageId = searchParams.get("id");

    if (!messageId && selectedMessage) {
      setSelectedMessage(null);
    }
  }, [location.search, selectedMessage]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const messageId = searchParams.get("id");

      if (!messageId) {
        setSelectedMessage(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleClick = () => {
    setSelectedMessage(null);
    // Update URL to remove id parameter
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

  if (!userPermissions.includes(APP_ACTIONS.messagesPage))
    return <Navigate to={ROUTES.not_available} />;

  return (
    <section className="pt-20 md:pt-0 h-screen w-full">
      <div className="md:px-14 px-2 flex justify-between items-center border-b py-8">
        <PageHeading label="Messages" />
      </div>

      <div className="w-full h-[calc(100vh-8rem)]">
        <ResizableSlider
          Left={() => <MessagesLeftPanel />}
          Right={
            <div
              className={`relative md:w-2/3 h-[100dvh] max-h-[calc(100dvh-9rem)] overflow-y-auto ${
                selectedMessage === null ? "w-0" : "w-full"
              }`}
            >
              <button
                onClick={handleClick}
                className={`text-primaryColor text-[30px] absolute left-2 top-3 z-20 md:hidden ${
                  selectedMessage === null ? "hidden" : "block"
                }`}
              >
                <ICONS.leftArrow />
              </button>
              {selectedMessage ? (
                <MessagesRightPanel />
              ) : (
                <div
                  className={`${
                    selectedMessage ? "" : "md:block hidden"
                  } w-full h-full`}
                >
                  <DocumentNotFound />
                </div>
              )}
            </div>
          }
        />
      </div>
    </section>
  );
};

export default MessagesPage;
