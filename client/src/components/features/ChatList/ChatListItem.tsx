import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserPhoto } from "components";
import {
  GET_CONVERSATION_BETWEEN,
  GET_USER_BY_ID,
  GetConversationBetweenData,
  getTimePassedFromDateTime,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { getDisplayedEmoji } from "./ChatList.helpers";
import { GroupedMessage } from "./ChatList.types";
import {
  Container,
  DisplayedName,
  ListItem,
  Message,
  TimePassed,
} from "./ChatListItem.style";

interface Props {
  groupedMessage: GroupedMessage;
  isModal?: boolean;
  searchInputText: string;
}

export function ChatListItem({
  groupedMessage,
  isModal,
  searchInputText,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery(GET_USER_BY_ID);
  const { pathname } = useLocation();
  const {
    activeMessageBoxes,
    addMessageBox,
    closeChatModal,
    maximizeMessageBox,
  } = useMessagesStore();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const { messages, userId } = groupedMessage;

  useEffect(() => {
    fetchUserById({
      variables: {
        input: {
          authenticatedUserId: authenticatedUser?.id,
          returnUserIfBlocked: true,
          userId,
        },
      },
    });

    if (userId) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUser?.id,
            second: userId,
          },
        },
      });
    }
  }, [authenticatedUser, userId, fetchConversationBetween, fetchUserById]);

  if (!user.userById || instanceOfUserError(user.userById)) {
    return <></>;
  }

  const { emoji } = { ...conversation.conversationBetween };
  const { firstName, lastName } = {
    ...(instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById),
  };
  const fullName = `${firstName} ${lastName}`;

  if (!fullName.toLowerCase().includes(searchInputText.toLowerCase())) {
    return <></>;
  }

  if (!messages) {
    return <></>;
  }

  function handleClick() {
    if (isModal) {
      const matchedMessageBox = activeMessageBoxes.find(
        (messageBox) =>
          messageBox.authenticatedUserId === authenticatedUser!.id &&
          messageBox.userId === userId
      );

      if (!matchedMessageBox) {
        addMessageBox(authenticatedUser!.id, userId);
      } else if (matchedMessageBox.visibility === "HIDDEN") {
        maximizeMessageBox(authenticatedUser!.id, userId);
      }
    } else if (userId !== pathnameUserId) {
      navigate(`/messages/t/${userId}`);
    }

    closeChatModal();
  }

  const pathnameUserId = pathname.split("/")[3];
  const isSelected = pathnameUserId === userId;
  const lastMessage = messages[messages.length - 1];
  const DisplayedEmoji = getDisplayedEmoji(emoji);

  const { dateTime, senderId, text } = lastMessage;

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <ListItem
      {...themeProps}
      isModal={isModal}
      isSelected={isSelected}
      onClick={handleClick}
    >
      <UserPhoto
        user={
          instanceOfUserWithMessage(user.userById)
            ? user.userById.user
            : user.userById
        }
      />
      <Container.Details>
        <DisplayedName {...themeProps}>{fullName}</DisplayedName>
        <Container.Message {...themeProps}>
          {senderId === authenticatedUser?.id && <span>You:</span>}
          {text ? <Message>{text}</Message> : <DisplayedEmoji />}
          <Container.DateTime>
            <TimePassed>
              &#183; {getTimePassedFromDateTime(dateTime, "CHAT")}
            </TimePassed>
          </Container.DateTime>
        </Container.Message>
      </Container.Details>
    </ListItem>
  );
}
