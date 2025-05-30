import { gql, useMutation, useQuery } from "@apollo/client";

import {
  ChangeEvent,
  Fragment,
  MutableRefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdPhotoLibrary } from "react-icons/md";

import { UserPhoto } from "components";
import { Emoji } from "enums";
import {
  ADD_MESSAGE,
  GET_CONVERSATION_BETWEEN,
  GET_USER_BY_ID,
  getDisplayedTime,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { MessagesWithUserId } from "models";
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
  const { authenticatedUser } = useAuthenticationStore();
  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          messages: (existingMessages = []) => {
            if (!data?.addMessage) {
              return existingMessages;
            }

            console.log({ data: data.addMessage });

            const newMessageRef = cache.writeFragment({
              data: data.addMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                }
              `,
            });
            const secondUserId =
              authenticatedUser!.id === data.addMessage.receiverId
                ? data.addMessage.senderId
                : data.addMessage.receiverId;
            const isFirstMessage = !existingMessages.some(
              (message: MessagesWithUserId) => message.userId === secondUserId
            );

            if (isFirstMessage) {
              return [
                ...existingMessages,
                { messages: [newMessageRef], userId: secondUserId },
              ];
            } else {
              // console.log("existingMessages", existingMessages);
              // const secondUserMessages = existingMessages.find(
              //   (message: MessagesWithUserId) => message.userId === secondUserId
              // );
              // console.log("secondUserMessages", secondUserMessages);
              // const filteredExistingMessages = existingMessages.filter(
              //   (message: MessagesWithUserId) =>
              //     message.userId !== secondUserMessages.userId
              // );
              // console.log("filteredExistingMessages", filteredExistingMessages);
              // console.log("1");

              // // secondUserMessages.messages.unshift({ ...newMessageRef });

              // // secondUserMessages.messages = [
              // //   newMessageRef,
              // //   ...secondUserMessages.messages,
              // // ];

              // // filteredExistingMessages.unshift({
              // //   ...secondUserMessages,
              // //   messages: [newMessageRef, ...secondUserMessages.messages],
              // // });
              // console.log("2");

              // filteredExistingMessages.unshift({
              //   ...secondUserMessages,
              //   messages: [newMessageRef, ...secondUserMessages.messages],
              // });

              // console.log("messages", filteredExistingMessages);
              // return filteredExistingMessages;

              const x = existingMessages.find(
                (message: MessagesWithUserId) => message.userId === secondUserId
              );
              console.log({ x });
              const y = { ...x, messages: [...x.messages, newMessageRef] };
              console.log({ y });
              const filteredExistingMessages = existingMessages.filter(
                (message: MessagesWithUserId) => message.userId !== secondUserId
              );
              const updatedExistingMessages = [y, ...filteredExistingMessages];
              console.log({ updatedExistingMessages });

              return updatedExistingMessages;

              // const x: MessagesWithUserId[] = existingMessages.map(
              //   (message: MessagesWithUserId) => {
              //     if (message.userId !== secondUserId) {
              //       return message;
              //     }

              //     return {
              //       ...message,
              //       messages: [newMessageRef, ...message.messages],
              //     };
              //   }
              // );

              // x.sort(
              //   (
              //     { messages: firstUserMessages },
              //     { messages: secondUserMessages }
              //   ) => {
              //     const firstUserLastMessage = firstUserMessages[0];
              //     const secondUserLastMessage = secondUserMessages[0];

              //     return +new Date(
              //       Number(secondUserLastMessage.dateTime) -
              //         +new Date(Number(firstUserLastMessage.dateTime))
              //     );
              //   }
              // );

              // return x;
            }
          },
        },
        id: cache.identify({ ...authenticatedUser }),
      });

      // TODO: Add message to second user's message list

      cache.modify({
        fields: {
          messages: (messageList = []) => {
            console.log({ messageList });
            return messageList;
          },
        },
        id: cache.identify({ ...authenticatedUser }),
      });
    },
  });
  const { data: conversation = { conversationBetween: null } } = useQuery(
    GET_CONVERSATION_BETWEEN,
    {
      variables: { input: { first: authenticatedUser!.id, second: userId } },
    }
  );
  const { data: user = { userById: null } } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        authenticatedUserId: authenticatedUser!.id,
        returnUserIfBlocked: true,
        userId,
      },
    },
  });
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { theme } = useSettingsStore();
  const [footerIcon, setFooterIcon] = useState<FooterIcon>("THUMB_UP");

  // Authenticated user's messages with the second user
  const filteredMessages = useMemo(
    () =>
      authenticatedUser?.messages.find((message) => message.userId === userId)
        ?.messages || [],
    [authenticatedUser?.messages, userId]
  );

  const uniqueDateTimes = useMemo(() => {
    const list: Date[] = [];

    filteredMessages.forEach((message) => {
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
  }, [filteredMessages]);

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
        {filteredMessages.length === 0 ? (
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
                {filteredMessages.length > 0 && (
                  <Container.Messages>
                    {filteredMessages.map((message, index) => {
                      if (instanceOfUserError(user.userById)) {
                        return <Fragment key={index} />;
                      }

                      const dt = new Date(
                        new Date(Number(message.dateTime)).setSeconds(0)
                      );

                      if (dt.toString() !== dateTime.toString()) {
                        return <Fragment key={index} />;
                      }

                      const userInstance = instanceOfUserWithMessage(
                        user.userById
                      )
                        ? user.userById.user
                        : user.userById;

                      return (
                        <Message
                          key={index}
                          authenticatedUser={authenticatedUser}
                          displayedEmoji={DisplayedEmoji}
                          message={message}
                          messageTheme={getMessageTheme(conversationTheme)}
                          user={userInstance}
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
                      receiverId: userId,
                      senderId: authenticatedUser!.id,
                      text: inputRef.current.value,
                    },
                  },
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
              color={getMessageTheme(conversationTheme)}
              size={24}
              style={{ userSelect: "none" }}
              onClick={() => {
                addMessage({
                  variables: {
                    input: {
                      emoji: Emoji.LIKE,
                      receiverId: userId,
                      senderId: authenticatedUser!.id,
                    },
                  },
                  onCompleted: () => {
                    inputRef.current.value = "";
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
