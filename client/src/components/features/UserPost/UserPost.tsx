import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Container,
  PostComments,
  PostOptionsList,
  PostPhotos,
  ReactionEmojis,
  UserPhoto,
  WriteComment,
} from "components";
import { ReactionType } from "enums";
import { Colors } from "environment";
import {
  ADD_COMMENT,
  ADD_POST_REACTION,
  GET_FRIENDS_POSTS_BY_USER_ID,
  REMOVE_POST_REACTION,
  getTimePassedFromDateTime,
  AddCommentData,
  AddPostReactionData,
  RemovePostReactionData,
} from "helpers";
import { Post } from "models";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import {
  getCommentsText,
  getPostReactionsCount,
  getReactionButtonText,
  getReactionButtonTextColor,
  getReactionIcon,
  getSharesText,
  getUserPostReaction,
} from "./UserPost.helpers";
import {
  Button,
  Container as StyledContainer,
  Header,
  Text,
} from "./UserPost.style";

enum ButtonTypes {
  COMMENT,
  REACTION,
  SHARE,
}

interface PostReactionCount {
  count: number;
  icon: string;
  type: ReactionType;
}

interface Props {
  data: Post;
}

export function UserPost({ data }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addComment] = useMutation<AddCommentData>(ADD_COMMENT, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [addPostReaction] = useMutation<AddPostReactionData>(
    ADD_POST_REACTION,
    {
      refetchQueries: [
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: authenticatedUser?.id },
        },
      ],
    }
  );
  const [removePostReaction] = useMutation<RemovePostReactionData>(
    REMOVE_POST_REACTION,
    {
      refetchQueries: [
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: authenticatedUser?.id },
        },
      ],
    }
  );

  const navigate = useNavigate();
  const emojisAndReactionsContainerRef =
    useRef() as MutableRefObject<HTMLInputElement>;
  const emojisContainerRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [hasReacted, setHasReacted] = useState(false);
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionButton, setIsHoveringOverReactionButton] =
    useState(false);
  const [isTextCompletelyVisible, setIsTextCompletelyVisible] = useState(false);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [postReactionsCount, setPostReactionsCount] = useState<
    PostReactionCount[]
  >([]);
  const { isChatModalVisible, closeChatModal } = useMessagesStore();
  const {
    isPostOptionsListVisible,
    isSettingsListVisible,
    theme,
    closePostOptionsList,
    closeSettingsList,
    openPostOptionsList,
  } = useSettingsStore();

  useEffect(() => {
    const hasUserReaction =
      data.reactions.some(
        (reaction) => reaction.userId === authenticatedUser?.id
      ) || false;

    setHasReacted(hasUserReaction);
  }, [authenticatedUser, data]);

  useEffect(() => {
    const textContainerHeight = textContainerRef.current?.offsetHeight;
    const textContainerLineHeight = parseInt(
      textContainerRef.current?.style.lineHeight
    );
    const numberOfLines = textContainerHeight / textContainerLineHeight;

    setIsTextCompletelyVisible(numberOfLines <= 5);
  }, [data.text]);

  useEffect(() => {
    const count = getPostReactionsCount(data.reactions || null);
    setPostReactionsCount(count);
  }, [data.reactions]);

  useEffect(() => {
    const emojisCount = emojisContainerRef.current?.childNodes.length;
    const gap = emojisCount > 1 ? "1em" : "0.75em";

    if (emojisCount > 0) {
      emojisAndReactionsContainerRef.current.style.gap = gap;
    }
  }, [postReactionsCount]);

  let postReactionTimer: ReturnType<typeof setTimeout>;

  function getButtonColor(buttonType: ButtonTypes): string {
    return buttonType === ButtonTypes.REACTION && hasReacted
      ? getReactionButtonTextColor({
          currentUserId: authenticatedUser?.id,
          reactions: data.reactions || null,
        })
      : Colors.PhilippineGray;
  }

  function handleMoreOptionsClick() {
    if (isChatModalVisible) {
      closeChatModal();
    }

    if (isSettingsListVisible) {
      closeSettingsList();
    }

    if (!isPostOptionsListVisible) {
      openPostOptionsList(data.id);
    }
    // if the PostOptionsList is visible for another post
    else if (isPostOptionsListVisible.postId !== data.id) {
      closePostOptionsList();
      openPostOptionsList(data.id);
    }
    // if the PostOptionsList is visible for the same post
    else {
      closePostOptionsList();
    }
  }

  function handleReactionClick() {
    if (hasReacted) {
      removePostReaction({
        variables: {
          input: { postId: data.id, userId: authenticatedUser?.id },
        },
      });
    } else {
      addPostReaction({
        variables: {
          input: {
            postId: data.id,
            reactionType: ReactionType.LIKE,
            userId: authenticatedUser?.id,
          },
        },
      });
    }

    if (postReactionTimer) {
      clearTimeout(postReactionTimer);
      return;
    }

    if (isHoveringOverEmojis) {
      setIsHoveringOverEmojis((prev) => !prev);
    }
    if (isHoveringOverReactionButton) {
      setIsHoveringOverReactionButton((prev) => !prev);
    }
  }

  function handleReactionEmojisClick(newReactionType: ReactionType) {
    const currentReaction = getUserPostReaction({
      currentUserId: authenticatedUser?.id,
      reactions: data.reactions || null,
    });

    if (!currentReaction || currentReaction.reactionType !== newReactionType) {
      addPostReaction({
        variables: {
          input: {
            postId: data.id,
            reactionType: newReactionType,
            userId: authenticatedUser?.id,
          },
        },
      });
    } else {
      removePostReaction({
        variables: {
          input: { postId: data.id, userId: authenticatedUser?.id },
        },
      });
    }
  }

  const postReactionsEmojis = useMemo(() => {
    return postReactionsCount.map((postReaction, index) => {
      if (index > 2) {
        return <Fragment key={index} />;
      } else if (index > 0) {
        // if the index is 1 or 2 and any previous type has at least 10 times more reactions than the current type
        // then an emoji should not be displayed
        for (let counter = 0; counter < index; ++counter) {
          if (postReactionsCount[counter].count / postReaction.count > 10) {
            return <Fragment key={index} />;
          }
        }
      }

      const { icon, type } = postReaction;

      const alt = type.slice(0, 1).concat(type.slice(1).toLowerCase());

      return <img key={index} alt={alt} height={24} src={icon} width={24} />;
    });
  }, [postReactionsCount]);

  const {
    comments,
    commentsCount,
    dateTime,
    owner,
    photos,
    reactions,
    receiver,
    shares,
    text,
  } = data;
  const {
    firstName: ownerFirstName,
    id: ownerId,
    lastName: ownerLastName,
    username: ownerUsername,
  } = owner;

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const moreOptionsIconColor =
    !!authenticatedUser && theme === "DARK" ? "PhilippineGray" : "GraniteGray";
  const postOwnerNameText = `${ownerFirstName} ${ownerLastName}`;

  return (
    <Container vertical>
      <Header>
        <StyledContainer.PostOwner>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${ownerUsername}`)}
          />
          <div>
            <Text.PostOwnerName
              isAuthenticated={!!authenticatedUser}
              theme={theme}
              onClick={() => navigate(`/${ownerUsername}`)}
            >
              {postOwnerNameText}
            </Text.PostOwnerName>
            <Text.DateTime isAuthenticated={!!authenticatedUser} theme={theme}>
              {getTimePassedFromDateTime(dateTime, "POST")}
            </Text.DateTime>
          </div>
        </StyledContainer.PostOwner>
        <StyledContainer.MoreOptionsIcon
          isAuthenticated={!!authenticatedUser}
          theme={theme}
        >
          <MdMoreHoriz
            color={moreOptionsIconColor}
            size="1.5em"
            onClick={handleMoreOptionsClick}
          />
        </StyledContainer.MoreOptionsIcon>
      </Header>
      <StyledContainer.PostText ref={textContainerRef}>
        {isPostOptionsListVisible &&
          data.id === isPostOptionsListVisible.postId && (
            <PostOptionsList
              postId={data.id}
              postOwner={owner}
              postReceiver={receiver}
            />
          )}
        <Text.PostText
          isAuthenticated={!!authenticatedUser}
          isCompletelyVisible={isTextCompletelyVisible}
          theme={theme}
        >
          {text}
        </Text.PostText>
        {!isTextCompletelyVisible && (
          <Text.SeeMore
            isAuthenticated={!!authenticatedUser}
            theme={theme}
            onClick={() => {
              setIsTextCompletelyVisible((prev) => !prev);
            }}
          >
            See more
          </Text.SeeMore>
        )}
      </StyledContainer.PostText>
      <PostPhotos photos={photos} />
      {(comments.length > 0 || reactions.length > 0 || shares.length > 0) && (
        <StyledContainer.CommentsReactionsShares>
          <StyledContainer.EmojisReactions ref={emojisAndReactionsContainerRef}>
            <StyledContainer.Emojis ref={emojisContainerRef}>
              {postReactionsEmojis}
            </StyledContainer.Emojis>
            {reactions.length > 0 && <p>{reactions.length}</p>}
          </StyledContainer.EmojisReactions>
          <StyledContainer.CommentsShares>
            {commentsCount > 0 && (
              <StyledContainer.Comments>
                {
                  <Text.CommentsCount>
                    {!!authenticatedUser
                      ? getCommentsText(commentsCount)
                      : commentsCount}
                  </Text.CommentsCount>
                }
                {!authenticatedUser && <BiComment size={18} />}
              </StyledContainer.Comments>
            )}
            {shares.length > 0 && (
              <StyledContainer.Shares>
                <Text.SharesCount>
                  {!!authenticatedUser
                    ? getSharesText(shares.length)
                    : shares.length}
                </Text.SharesCount>
                {!authenticatedUser && <RiShareForwardLine size={18} />}
              </StyledContainer.Shares>
            )}
          </StyledContainer.CommentsShares>
        </StyledContainer.CommentsReactionsShares>
      )}
      <Divider color={dividerColor} />
      <StyledContainer.Buttons>
        <Button
          isAuthenticated={!!authenticatedUser}
          style={{ color: getButtonColor(ButtonTypes.REACTION) }}
          theme={theme}
          onClick={handleReactionClick}
          onMouseEnter={() => {
            postReactionTimer = setTimeout(() => {
              setIsHoveringOverReactionButton((prev) => !prev);
            }, 750);
          }}
          onMouseLeave={() => {
            if (postReactionTimer) {
              clearTimeout(postReactionTimer);
              return;
            }

            if (isHoveringOverReactionButton) {
              setTimeout(() => {
                setIsHoveringOverReactionButton((prev) => !prev);
              }, 750);
            }
          }}
        >
          {getUserPostReaction({
            currentUserId: authenticatedUser?.id,
            reactions,
          }) ? (
            <img
              alt="Emoji"
              src={getReactionIcon({
                reactionType: getUserPostReaction({
                  currentUserId: authenticatedUser?.id,
                  reactions,
                })?.reactionType,
              })}
              height={24}
              width={24}
            />
          ) : (
            <AiOutlineLike size={24} />
          )}
          {getReactionButtonText({
            hasReacted,
            reactions,
            currentUserId: authenticatedUser?.id,
          })}
        </Button>
        {!!authenticatedUser &&
          (isHoveringOverEmojis || isHoveringOverReactionButton) && (
            <ReactionEmojis
              size={32}
              style={{
                left: "-5px",
                top: "-52px",
              }}
              onMouseEnter={() => {
                setIsHoveringOverEmojis((prev) => !prev);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHoveringOverEmojis((prev) => !prev);
                }, 750);
              }}
              onReactionClick={(reactionType) => {
                handleReactionEmojisClick(reactionType);
                if (isHoveringOverEmojis) {
                  setIsHoveringOverEmojis((prev) => !prev);
                }
              }}
            />
          )}
        <Button
          isAuthenticated={!!authenticatedUser}
          style={{ color: getButtonColor(ButtonTypes.COMMENT) }}
          theme={theme}
          onClick={() => {
            setIsWriteCommentVisible((prev) => !prev);
          }}
        >
          <BiComment size={24} />
          Comment
        </Button>
        <Button
          isAuthenticated={!!authenticatedUser}
          style={{ color: getButtonColor(ButtonTypes.SHARE) }}
          theme={theme}
        >
          <RiShareForwardLine size={24} />
          Share
        </Button>
      </StyledContainer.Buttons>
      {(comments.length > 0 || isWriteCommentVisible) && (
        <Divider color={dividerColor} />
      )}
      {isWriteCommentVisible && (
        <WriteComment
          autoFocus
          placeholder="Write a comment..."
          style={{ marginTop: "0.5em" }}
          onCancelClick={() => {
            setIsWriteCommentVisible((prev) => !prev);
          }}
          onSendClick={(commentText) => {
            addComment({
              variables: {
                input: {
                  commentOwnerId: authenticatedUser?.id,
                  parentId: null,
                  postId: data.id,
                  text: commentText,
                },
              },
              onCompleted: (data) => {
                console.log(data);
                setIsWriteCommentVisible((prev) => !prev);
              },
            });
          }}
        />
      )}
      <PostComments
        comments={comments}
        postId={data.id}
        postOwnerId={ownerId}
      />
    </Container>
  );
}
