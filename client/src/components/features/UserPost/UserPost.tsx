import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Divider } from "@mui/material";

import {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import { RiShareForwardFill, RiShareForwardLine } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { useMatch, useNavigate } from "react-router-dom";

import {
  ConfirmationModal,
  Container,
  PostComments,
  PostOptionsList,
  PostPhotos,
  ReactionEmojis,
  UserPhoto,
  WriteComment,
} from "components";
import { Permission, ReactionType } from "enums";
import { Colors } from "environment";
import {
  ADD_COMMENT,
  ADD_POST_REACTION,
  REMOVE_POST_REACTION,
  getTimePassedFromDateTime,
  AddCommentData,
  AddPostReactionData,
  RemovePostReactionData,
  GET_POST,
  GetPostData,
  SHARE_POST,
  SharePostData,
  GET_USER_POSTS_BY_ID,
} from "helpers";
import { useScrollLock } from "hooks";
import {
  useAuthenticationStore,
  useMessagesStore,
  useModalStore,
  useSettingsStore,
} from "store";

import {
  getPostReactionsCount,
  getReactionButtonText,
  getReactionButtonTextColor,
  getReactionIcon,
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
  postId: string;
  onPostShared: () => void;
}

export function UserPost({ postId, onPostShared }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const isProfileRoute = useMatch("/:username");
  const {
    confirmationModalConfirmButtonText,
    confirmationModalMessage,
    confirmationModalTitle,
    isConfirmationModalOpen,
    sharedPostId,
    closeConfirmationModal,
    openConfirmationModal,
    setConfirmationModalConfirmButtonText,
    setConfirmationModalMessage,
    setSharedPostId,
  } = useModalStore();
  const [addComment] = useMutation<AddCommentData>(ADD_COMMENT);
  const [addPostReaction] = useMutation<AddPostReactionData>(
    ADD_POST_REACTION,
    {
      refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    }
  );
  const { data: postData = { post: null }, loading: isFetchingPostData } =
    useQuery<GetPostData>(GET_POST, {
      variables: { id: postId },
    });
  const [fetchParentPost, { data: parentPostData = { post: null } }] =
    useLazyQuery<GetPostData>(GET_POST);
  const [removePostReaction] = useMutation<RemovePostReactionData>(
    REMOVE_POST_REACTION,
    {
      refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    }
  );
  const [sharePost] = useMutation<SharePostData>(SHARE_POST);
  const navigate = useNavigate();
  const emojisAndReactionsContainerRef =
    useRef() as MutableRefObject<HTMLInputElement>;
  const emojisContainerRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionButton, setIsHoveringOverReactionButton] =
    useState(false);
  const [isTextCompletelyVisible, setIsTextCompletelyVisible] = useState(false);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [postReactionsCount, setPostReactionsCount] = useState<
    PostReactionCount[]
  >([]);
  const { isChatModalVisible, closeChatModal } = useMessagesStore();
  const { lockScroll, unlockScroll } = useScrollLock();
  const {
    isPostOptionsListVisible,
    isSettingsListVisible,
    theme,
    closePostOptionsList,
    closeSettingsList,
    openPostOptionsList,
  } = useSettingsStore();

  useEffect(() => {
    if (postData.post?.parentId) {
      fetchParentPost({ variables: { id: postData.post.parentId } });
    }
  }, [postData.post?.parentId, fetchParentPost]);

  useEffect(() => {
    const textContainerHeight = textContainerRef.current?.offsetHeight;
    const textContainerLineHeight = parseInt(
      textContainerRef.current?.style.lineHeight
    );
    const numberOfLines = textContainerHeight / textContainerLineHeight;

    setIsTextCompletelyVisible(numberOfLines <= 5);
  }, [postData.post?.text]);

  useEffect(() => {
    const count = getPostReactionsCount(postData.post?.reactions);
    setPostReactionsCount(count);
  }, [postData.post?.reactions]);

  useEffect(() => {
    const emojisCount = emojisContainerRef.current?.childNodes.length;
    const gap = emojisCount > 1 ? "1em" : "0.75em";

    if (emojisCount > 0) {
      emojisAndReactionsContainerRef.current.style.gap = gap;
    }
  }, [postReactionsCount]);

  let postReactionTimer: ReturnType<typeof setTimeout>;

  const hasAuthenticatedUserReacted =
    postData.post?.reactions?.some(
      ({ userId }) => userId === authenticatedUser?.id
    ) || false;

  function getButtonColor(buttonType: ButtonTypes): string {
    return buttonType === ButtonTypes.REACTION && hasAuthenticatedUserReacted
      ? getReactionButtonTextColor({
          currentUserId: authenticatedUser?.id,
          reactions,
        })
      : Colors.PhilippineGray;
  }

  function handleConfirmationModalCloseClick() {
    unlockScroll();
    setSharedPostId(undefined);
    closeConfirmationModal();
  }

  function handleMoreOptionsClick() {
    if (isChatModalVisible) {
      closeChatModal();
    }

    if (isSettingsListVisible) {
      closeSettingsList();
    }

    if (!isPostOptionsListVisible) {
      openPostOptionsList(postId);
    }
    // if the PostOptionsList is visible for another post
    else if (isPostOptionsListVisible.postId !== postId) {
      closePostOptionsList();
      openPostOptionsList(postId);
    }
    // if the PostOptionsList is visible for the same post
    else {
      closePostOptionsList();
    }
  }

  function handleReactionClick() {
    if (hasAuthenticatedUserReacted) {
      removePostReaction({
        variables: {
          input: { postId, userId: authenticatedUser?.id },
        },
      });
    } else {
      addPostReaction({
        variables: {
          input: {
            postId,
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
      setIsHoveringOverEmojis(false);
    }
    if (isHoveringOverReactionButton) {
      setIsHoveringOverReactionButton(false);
    }
  }

  function handleReactionEmojisClick(newReactionType: ReactionType) {
    const currentReaction = getUserPostReaction({
      currentUserId: authenticatedUser?.id,
      reactions,
    });

    if (!currentReaction || currentReaction.reactionType !== newReactionType) {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionType: newReactionType,
            userId: authenticatedUser?.id,
          },
        },
      });
    } else {
      removePostReaction({
        variables: {
          input: { postId, userId: authenticatedUser?.id },
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

  if (!postData.post) {
    return <></>;
  }

  const {
    comments,
    commentsCount,
    dateTime,
    owner,
    parentId,
    photos,
    reactions,
    receiver,
    shares,
    text,
  } = postData.post;
  const {
    firstName: ownerFirstName,
    lastName: ownerLastName,
    username: ownerUsername,
  } = owner;

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const moreOptionsIconColor =
    !!authenticatedUser && theme === "DARK" ? "PhilippineGray" : "GraniteGray";
  const postOwnerNameText = `${ownerFirstName} ${ownerLastName}`;

  const hasComments = comments && comments.length > 0;
  const hasReactions = reactions && reactions.length > 0;
  const hasShares = shares && shares.length > 0;

  if (isFetchingPostData) {
    return (
      <div>
        <p>Fetching post...</p>
      </div>
    );
  }

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
      {parentPostData.post && text && (
        <Text.PostText
          isAuthenticated={!!authenticatedUser}
          isCompletelyVisible={isTextCompletelyVisible}
          theme={theme}
        >
          {text}
        </Text.PostText>
      )}
      <StyledContainer.PostText
        ref={textContainerRef}
        // Getting the number of lines doesn't work
        // if the "line-height" property is set using styled-components
        style={{ lineHeight: "21px" }}
      >
        {isPostOptionsListVisible &&
          postId === isPostOptionsListVisible.postId && (
            <PostOptionsList
              parentId={parentId}
              postId={postId}
              postOwner={owner}
              postReceiver={receiver}
            />
          )}
        {parentPostData.post ? (
          <Container vertical>
            <Header>
              <StyledContainer.PostOwner>
                <UserPhoto
                  user={parentPostData.post.owner}
                  onPhotoClick={() =>
                    navigate(`/${parentPostData.post?.owner.username}`)
                  }
                />
                <div>
                  <Text.PostOwnerName
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                    onClick={() =>
                      navigate(`/${parentPostData.post?.owner.username}`)
                    }
                  >
                    {parentPostData.post.owner.firstName}{" "}
                    {parentPostData.post.owner.lastName}
                  </Text.PostOwnerName>
                  <Text.DateTime
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    {getTimePassedFromDateTime(
                      parentPostData.post.dateTime,
                      "POST"
                    )}
                  </Text.DateTime>
                </div>
              </StyledContainer.PostOwner>
            </Header>
            <StyledContainer.PostText
              ref={textContainerRef}
              // Getting the number of lines doesn't work
              // if the "line-height" property is set using styled-components
              style={{ lineHeight: "21px" }}
            >
              <Text.PostText
                isAuthenticated={!!authenticatedUser}
                isCompletelyVisible={isTextCompletelyVisible}
                theme={theme}
              >
                {parentPostData.post.text}
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
          </Container>
        ) : (
          <>
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
          </>
        )}
      </StyledContainer.PostText>
      <PostPhotos photos={photos} />
      {(hasComments || hasReactions || hasShares) && (
        <StyledContainer.CommentsReactionsShares>
          <StyledContainer.EmojisReactions ref={emojisAndReactionsContainerRef}>
            <StyledContainer.Emojis ref={emojisContainerRef}>
              {postReactionsEmojis}
            </StyledContainer.Emojis>
            {hasReactions && <p>{reactions.length}</p>}
          </StyledContainer.EmojisReactions>
          <StyledContainer.CommentsShares>
            {commentsCount > 0 && (
              <StyledContainer.Comments>
                {
                  <Text.CommentsCount>
                    {commentsCount}
                    <FaComment />
                  </Text.CommentsCount>
                }
                {!authenticatedUser && <BiComment size={18} />}
              </StyledContainer.Comments>
            )}
            {hasShares && (
              <StyledContainer.Shares>
                <Text.SharesCount>
                  {shares.length}
                  <RiShareForwardFill />
                </Text.SharesCount>
                {!authenticatedUser && <RiShareForwardLine size={18} />}
              </StyledContainer.Shares>
            )}
          </StyledContainer.CommentsShares>
        </StyledContainer.CommentsReactionsShares>
      )}
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <StyledContainer.Buttons>
        <Button
          isAuthenticated={!!authenticatedUser}
          style={{ color: getButtonColor(ButtonTypes.REACTION) }}
          theme={theme}
          onClick={handleReactionClick}
          onMouseEnter={() => {
            postReactionTimer = setTimeout(() => {
              setIsHoveringOverReactionButton(true);
            }, 750);
          }}
          onMouseLeave={() => {
            if (postReactionTimer) {
              clearTimeout(postReactionTimer);
              return;
            }

            if (isHoveringOverReactionButton) {
              setTimeout(() => {
                setIsHoveringOverReactionButton(false);
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
            hasReacted: hasAuthenticatedUserReacted,
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
                setIsHoveringOverEmojis(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHoveringOverEmojis(false);
                }, 750);
              }}
              onReactionClick={(reactionType) => {
                handleReactionEmojisClick(reactionType);
                if (isHoveringOverEmojis) {
                  setIsHoveringOverEmojis(false);
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
          onClick={() => {
            lockScroll();
            setSharedPostId(postId);
            setConfirmationModalConfirmButtonText("Share");
            setConfirmationModalMessage(
              "Are you sure you want to share this post?"
            );
            openConfirmationModal();
          }}
        >
          <RiShareForwardLine size={24} />
          Share
        </Button>
      </StyledContainer.Buttons>
      {(hasComments || isWriteCommentVisible) && (
        <Divider sx={{ borderColor: Colors[dividerColor] }} />
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
                  postId,
                  text: commentText,
                },
              },
              refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
              onCompleted: ({ addComment: newComment }) => {
                console.log({ newComment });
                setIsWriteCommentVisible((prev) => !prev);
              },
            });
          }}
        />
      )}
      {postData.post && hasComments && <PostComments post={postData.post} />}
      {postId === sharedPostId &&
        isConfirmationModalOpen &&
        createPortal(
          <ConfirmationModal
            confirmButtonText={confirmationModalConfirmButtonText}
            message={confirmationModalMessage}
            title={confirmationModalTitle}
            onCloseClick={handleConfirmationModalCloseClick}
            onConfirmClick={() => {
              handleConfirmationModalCloseClick();
              sharePost({
                variables: {
                  input: {
                    ownerId: authenticatedUser?.id,
                    // If the post is already shared, the parent post will be shared
                    // Otherwise, the post will be shared
                    postId: parentPostData.post
                      ? parentPostData.post?.id
                      : postId,
                    receiverId: authenticatedUser?.id,
                    visibility: Permission.PUBLIC,
                  },
                },
                onCompleted: onPostShared,
                // TODO: If isProfileRoute => GET_USER_POSTS_BY_ID for displaying the shared post
                // first: 1, after: first_post_cursor, userId
                // TODO: Get first post cursor and fetch the first post on the previous page
                // GET_POST: For updating the number of shares
                refetchQueries: [
                  {
                    query: GET_POST,
                    variables: {
                      id: parentPostData.post
                        ? parentPostData.post?.id
                        : postId,
                    },
                  },
                ],
              });
            }}
          />,
          document.body
        )}
    </Container>
  );
}
