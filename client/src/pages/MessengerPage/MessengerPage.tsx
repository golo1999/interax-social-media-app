import { useLazyQuery } from "@apollo/client";
import { Divider } from "@mui/material";

import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Chat, ChatList, Header, UserPhoto } from "components";
import { Colors } from "environment";
import {
  GET_CONVERSATION_BETWEEN,
  GET_USER_BY_ID,
  GetConversationBetweenData,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { useHeaderItems } from "hooks";
import { User as UserModel } from "models";
import { LoadingPage } from "pages";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { Complementary } from "./Complementary";
import { getDisplayedEmoji, getMessageTheme } from "./MessengerPage.helpers";
import { Container, User } from "./MessengerPage.style";

export function MessengerPage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  return !!authenticatedUser ? (
    <AuthenticatedMessengerPage authenticatedUser={authenticatedUser} />
  ) : (
    <NotAuthenticatedMessengerPage />
  );
}

interface AuthenticatedMessengerPageProps {
  authenticatedUser: UserModel;
}

function AuthenticatedMessengerPage({
  authenticatedUser,
}: AuthenticatedMessengerPageProps) {
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [
    fetchUserById,
    { data: user = { userById: null }, loading: isFetchingUser },
  ] = useLazyQuery(GET_USER_BY_ID);
  const { theme } = useSettingsStore();
  const [isComplementaryVisible, setIsComplementaryVisible] = useState(true);

  const headerItems = useHeaderItems();
  const { pathname } = useLocation();
  const { isChatModalVisible, closeChatModal } = useMessagesStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isChatModalVisible) {
      closeChatModal();
    }
  }, [isChatModalVisible, closeChatModal]);

  const userId = pathname.split("/")[3];

  useEffect(() => {
    fetchUserById({
      variables: {
        input: {
          authenticatedUserId: authenticatedUser.id,
          returnUserIfBlocked: true,
          userId,
        },
      },
    });

    if (authenticatedUser) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUser.id,
            second: userId,
          },
        },
      });
    }
  }, [authenticatedUser, userId, fetchConversationBetween, fetchUserById]);

  console.log(user.userById);

  if (conversation.conversationBetween) {
    console.log(conversation.conversationBetween);
  }

  if (!isFetchingUser && !user.userById) {
    return <LoadingPage />;
  } else if (isFetchingUser) {
    return <LoadingPage />;
  } else if (instanceOfUserError(user.userById)) {
    console.log(user.userById);
    return <BlockedMessengerPage />;
  }

  const {
    emoji,
    first,
    firstNickname,
    secondNickname,
    theme: conversationTheme,
  } = {
    ...conversation.conversationBetween,
  };
  const { firstName, lastName, username } = {
    ...(instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById),
  };

  function getDisplayedName() {
    if (!firstName || !lastName) {
      return "Interax user";
    } else if (!firstNickname && !secondNickname) {
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      return "";
    } else if (first === userId) {
      return firstNickname;
    }

    return secondNickname;
  }

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const isAuthenticatedUser = userId === authenticatedUser?.id;
  const isAuthenticatedUserFriend = authenticatedUser?.friends?.find(
    (friend) => friend.id === userId
  );
  const DisplayedEmoji = getDisplayedEmoji(emoji);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        <ChatList />
        <Divider
          flexItem
          orientation="vertical"
          sx={{ borderColor: Colors[dividerColor] }}
        />
        <Container.Chat>
          <Container.ChatHeader>
            <Container.User
              {...themeProps}
              onClick={() => {
                if (!instanceOfUserWithMessage(user.userById) && username) {
                  navigate(`/${username}`);
                }
              }}
            >
              <UserPhoto
                user={
                  instanceOfUserWithMessage(user.userById)
                    ? user.userById.user
                    : user.userById
                }
              />
              <User.DetailsContainer>
                <User.Name
                  $isAuthenticated={!!authenticatedUser}
                  $theme={theme}
                >
                  {getDisplayedName()}
                </User.Name>
                {(isAuthenticatedUser || isAuthenticatedUserFriend) &&
                  !instanceOfUserWithMessage(user.userById) && (
                    <User.Active
                      $isAuthenticated={!!authenticatedUser}
                      $theme={theme}
                    >
                      Active 47m ago
                    </User.Active>
                  )}
              </User.DetailsContainer>
            </Container.User>
            <Container.Icons>
              <Container.Icon
                onClick={() => setIsComplementaryVisible((value) => !value)}
              >
                <MdInfo color={getMessageTheme(conversationTheme)} size={24} />
              </Container.Icon>
            </Container.Icons>
          </Container.ChatHeader>
          <Chat userId={userId} />
        </Container.Chat>
        {isComplementaryVisible && (
          <>
            <Divider
              flexItem
              orientation="vertical"
              sx={{ borderColor: Colors[dividerColor] }}
            />
            <Complementary
              conversation={conversation.conversationBetween}
              displayedEmoji={DisplayedEmoji}
              displayedName={getDisplayedName()}
              user={user.userById}
            />
          </>
        )}
      </Container.Content>
    </Container.Main>
  );
}

function BlockedMessengerPage() {
  return <>BLOCKED</>;
}

function NotAuthenticatedMessengerPage() {
  const { userId } = useParams<{ userId: string }>();

  return <Navigate state={{ next: `/messages/t/${userId}` }} to="/login" />;
}
