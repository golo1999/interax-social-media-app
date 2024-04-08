import { useLazyQuery } from "@apollo/client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";

import {
  ChatList,
  MessageBoxesContainer,
  NotificationsList,
  SettingsList,
} from "components";
import { GET_AUTHENTICATED_USER, GetAuthenticatedUserData } from "helpers";
import {
  AuthenticationPage,
  ForgotPasswordPage,
  FriendsPage,
  HomePage,
  MessengerPage,
  NotFoundPage,
  NotificationsPage,
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
  const auth = getAuth();
  const {
    authenticatedUser,
    setAuthenticatedUser,
    setIsLoading,
    setIsFinishedLoading,
  } = useAuthenticationStore();
  const [fetchAuthenticatedUser] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER
  );
  const isForgotPasswordPage = useMatch("/forgot-password");
  const isLoginRoute = useMatch("/login");
  const isMessagesRoute = useMatch("/messages/t/:userId");
  const isRegistrationRoute = useMatch("/registration");
  const { activeMessageBoxes, isChatModalVisible } = useMessagesStore();
  const { isNotificationListVisible, isSettingsListVisible } =
    useSettingsStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log({ user });
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    async function fetchAndSetData() {
      setIsLoading(true);
      const { data } = await fetchAuthenticatedUser();
      setIsLoading(false);
      setIsFinishedLoading(true);

      if (data?.authenticatedUser) {
        console.log({ authenticatedUser: data.authenticatedUser });
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
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/messages/t/:userId" element={<MessengerPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!!authenticatedUser &&
        !isForgotPasswordPage &&
        !isLoginRoute &&
        !isMessagesRoute &&
        !isRegistrationRoute &&
        activeMessageBoxes.length > 0 && <MessageBoxesContainer />}
      {isChatModalVisible && <ChatList isModal />}
      {isNotificationListVisible && <NotificationsList isModal />}
      {isSettingsListVisible && <SettingsList />}
    </>
  );
}
