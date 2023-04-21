import { Route, Routes, useMatch } from "react-router-dom";

import { ChatList, MessageBoxesContainer } from "components";
import {
  FriendsPage,
  HomePage,
  MessengerPage,
  NotFoundPage,
  ProfilePage,
  WatchPage,
} from "pages";
import { useMessagesStore } from "store";

export function Router() {
  const isMessagesRoute = useMatch("/messages/t/:userId");
  const { activeMessageBoxes, isChatModalVisible } = useMessagesStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages/t/:userId" element={<MessengerPage />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isMessagesRoute && activeMessageBoxes.length > 0 && (
        <MessageBoxesContainer />
      )}
      {isChatModalVisible && <ChatList isModal />}
    </>
  );
}
