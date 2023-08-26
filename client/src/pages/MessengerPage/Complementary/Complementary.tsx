import { useMutation } from "@apollo/client";

import { useState } from "react";
import { IconType } from "react-icons";
import { BsPersonSlash, BsSearch } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { IoTextOutline } from "react-icons/io5";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  CollapsibleList,
  EmojisModal,
  NicknamesModal,
  ThemesModal,
  UserPhoto,
} from "components";
import {
  GET_CONVERSATION_BETWEEN,
  UPDATE_CONVERSATION_EMOJI,
  UPDATE_CONVERSATION_NICKNAME,
  UPDATE_CONVERSATION_THEME,
  UpdateConversationEmojiData,
  UpdateConversationNicknameData,
  UpdateConversationThemeData,
} from "helpers";
import { Conversation, User } from "models";

import { getMessageTheme } from "../MessengerPage.helpers";

import { Container, StyledUser } from "./Complementary.style";
import { MediaFiles } from "./MediaFiles";

interface Props {
  authenticatedUser: User | null;
  conversation: Conversation | null;
  displayedEmoji: IconType;
  displayedName: string | null | undefined;
  user: User | null;
}

export function Complementary({
  authenticatedUser,
  conversation,
  displayedEmoji: DisplayedEmoji,
  displayedName,
  user,
}: Props) {
  const [updateConversationEmoji] = useMutation<UpdateConversationEmojiData>(
    UPDATE_CONVERSATION_EMOJI
  );
  const [updateConversationNickname] =
    useMutation<UpdateConversationNicknameData>(UPDATE_CONVERSATION_NICKNAME);
  const [updateConversationTheme] = useMutation<UpdateConversationThemeData>(
    UPDATE_CONVERSATION_THEME
  );

  const [isEmojisModalVisible, setIsEmojisModalVisible] = useState(false);
  const [isFilesSelected, setIsFilesSelected] = useState(false);
  const [isMediaSelected, setIsMediaSelected] = useState(false);
  const [isNicknamesModalVisible, setIsNicknameModalVisible] = useState(false);
  const [isThemesModalVisible, setIsThemesModalVisible] = useState(false);

  const navigate = useNavigate();

  const {
    emoji,
    files,
    first,
    firstNickname,
    media,
    second,
    secondNickname,
    theme,
  } = {
    ...conversation,
  };
  const { id: userId, username } = { ...user };

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
            user={user}
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
              <UserPhoto containerSize="4em" iconSize="2em" user={user} />
              <StyledUser.Container.Details>
                <StyledUser.DisplayedName
                  onClick={() => {
                    if (username) {
                      navigate(`/${username}`);
                    }
                  }}
                >
                  {displayedName}
                </StyledUser.DisplayedName>
                {(isAuthenticatedUser || isAuthenticatedUserFriend) && (
                  <StyledUser.Active>Active 47m ago</StyledUser.Active>
                )}
              </StyledUser.Container.Details>
            </StyledUser.Container.Main>
            <Container.Options>
              {(isAuthenticatedUser || isAuthenticatedUserFriend) && (
                <CollapsibleList
                  items={[
                    {
                      icon: FaDotCircle,
                      iconColor: getMessageTheme(theme),
                      text: "Change theme",
                      onClick: () => {
                        if (!isThemesModalVisible) {
                          setIsThemesModalVisible((value) => !value);
                        }
                      },
                    },
                    {
                      icon: DisplayedEmoji,
                      text: "Change emoji",
                      onClick: () => {
                        if (!isEmojisModalVisible) {
                          setIsEmojisModalVisible((value) => !value);
                        }
                      },
                    },
                    {
                      icon: IoTextOutline,
                      text: "Edit nicknames",
                      onClick: () => {
                        if (!isNicknamesModalVisible) {
                          setIsNicknameModalVisible((value) => !value);
                        }
                      },
                    },
                    {
                      icon: BsSearch,
                      text: "Search in conversation",
                      onClick: () => {
                        // TODO
                      },
                    },
                  ]}
                  label="Customize chat"
                />
              )}
              <CollapsibleList
                items={[
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
                ]}
                label="Media & files"
              />
              <CollapsibleList
                items={[
                  {
                    icon: BsPersonSlash,
                    text: "Block",
                    onClick: () => {
                      // TODO
                    },
                  },
                ]}
                label="Privacy & support"
              />
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
          authenticatedUser={authenticatedUser}
          conversation={conversation}
          user={user}
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
                  input: { nickname: newNickname, userId: matchedUserId },
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
          selectedItem={theme}
          onCloseClick={() => {
            if (isThemesModalVisible) {
              setIsThemesModalVisible((value) => !value);
            }
          }}
          onSaveClick={(selectedTheme) => {
            if (selectedTheme !== theme) {
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
