import { useLazyQuery, useMutation } from "@apollo/client";

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
  Divider,
  PostComments,
  PostOptionsList,
  PostPhotos,
  ReactionEmojis,
  UserPhoto,
  WriteComment,
} from "components";
import { Colors } from "environment";
import {
  ADD_POST_COMMENT,
  ADD_POST_REACTION,
  GET_FRIENDS_POSTS_BY_USER_ID,
  GET_POST,
  REMOVE_POST_REACTION,
  UPDATE_POST_REACTION,
  getTimePassedFromDateTime,
  GetPostData,
  AddPostCommentData,
  AddPostReactionData,
  RemovePostReactionData,
  UpdatePostReactionData,
} from "helpers";
import { ReactionType, User } from "models";
import { useMessagesStore, useSettingsStore } from "store";

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
  PostOwnerName,
  PostText,
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
  authenticatedUser?: User;
  id: string;
}

export function UserPost({ authenticatedUser, id: postId }: Props) {
  const [addPostComment] = useMutation<AddPostCommentData>(ADD_POST_COMMENT, {
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
  const [fetchPost, { data: post = { post: null } }] =
    useLazyQuery<GetPostData>(GET_POST);
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
  const [updatePostReaction] = useMutation<UpdatePostReactionData>(
    UPDATE_POST_REACTION,
    {
      refetchQueries: [
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: authenticatedUser?.id },
        },
      ],
    }
  );

  useEffect(() => {
    fetchPost({ variables: { id: postId } });
  }, [postId, fetchPost]);

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
    closePostOptionsList,
    closeSettingsList,
    openPostOptionsList,
  } = useSettingsStore();

  useEffect(() => {
    const hasUserReaction =
      post.post?.reactions?.some(
        (reaction) => reaction.owner.id === authenticatedUser?.id
      ) || false;

    setHasReacted(hasUserReaction);
  }, [authenticatedUser, post.post]);

  useEffect(() => {
    const textContainerHeight = textContainerRef.current?.offsetHeight;
    const textContainerLineHeight = parseInt(
      textContainerRef.current?.style.lineHeight
    );
    const numberOfLines = textContainerHeight / textContainerLineHeight;

    setIsTextCompletelyVisible(numberOfLines <= 5);
  }, [post.post?.text]);

  useEffect(() => {
    const count = getPostReactionsCount(post.post?.reactions || null);
    setPostReactionsCount(count);
  }, [post.post?.reactions]);

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
          reactions: post.post?.reactions || null,
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
      openPostOptionsList(postId);
    } else {
      closePostOptionsList();
    }
  }

  function handleReactionClick() {
    if (hasReacted) {
      removePostReaction({
        variables: { input: { ownerId: authenticatedUser?.id, postId } },
      });
    } else {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType: ReactionType.LIKE,
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
      reactions: post.post?.reactions || null,
    });

    if (!currentReaction) {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType: newReactionType,
          },
        },
      });
    } else if (currentReaction.type !== newReactionType) {
      updatePostReaction({
        variables: {
          input: {
            ownerId: authenticatedUser?.id,
            postId,
            reactionType: newReactionType,
          },
        },
      });
    } else {
      removePostReaction({
        variables: {
          input: { ownerId: authenticatedUser?.id, postId },
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

  if (!post.post) {
    return <></>;
  }

  const { comments, dateTime, owner, photos, reactions, shares, text } =
    post.post;

  const postOwnerNameText = `${owner.firstName} ${owner.lastName}`;

  return (
    <Container vertical>
      <Header>
        <StyledContainer.PostOwner>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${owner.username}`)}
          />
          <div>
            <PostOwnerName onClick={() => navigate(`/${owner.username}`)}>
              {postOwnerNameText}
            </PostOwnerName>
            <p style={{ cursor: "default" }}>
              {getTimePassedFromDateTime(dateTime, "POST")}
            </p>
          </div>
        </StyledContainer.PostOwner>
        <StyledContainer.MoreOptionsIcon>
          <MdMoreHoriz
            color={Colors.PhilippineGray}
            size="1.5em"
            onClick={handleMoreOptionsClick}
          />
        </StyledContainer.MoreOptionsIcon>
      </Header>
      <div
        ref={textContainerRef}
        style={{ lineHeight: "21px", position: "relative" }}
      >
        {isPostOptionsListVisible &&
          postId === isPostOptionsListVisible.postId && (
            <PostOptionsList postOwner={owner} />
          )}
        <PostText
          style={
            !isTextCompletelyVisible
              ? {
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }
              : undefined
          }
        >
          {text}
        </PostText>
        {!isTextCompletelyVisible && (
          <span
            onClick={() => {
              setIsTextCompletelyVisible((prev) => !prev);
            }}
          >
            See more
          </span>
        )}
      </div>
      <PostPhotos photos={photos} />
      {((comments && comments?.length > 0) ||
        (reactions && reactions?.length > 0) ||
        (shares && shares?.length > 0)) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            ref={emojisAndReactionsContainerRef}
            style={{
              display: "flex",
            }}
          >
            <div
              ref={emojisContainerRef}
              style={{ display: "flex", gap: "0.25em" }}
            >
              {postReactionsEmojis}
            </div>
            {reactions && <p>{reactions.length}</p>}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {comments && comments.length > 0 && (
              <p>{getCommentsText(comments.length)}</p>
            )}
            {shares && shares.length > 0 && (
              <p>{getSharesText(shares.length)}</p>
            )}
          </div>
        </div>
      )}
      <Divider thickness="2px" />
      <StyledContainer.Buttons>
        <Button
          style={{ color: getButtonColor(ButtonTypes.REACTION) }}
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
                })?.type,
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
        {(isHoveringOverEmojis || isHoveringOverReactionButton) && (
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
          style={{ color: getButtonColor(ButtonTypes.COMMENT) }}
          onClick={() => {
            setIsWriteCommentVisible((prev) => !prev);
          }}
        >
          <BiComment size={24} />
          Comment
        </Button>
        <Button style={{ color: getButtonColor(ButtonTypes.SHARE) }}>
          <RiShareForwardLine size={24} />
          Share
        </Button>
      </StyledContainer.Buttons>
      {((comments && comments?.length > 0) || isWriteCommentVisible) && (
        <Divider thickness="2px" />
      )}
      {isWriteCommentVisible && (
        <WriteComment
          authenticatedUser={authenticatedUser || null}
          autoFocus
          placeholder="Write a comment..."
          style={{ marginTop: "0.5em" }}
          onCancelClick={() => {
            setIsWriteCommentVisible((prev) => !prev);
          }}
          onSendClick={(commentText) => {
            addPostComment({
              variables: {
                input: {
                  commentOwnerId: authenticatedUser?.id,
                  postId,
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
        authenticatedUser={authenticatedUser}
        comments={comments}
        postId={postId}
        postOwnerId={owner.id}
      />
    </Container>
  );
}
