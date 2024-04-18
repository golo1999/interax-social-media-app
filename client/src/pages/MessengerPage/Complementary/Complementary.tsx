import { useMutation } from "@apollo/client";

import { useCallback, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { BsPersonSlash } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoTextOutline } from "react-icons/io5";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  CollapsibleList,
  CollapsibleListItem,
  EmojisModal,
  NicknamesModal,
  ThemesModal,
  UserPhoto,
} from "components";
import {
  BLOCK_USER,
  BlockUserData,
  GET_CONVERSATION_BETWEEN,
  GET_USER_BY_ID,
  instanceOfUserWithMessage,
  REMOVE_USER_FRIEND,
  RemoveUserFriendData,
  UNFOLLOW_USER,
  UnfollowUserData,
  UPDATE_CONVERSATION_EMOJI,
  UPDATE_CONVERSATION_NICKNAME,
  UPDATE_CONVERSATION_THEME,
  UpdateConversationEmojiData,
  UpdateConversationNicknameData,
  UpdateConversationThemeData,
} from "helpers";
import { Conversation, User, UserWithMessage } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { getMessageTheme } from "../MessengerPage.helpers";

import { Container, StyledUser } from "./Complementary.style";
import { MediaFiles } from "./MediaFiles";

interface Props {
  conversation: Conversation | null;
  displayedEmoji: IconType;
  displayedName: string | null | undefined;
  user: User | UserWithMessage | null;
}

export function Complementary({
  conversation,
  displayedEmoji: DisplayedEmoji,
  displayedName,
  user,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [blockUser] = useMutation<BlockUserData>(BLOCK_USER);
  const [removeUserFriend] =
    useMutation<RemoveUserFriendData>(REMOVE_USER_FRIEND);
  const [unfollowUser] = useMutation<UnfollowUserData>(UNFOLLOW_USER);
  const [updateConversationEmoji] = useMutation<UpdateConversationEmojiData>(
    UPDATE_CONVERSATION_EMOJI
  );
  const [updateConversationNickname] =
    useMutation<UpdateConversationNicknameData>(UPDATE_CONVERSATION_NICKNAME);
  const [updateConversationTheme] = useMutation<UpdateConversationThemeData>(
    UPDATE_CONVERSATION_THEME
  );
  const navigate = useNavigate();
  const { theme } = useSettingsStore();
  const [isEmojisModalVisible, setIsEmojisModalVisible] = useState(false);
  const [isFilesSelected, setIsFilesSelected] = useState(false);
  const [isMediaSelected, setIsMediaSelected] = useState(false);
  const [isNicknamesModalVisible, setIsNicknameModalVisible] = useState(false);
  const [isThemesModalVisible, setIsThemesModalVisible] = useState(false);

  const handleChangeEmojiClick = useCallback(() => {
    if (!isEmojisModalVisible) {
      setIsEmojisModalVisible((value) => !value);
    }
  }, [isEmojisModalVisible]);

  const handleChangeThemeClick = useCallback(() => {
    if (!isThemesModalVisible) {
      setIsThemesModalVisible((value) => !value);
    }
  }, [isThemesModalVisible]);

  const handleEditNicknamesClick = useCallback(() => {
    if (!isNicknamesModalVisible) {
      setIsNicknameModalVisible((value) => !value);
    }
  }, [isNicknamesModalVisible]);

  const {
    emoji,
    files,
    first,
    firstNickname,
    id: conversationId,
    media,
    second,
    secondNickname,
    theme: conversationTheme,
  } = {
    ...conversation,
  };
  const { id: userId, username } = {
    ...(instanceOfUserWithMessage(user) ? user.user : user),
  };

  const chatCustomizationItems: CollapsibleListItem[] = useMemo(
    () =>
      !instanceOfUserWithMessage(user)
        ? [
            {
              icon: FaDotCircle,
              iconColor: getMessageTheme(conversationTheme),
              text: "Change theme",
              onClick: handleChangeThemeClick,
            },
            {
              icon: DisplayedEmoji,
              text: "Change emoji",
              onClick: handleChangeEmojiClick,
            },
            {
              icon: IoTextOutline,
              text: "Edit nicknames",
              onClick: handleEditNicknamesClick,
            },
            {
              icon: IoIosSearch,
              text: "Search in conversation",
              onClick: () => {
                // TODO
              },
            },
          ]
        : [
            {
              icon: IoIosSearch,
              text: "Search in conversation",
              onClick: () => {
                // TODO
              },
            },
          ],
    [
      conversationTheme,
      DisplayedEmoji,
      user,
      handleChangeEmojiClick,
      handleChangeThemeClick,
      handleEditNicknamesClick,
    ]
  );
  const mediaAndFilesItems: CollapsibleListItem[] = useMemo(
    () => [
      {
        icon: MdPhotoLibrary,
        text: "Media",
        onClick: () => {
          setIsMediaSelected((value) => !value);
        },
      },
      {
        icon: FiFileText,
        text: "Files",
        onClick: () => {
          setIsFilesSelected((value) => !value);
        },
      },
    ],
    []
  );
  const privacyAndSupportItems: CollapsibleListItem[] = useMemo(
    () => [
      {
        icon: BsPersonSlash,
        text: "Block",
        onClick: () => {
          // TODO
          blockUser({
            variables: {
              input: {
                blockedUserId: userId,
                userId: authenticatedUser?.id,
              },
            },
            refetchQueries: [
              {
                query: GET_USER_BY_ID,
                variables: {
                  input: {
                    id: userId,
                    returnUserIfBlocked: true,
                  },
                },
              },
            ],
            onCompleted: (data) => {
              console.log(data);
              removeUserFriend({
                variables: {
                  input: {
                    first: authenticatedUser?.id,
                    second: userId,
                  },
                },
                onCompleted: () => {
                  unfollowUser({
                    variables: {
                      input: {
                        followingUserId: userId,
                        userId: authenticatedUser?.id,
                      },
                    },
                  });
                  unfollowUser({
                    variables: {
                      input: {
                        followingUserId: authenticatedUser?.id,
                        userId: userId,
                      },
                    },
                  });
                },
              });
            },
          });
        },
      },
    ],
    [authenticatedUser?.id, userId, blockUser, removeUserFriend, unfollowUser]
  );

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const isAuthenticatedUser = userId === authenticatedUser?.id;
  const isAuthenticatedUserFriend =
    !!authenticatedUser?.friends?.find((friend) => friend.id === userId) ||
    false;

  return (
    <>
      <Container.Main>
        {isFilesSelected || isMediaSelected ? (
          <MediaFiles
            files={files}
            isAvailable={isAuthenticatedUser || isAuthenticatedUserFriend}
            media={media}
            selectedOption={isFilesSelected ? "FILES" : "MEDIA"}
            user={instanceOfUserWithMessage(user) ? user.user : user}
            onIconClick={() => {
              if (isFilesSelected) {
                setIsFilesSelected((value) => !value);
              } else {
                setIsMediaSelected((value) => !value);
              }
            }}
          />
        ) : (
          <>
            <StyledUser.Container.Main>
              <UserPhoto
                containerSize="4em"
                iconSize="2em"
                user={instanceOfUserWithMessage(user) ? user.user : user}
              />
              <StyledUser.Container.Details>
                <StyledUser.DisplayedName
                  {...themeProps}
                  onClick={() => {
                    if (!instanceOfUserWithMessage(user) && username) {
                      navigate(`/${username}`);
                    }
                  }}
                >
                  {displayedName}
                </StyledUser.DisplayedName>
                {(isAuthenticatedUser || isAuthenticatedUserFriend) &&
                  !instanceOfUserWithMessage(user) && (
                    <StyledUser.Active {...themeProps}>
                      Active 47m ago
                    </StyledUser.Active>
                  )}
              </StyledUser.Container.Details>
            </StyledUser.Container.Main>
            <Container.Options>
              {(isAuthenticatedUser ||
                isAuthenticatedUserFriend ||
                instanceOfUserWithMessage(user)) && (
                <CollapsibleList
                  items={chatCustomizationItems}
                  label="Customize chat"
                />
              )}
              <CollapsibleList
                items={mediaAndFilesItems}
                label="Media & files"
              />
              {!instanceOfUserWithMessage(user) && (
                <CollapsibleList
                  items={privacyAndSupportItems}
                  label="Privacy & support"
                />
              )}
            </Container.Options>
          </>
        )}
      </Container.Main>
      {isEmojisModalVisible && (
        <EmojisModal
          selectedItem={emoji}
          onCloseClick={() => {
            if (isEmojisModalVisible) {
              setIsEmojisModalVisible((value) => !value);
            }
          }}
          onSaveClick={(selectedEmoji) => {
            if (selectedEmoji !== emoji) {
              updateConversationEmoji({
                variables: { input: { emoji: selectedEmoji, first, second } },
                refetchQueries: [
                  {
                    query: GET_CONVERSATION_BETWEEN,
                    variables: {
                      input: {
                        first: authenticatedUser?.id,
                        second: userId,
                      },
                    },
                  },
                ],
              });
            }
          }}
        />
      )}
      {isNicknamesModalVisible && (
        <NicknamesModal
          conversation={conversation}
          user={instanceOfUserWithMessage(user) ? user.user : user}
          onCloseClick={() => {
            if (isNicknamesModalVisible) {
              setIsNicknameModalVisible((value) => !value);
            }
          }}
          onSaveClick={(id, nickname) => {
            if (
              (id === first && nickname !== firstNickname) ||
              (id === second && nickname !== secondNickname)
            ) {
              const matchedUserId = id === first ? first : second;
              const newNickname = nickname !== "" ? nickname : null;

              updateConversationNickname({
                variables: {
                  input: {
                    first,
                    nickname: newNickname,
                    second,
                    userId: matchedUserId,
                  },
                },
                refetchQueries: [
                  {
                    query: GET_CONVERSATION_BETWEEN,
                    variables: {
                      input: {
                        first: authenticatedUser?.id,
                        second: userId,
                      },
                    },
                  },
                ],
              });
            }
          }}
        />
      )}
      {isThemesModalVisible && (
        <ThemesModal
          selectedItem={conversationTheme}
          onCloseClick={() => {
            if (isThemesModalVisible) {
              setIsThemesModalVisible((value) => !value);
            }
          }}
          onSaveClick={(selectedTheme) => {
            if (selectedTheme !== conversationTheme) {
              updateConversationTheme({
                variables: { input: { first, second, theme: selectedTheme } },
                refetchQueries: [
                  {
                    query: GET_CONVERSATION_BETWEEN,
                    variables: {
                      input: {
                        first: authenticatedUser?.id,
                        second: userId,
                      },
                    },
                  },
                ],
              });
            }
          }}
        />
      )}
    </>
  );
}
