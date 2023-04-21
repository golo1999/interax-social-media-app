import { IconType } from "react-icons";
import styled from "styled-components";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { Message as MessageModel, User } from "models";

interface ContainerProps {
  isAuthenticatedUser: boolean;
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 0.5em;
  ${(props) => props.isAuthenticatedUser && "justify-content: flex-end;"};
`;

interface TextProps {
  isAuthenticatedUser: boolean;
  theme: string;
}

const Text = styled.p<TextProps>`
  background-color: ${(props) =>
    props.isAuthenticatedUser ? props.theme : Colors.Arsenic};
  border-radius: 1em;
  color: white;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 0.25em 0.75em;
  word-wrap: break-word;
`;

interface Props {
  authenticatedUser: User | null;
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
  const { id: authenticatedUserId } = { ...authenticatedUser };
  const { senderId, text } = message;

  const isAuthenticatedUser = senderId === authenticatedUserId;

  return (
    <Container isAuthenticatedUser={isAuthenticatedUser}>
      {!isAuthenticatedUser && <UserPhoto user={user} />}
      {text ? (
        <Text isAuthenticatedUser={isAuthenticatedUser} theme={messageTheme}>
          {text}
        </Text>
      ) : (
        <DisplayedEmoji color={messageTheme} size={32} />
      )}
    </Container>
  );
}
