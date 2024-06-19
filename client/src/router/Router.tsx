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
import { GET_USER_BY_ID } from "helpers";
import { User } from "models";
import {
  AuthenticationPage,
  ForgotPasswordPage,
  FriendsPage,
  HomePage,
  LoadingPage,
  MessengerPage,
  NotFoundPage,
  NotificationsPage,
  PhotoPage,
  ProfilePage,
  RegistrationPage,
  SavedPage,
  SearchPage,
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
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery(GET_USER_BY_ID);
  const isForgotPasswordPage = useMatch("/forgot-password");
  const isLoginRoute = useMatch("/login");
  const isMessagesRoute = useMatch("/messages/t/:userId");
  const isRegistrationRoute = useMatch("/registration");
  const { activeMessageBoxes, isChatModalVisible } = useMessagesStore();
  const { isNotificationListVisible, isSettingsListVisible } =
    useSettingsStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log({ firebaseUser });

      if (firebaseUser && firebaseUser.emailVerified) {
        setIsLoading(true);
        fetchUserById({
          variables: {
            input: {
              returnUserIfBlocked: true,
              userId: firebaseUser.uid,
            },
          },
        });
        setIsLoading(false);

        if (user.userById) {
          console.log({ userById: user.userById });
          setAuthenticatedUser(user.userById as User);
        }
      } else {
        setAuthenticatedUser(null);
      }

      setIsFinishedLoading(true);
    });

    return () => unsubscribe();
  }, [
    auth,
    user.userById,
    fetchUserById,
    setAuthenticatedUser,
    setIsFinishedLoading,
    setIsLoading,
  ]);

  useEffect(() => {
    if (typeof authenticatedUser !== "undefined") {
      console.log({ authenticatedUser });
    }
  }, [authenticatedUser]);

  // useEffect(() => {
  //   async function fetchAndSetData() {
  //     setIsLoading(true);
  //     const { data } = await fetchAuthenticatedUser();
  //     setIsLoading(false);
  //     setIsFinishedLoading(true);

  //     if (data?.authenticatedUser) {
  //       console.log({ authenticatedUser: data.authenticatedUser });
  //       setAuthenticatedUser(data.authenticatedUser);
  //     }
  //   }

  //   fetchAndSetData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (typeof authenticatedUser === "undefined") {
    return <LoadingPage />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/messages/t/:userId" element={<MessengerPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/photo/:photoId" element={<PhotoPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!!authenticatedUser &&
        !isForgotPasswordPage &&
        !isLoginRoute &&
        !isMessagesRoute &&
        !isRegistrationRoute &&
        activeMessageBoxes.filter(
          (messageBox) =>
            messageBox.authenticatedUserId === authenticatedUser.id
        ).length > 0 && <MessageBoxesContainer />}
      {isChatModalVisible && <ChatList isModal />}
      {isNotificationListVisible && <NotificationsList isModal />}
      {isSettingsListVisible && <SettingsList />}
    </>
  );
}
