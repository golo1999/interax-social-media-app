import { useLazyQuery } from "@apollo/client";

import { memo, useEffect } from "react";
import { BiSolidMessage } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdCake, MdPostAdd, MdThumbUp } from "react-icons/md";

import { UserPhoto } from "components";
import {
  GET_USER_BY_ID,
  getDate,
  getTimePassedFromDateTime,
  GetUserByIdData,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { Notification as NotificationModel, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Time, Title, UnreadCircle } from "./Notification.style";

interface Props {
  notification: NotificationModel;
  onClick: () => void;
}

export const Notification = memo(function Notification({
  notification,
  onClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);
  const { theme } = useSettingsStore();

  const { dateTime, eventProducerId, isRead, type } = notification;

  useEffect(() => {
    fetchUserById({
      variables: { input: { id: eventProducerId } },
    });
  }, [eventProducerId, fetchUserById]);

  if (instanceOfUserError(user.userById) || !user.userById) {
    return <></>;
  }

  const { firstName: eventProducerFirstName, lastName: eventProducerLastName } =
    {
      ...(instanceOfUserWithMessage(user.userById)
        ? user.userById.user
        : user.userById),
    };

  function getIcon() {
    switch (type) {
      case "BIRTHDAY":
        return MdCake;
      case "COMMENT":
        return BiSolidMessage;
      case "GROUP/POST_ADDED":
      case "GROUP/WELCOME":
        return FaUsers;
      case "POST_ADDED":
        return MdPostAdd;
      case "POST_REACTED":
        return MdThumbUp;
    }
  }

  function getTitle() {
    switch (type) {
      case "BIRTHDAY":
        const date = getDate(dateTime);

        return eventProducerLastName.endsWith("s") ? (
          <>
            <span style={{ fontWeight: 600 }}>
              {eventProducerFirstName}&#160;{eventProducerLastName}
            </span>
            &#39;&#160;birthday&#160;was&#160;on&#160;{date}&#46;
          </>
        ) : (
          <>
            <span style={{ fontWeight: 600 }}>
              {eventProducerFirstName}&#160;{eventProducerLastName}
            </span>
            &#39;s&#160;birthday&#160;was&#160;on&#160;{date}&#46;
          </>
        );
      case "COMMENT":
        return <></>;
      case "GROUP/POST_ADDED":
        return (
          <>
            <span style={{ fontWeight: 600 }}>
              {eventProducerFirstName}&#160;{eventProducerLastName}
            </span>
            &#160;posted&#160;in&#160;
            <span style={{ fontWeight: 600 }}>MOCKED_GROUP</span>&#58;
          </>
        );
      case "GROUP/WELCOME":
        return (
          <>
            You&#160;can&#160;now&#160;post&#160;and&#160;comment&#160;in&#160;
            <span style={{ fontWeight: 600 }}>MOCKED_GROUP</span>&#46;
          </>
        );
      case "POST_ADDED":
        return (
          <>
            <span style={{ fontWeight: 600 }}>
              {eventProducerFirstName}&#160;{eventProducerLastName}
            </span>
            &#160;added&#160;a&#160;new&#160;post&#46;
          </>
        );
      case "POST_REACTED":
        return <></>;
    }
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const Icon = getIcon();

  const displayedTime = getTimePassedFromDateTime(dateTime, "NOTIFICATION");

  return (
    <Container.Main {...themeProps} onClick={onClick}>
      <Container.UserPhoto>
        <UserPhoto
          containerSize="56px"
          iconSize="28px"
          user={user.userById as User}
        />
        <Container.Icon notificationType={type}>
          {<Icon color="white" size={18} />}
        </Container.Icon>
      </Container.UserPhoto>
      <Container.Content>
        <Container.Texts>
          <Title {...themeProps} isRead={isRead}>
            {/* <span style={{ fontWeight: 600 }}>
              {eventProducerFirstName} {eventProducerLastName}
            </span>
            &#160;shared&#160;MOCKED_USER2's post. */}
            {getTitle()}
          </Title>
          <Time {...themeProps} isRead={isRead}>
            {displayedTime}
          </Time>
        </Container.Texts>
        <Container.UnreadCircle>
          {!isRead && <UnreadCircle />}
        </Container.UnreadCircle>
      </Container.Content>
    </Container.Main>
  );
});
