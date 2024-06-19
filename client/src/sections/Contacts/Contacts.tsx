import { CSSProperties, useMemo } from "react";

import { UserTab } from "components";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { Container, Title } from "./Contacts.style";

interface Props {
  style?: CSSProperties;
}

export function Contacts({ style }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { activeMessageBoxes, addMessageBox, maximizeMessageBox } =
    useMessagesStore();
  const { theme } = useSettingsStore();

  const { friends } = { ...authenticatedUser };

  const displayedFriends = useMemo(
    () => friends?.slice(0, 20) || [],
    [friends]
  );

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  if (displayedFriends.length === 0) {
    return <></>;
  }

  return (
    <Container.Main style={style}>
      <Title {...themeProps}>Contacts</Title>
      {displayedFriends.map((friend, index) => {
        const { id: friendId } = friend;

        function handleClick() {
          const matchedMessageBox = activeMessageBoxes.find(
            (messageBox) =>
              messageBox.authenticatedUserId === authenticatedUser?.id &&
              messageBox.userId === friendId
          );

          if (!matchedMessageBox) {
            addMessageBox(authenticatedUser!.id, friendId);
          } else if (matchedMessageBox.visibility === "HIDDEN") {
            maximizeMessageBox(authenticatedUser!.id, friendId);
          }
        }

        return <UserTab key={index} user={friend} onClick={handleClick} />;
      })}
    </Container.Main>
  );
}
