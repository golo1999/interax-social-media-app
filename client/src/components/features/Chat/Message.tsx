import { IconType } from "react-icons";
import styled from "styled-components";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { Message as MessageModel, User } from "models";
import { useSettingsStore } from "store";
import { Theme } from "types";

interface ContainerProps {
  isAuthenticatedUser: boolean;
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 0.5em;
  ${({ isAuthenticatedUser }) =>
    isAuthenticatedUser && "justify-content: flex-end;"};
`;

type TextProps = {
  isAuthenticatedUser: boolean;
  messageTheme: string;
  theme: Theme;
};

const Text = styled.span<TextProps>`
  background-color: ${({ isAuthenticatedUser, messageTheme, theme }) =>
    isAuthenticatedUser
      ? messageTheme
      : theme === "DARK"
      ? Colors.Arsenic
      : Colors.Platinum};
  border-radius: 1em;
  color: ${({ isAuthenticatedUser, theme }) =>
    isAuthenticatedUser || theme === "DARK"
      ? Colors.White
      : Colors.VampireBlack};
  font-size: 15px;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 0.25em 0.75em;
  word-wrap: break-word;
`;

interface Props {
  authenticatedUser: User | null | undefined;
  displayedEmoji: IconType;
  message: MessageModel;
  messageTheme: string;
  user: User | null;
}

export function Message({
  authenticatedUser,
  displayedEmoji: DisplayedEmoji,
  message,
  messageTheme,
  user,
}: Props) {
  const { theme } = useSettingsStore();

  const { id: authenticatedUserId } = { ...authenticatedUser };
  const { senderId, text } = message;

  const isAuthenticatedUser = senderId === authenticatedUserId;

  return (
    <Container isAuthenticatedUser={isAuthenticatedUser}>
      {!isAuthenticatedUser && <UserPhoto user={user} />}
      {text ? (
        <Text
          isAuthenticatedUser={isAuthenticatedUser}
          messageTheme={messageTheme}
          theme={theme}
        >
          {text}
        </Text>
      ) : (
        <DisplayedEmoji color={messageTheme} size={32} />
      )}
    </Container>
  );
}
