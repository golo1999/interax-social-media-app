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
import { Emoji } from "enums";
import {
  ADD_MESSAGE,
  AddMessageData,
  GET_CONVERSATION_BETWEEN,
  GET_MESSAGES_BETWEEN,
  GET_USER_BY_ID,
  GetConversationBetweenData,
  GetMessagesBetweenData,
  getDisplayedTime,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { useAuthenticationStore, useSettingsStore } from "store";
import { FooterIcon } from "types";

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

interface Props {
  chatHeight?: string;
  userId: string;
}

export function Chat({ chatHeight, userId }: Props) {
  const { authenticatedUser, setAuthenticatedUser } = useAuthenticationStore();
  const [addMessage] = useMutation<AddMessageData>(ADD_MESSAGE);
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [fetchMessagesBetween, { data: messages = { messagesBetween: null } }] =
    useLazyQuery<GetMessagesBetweenData>(GET_MESSAGES_BETWEEN);
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery(GET_USER_BY_ID);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { theme } = useSettingsStore();
  const [footerIcon, setFooterIcon] = useState<FooterIcon>("THUMB_UP");

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

    if (authenticatedUser) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUser.id,
            second: userId,
          },
        },
      });
      fetchMessagesBetween({
        variables: {
          input: {
            first: authenticatedUser.id,
            second: userId,
          },
        },
      });
    }
  }, [
    authenticatedUser,
    userId,
    fetchConversationBetween,
    fetchUserById,
    fetchMessagesBetween,
  ]);

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

  if (!user.userById || instanceOfUserError(user.userById)) {
    return <></>;
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
  const { firstName, lastName } = {
    ...(instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById),
  };

  const DisplayedEmoji = getDisplayedEmoji(emoji);

  return (
    <>
      <Container.Main height={chatHeight}>
        {messages.messagesBetween?.length === 0 ? (
          <Container.NoMessages>
            <UserPhoto
              user={
                instanceOfUserWithMessage(user.userById)
                  ? user.userById.user
                  : user.userById
              }
              containerSize="4em"
              iconSize="2em"
            />
            <DisplayedName isAuthenticated={!!authenticatedUser} theme={theme}>
              {getDisplayedName()}
            </DisplayedName>
          </Container.NoMessages>
        ) : (
          <>
            {uniqueDateTimes.map((dateTime, index) => (
              <Container.UniqueDateTime key={index}>
                <DisplayedTime
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  {getDisplayedTime(dateTime)}
                </DisplayedTime>
                {messages.messagesBetween && (
                  <Container.Messages>
                    {messages.messagesBetween.map((m, i) => {
                      if (instanceOfUserError(user.userById)) {
                        return <Fragment key={i} />;
                      }

                      const dt = new Date(
                        new Date(Number(m.dateTime)).setSeconds(0)
                      );

                      if (dt.toString() !== dateTime.toString()) {
                        return <Fragment key={i} />;
                      }

                      return (
                        <Message
                          key={i}
                          authenticatedUser={authenticatedUser}
                          displayedEmoji={DisplayedEmoji}
                          message={m}
                          messageTheme={getMessageTheme(conversationTheme)}
                          user={
                            instanceOfUserWithMessage(user.userById)
                              ? user.userById.user
                              : user.userById
                          }
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
      {instanceOfUserWithMessage(user.userById) ? (
        <Footer.Blocked>You can't reply to this conversation.</Footer.Blocked>
      ) : (
        <Footer.Normal>
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
            <MdPhotoLibrary
              color={getMessageTheme(conversationTheme)}
              size={24}
            />
          </label>
          <Input
            isAuthenticated={!!authenticatedUser}
            placeholder="Aa"
            ref={inputRef}
            theme={theme}
            onChange={handleInputChange}
          />
          {footerIcon === "SEND" ? (
            <SendIcon
              color={getMessageTheme(conversationTheme)}
              size={24}
              onClick={() => {
                addMessage({
                  variables: {
                    input: {
                      emoji: null,
                      parentId: null,
                      receiverId: userId,
                      senderId: authenticatedUser?.id,
                      text: inputRef.current.value,
                    },
                  },
                  onCompleted: ({ addMessage: newMessage }) => {
                    inputRef.current.value = "";

                    if (authenticatedUser && newMessage) {
                      setAuthenticatedUser({
                        ...authenticatedUser,
                        messages: [...authenticatedUser.messages, newMessage],
                      });
                    }

                    setFooterIcon("THUMB_UP");
                    return;
                  },
                });
              }}
            />
          ) : (
            <DisplayedEmoji
              color={getMessageTheme(conversationTheme)}
              size={24}
              style={{ userSelect: "none" }}
              onClick={() => {
                addMessage({
                  variables: {
                    input: {
                      emoji: Emoji.LIKE,
                      parentId: null,
                      receiverId: userId,
                      senderId: authenticatedUser?.id,
                      text: null,
                    },
                  },
                  onCompleted: ({ addMessage: newMessage }) => {
                    inputRef.current.value = "";

                    if (authenticatedUser && newMessage) {
                      setAuthenticatedUser({
                        ...authenticatedUser,
                        messages: [...authenticatedUser.messages, newMessage],
                      });
                    }

                    setFooterIcon("THUMB_UP");
                    return;
                  },
                });
              }}
            />
          )}
        </Footer.Normal>
      )}
    </>
  );
}
