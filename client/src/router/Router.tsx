import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";

import { ChatList, MessageBoxesContainer, SettingsList } from "components";
import { GET_AUTHENTICATED_USER, GetAuthenticatedUserData } from "helpers";
import {
  ForgotPasswordPage,
  FriendsPage,
  HomePage,
  LoginPage,
  MessengerPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  WatchPage,
} from "pages";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

export function Router() {
  const { setAuthenticatedUser } = useAuthenticationStore();
  const [fetchAuthenticatedUser] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER
  );
  const isForgotPasswordPage = useMatch("/forgot-password");
  const isLoginRoute = useMatch("/login");
  const isMessagesRoute = useMatch("/messages/t/:userId");
  const isRegistrationRoute = useMatch("/registration");
  const { activeMessageBoxes, isChatModalVisible } = useMessagesStore();
  const { isSettingsListVisible } = useSettingsStore();

  useEffect(() => {
    async function fetchAndSetData() {
      const { data } = await fetchAuthenticatedUser();

      if (data?.authenticatedUser) {
        setAuthenticatedUser(data.authenticatedUser);
      }
    }

    fetchAndSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messages/t/:userId" element={<MessengerPage />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isForgotPasswordPage &&
        !isLoginRoute &&
        !isMessagesRoute &&
        !isRegistrationRoute &&
        activeMessageBoxes.length > 0 && <MessageBoxesContainer />}
      {isChatModalVisible && <ChatList isModal />}
      {isSettingsListVisible && <SettingsList />}
    </>
  );
}
