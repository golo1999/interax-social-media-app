import { useLazyQuery, useMutation } from "@apollo/client";

import {
  ChangeEvent,
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdPhotoLibrary } from "react-icons/md";

import { UserPhoto } from "components";
import {
  ADD_MESSAGE,
  AddMessageData,
  GET_AUTHENTICATED_USER,
  GET_CONVERSATION_BETWEEN,
  GET_MESSAGES_BETWEEN,
  GET_USER_BY_ID,
  GetAuthenticatedUserData,
  GetConversationBetweenData,
  GetMessagesBetweenData,
  GetUserByIdData,
  getDisplayedTime,
} from "helpers";
import { Emoji } from "models";

import { getDisplayedEmoji, getMessageTheme } from "./Chat.helpers";
import {
  Container,
  DisplayedName,
  DisplayedTime,
  Footer,
  HiddenInput,
  Input,
  SendIcon,
} from "./Chat.style";
import { Message } from "./Message";

type FooterIcon = "SEND" | "THUMB_UP";

interface Props {
  chatHeight?: string;
  userId: string;
}

export function Chat({ chatHeight, userId }: Props) {
  const [addMessage] = useMutation<AddMessageData>(ADD_MESSAGE);
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [fetchMessagesBetween, { data: messages = { messagesBetween: null } }] =
    useLazyQuery<GetMessagesBetweenData>(GET_MESSAGES_BETWEEN);
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);

  const [footerIcon, setFooterIcon] = useState<FooterIcon>("THUMB_UP");

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUserById({ variables: { id: userId } });

    if (authenticatedUserData.authenticatedUser) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUserData.authenticatedUser.id,
            second: userId,
          },
        },
      });
      fetchMessagesBetween({
        variables: {
          input: {
            first: authenticatedUserData.authenticatedUser.id,
            second: userId,
          },
        },
      });
    }
  }, [
    authenticatedUserData.authenticatedUser,
    userId,
    fetchAuthenticatedUser,
    fetchConversationBetween,
    fetchUserById,
    fetchMessagesBetween,
  ]);

  const { emoji, first, firstNickname, secondNickname, theme } = {
    ...conversation.conversationBetween,
  };
  const { firstName, lastName } = { ...user.userById };

  const uniqueDateTimes = useMemo(() => {
    const list: Date[] = [];

    messages.messagesBetween?.forEach((message) => {
      const date = new Date(Number(message.dateTime));
      let isUnique = true;

      for (const item of list) {
        if (
          item.getFullYear() === date.getFullYear() &&
          item.getMonth() === date.getMonth() &&
          item.getDate() === date.getDate() &&
          item.getHours() === date.getHours() &&
          item.getMinutes() === date.getMinutes()
        ) {
          isUnique = false;
          break;
        }
      }

      if (!isUnique) {
        return;
      }

      list.push(new Date(date.setSeconds(0)));
    });

    return list;
  }, [messages.messagesBetween]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const newFooterIcon: FooterIcon = value === "" ? "THUMB_UP" : "SEND";

    if (newFooterIcon !== footerIcon) {
      setFooterIcon(newFooterIcon);
    }
  }

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

  const DisplayedEmoji = getDisplayedEmoji(emoji);

  return (
    <>
      <Container.Main height={chatHeight}>
        {messages.messagesBetween?.length === 0 ? (
          <Container.NoMessages>
            <UserPhoto
              user={user.userById}
              containerSize="4em"
              iconSize="2em"
            />
            <DisplayedName>{getDisplayedName()}</DisplayedName>
          </Container.NoMessages>
        ) : (
          <>
            {uniqueDateTimes.map((dateTime, index) => (
              <Container.UniqueDateTime key={index}>
                <DisplayedTime>{getDisplayedTime(dateTime)}</DisplayedTime>
                {messages.messagesBetween && (
                  <Container.Messages>
                    {messages.messagesBetween.map((m, i) => {
                      const dt = new Date(
                        new Date(Number(m.dateTime)).setSeconds(0)
                      );

                      if (dt.toString() !== dateTime.toString()) {
                        return <Fragment key={i} />;
                      }

                      return (
                        <Message
                          key={i}
                          authenticatedUser={
                            authenticatedUserData.authenticatedUser
                          }
                          displayedEmoji={DisplayedEmoji}
                          message={m}
                          messageTheme={getMessageTheme(theme)}
                          user={user.userById}
                        />
                      );
                    })}
                  </Container.Messages>
                )}
              </Container.UniqueDateTime>
            ))}
          </>
        )}
      </Container.Main>
      <Footer>
        <HiddenInput.FileUpload
          id="file-upload-input"
          onChange={(e) => {
            const selectedFiles = e.target.files;

            if (selectedFiles) {
              console.log(selectedFiles[0]);
            }
          }}
        />
        <label htmlFor="file-upload-input">
          <MdPhotoLibrary color={getMessageTheme(theme)} size={24} />
        </label>
        <Input placeholder="Aa" ref={inputRef} onChange={handleInputChange} />
        {footerIcon === "SEND" ? (
          <SendIcon
            color={getMessageTheme(theme)}
            size={24}
            onClick={() => {
              addMessage({
                variables: {
                  input: {
                    emoji: null,
                    parentId: null,
                    receiverId: userId,
                    senderId: authenticatedUserData.authenticatedUser?.id,
                    text: inputRef.current.value,
                  },
                },
                refetchQueries: [
                  { query: GET_AUTHENTICATED_USER },
                  {
                    query: GET_MESSAGES_BETWEEN,
                    variables: {
                      input: {
                        first: authenticatedUserData.authenticatedUser?.id,
                        second: userId,
                      },
                    },
                  },
                ],
                onCompleted: () => {
                  inputRef.current.value = "";
                  setFooterIcon("THUMB_UP");
                  return;
                },
              });
            }}
          />
        ) : (
          <DisplayedEmoji
            color={getMessageTheme(theme)}
            size={24}
            style={{ userSelect: "none" }}
            onClick={() => {
              addMessage({
                variables: {
                  input: {
                    emoji: Emoji.LIKE,
                    parentId: null,
                    receiverId: userId,
                    senderId: authenticatedUserData.authenticatedUser?.id,
                    text: null,
                  },
                },
                refetchQueries: [
                  { query: GET_AUTHENTICATED_USER },
                  {
                    query: GET_MESSAGES_BETWEEN,
                    variables: {
                      input: {
                        first: authenticatedUserData.authenticatedUser?.id,
                        second: userId,
                      },
                    },
                  },
                ],
                onCompleted: () => {
                  inputRef.current.value = "";
                  setFooterIcon("THUMB_UP");
                  return;
                },
              });
            }}
          />
        )}
      </Footer>
    </>
  );
}
