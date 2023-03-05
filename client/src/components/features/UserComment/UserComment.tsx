import { useLazyQuery, useMutation } from "@apollo/client";

import { CSSProperties, useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ReactionEmojis, UserPhoto, WriteComment } from "components";
import {
  ADD_COMMENT_REACTION,
  ADD_COMMENT_REPLY,
  GET_COMMENT,
  GET_COMMENT_REPLIES,
  GET_FRIENDS_POSTS_BY_USER_ID,
  REMOVE_COMMENT_REACTION,
  UPDATE_COMMENT_REACTION,
  getTimeFromDate,
} from "helpers";
import { useCommentReplies } from "hooks";
import { Comment, Reaction, ReactionType, User } from "models";

import {
  getReactionText,
  getReactionTextColor,
  getUserCommentReaction,
} from "./UserComment.helpers";
import {
  InnerContainer,
  OuterContainer,
  OwnerDetails,
  Reactions,
} from "./UserComment.style";

interface AddCommentReactionProps {
  addCommentReaction: Reaction | null;
}

interface GetCommentProps {
  comment: Comment | null;
}

interface GetCommentRepliesProps {
  commentReplies: Comment[] | null;
}

interface RemoveCommentReactionProps {
  removeCommentReaction: Reaction | null;
}

interface UpdateCommentReactionProps {
  updateCommentReaction: Reaction | null;
}

interface Props {
  authenticatedUser?: User;
  id: string;
  postOwnerId: string;
  replyLevel?: number;
  onDeleteClick: (id: string) => void;
}

export function UserComment({
  authenticatedUser,
  id: commentId,
  postOwnerId,
  replyLevel = 0,
  onDeleteClick,
}: Props) {
  const [fetchComment, { data: comment = { comment: null } }] =
    useLazyQuery<GetCommentProps>(GET_COMMENT);
  const [fetchCommentReplies] =
    useLazyQuery<GetCommentRepliesProps>(GET_COMMENT_REPLIES);

  const [addCommentReaction] = useMutation<AddCommentReactionProps>(
    ADD_COMMENT_REACTION,
    {
      refetchQueries: [
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: authenticatedUser?.id },
        },
      ],
    }
  );
  const [addCommentReply] = useMutation(ADD_COMMENT_REPLY, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
      { query: GET_COMMENT_REPLIES, variables: { commentId } },
    ],
  });
  const [removeCommentReaction] = useMutation<RemoveCommentReactionProps>(
    REMOVE_COMMENT_REACTION,
    {
      refetchQueries: [
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: authenticatedUser?.id },
        },
      ],
    }
  );
  const [updateCommentReaction] = useMutation<UpdateCommentReactionProps>(
    UPDATE_COMMENT_REACTION,
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
    fetchComment({ variables: { id: commentId } });
  }, [commentId, fetchComment]);

  const [hasReacted, setHasReacted] = useState(false);
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionText, setIsHoveringOverReactionText] =
    useState(false);
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const commentHasUserReaction =
      comment.comment?.reactions?.some(
        (reaction) => reaction.owner.id === authenticatedUser?.id
      ) || false;

    setHasReacted(commentHasUserReaction);
  }, [authenticatedUser, comment.comment]);

  let commentReactionTimer: ReturnType<typeof setTimeout>;

  function getOuterContainerStyle(): CSSProperties {
    return {
      marginLeft: replyLevel > 0 ? "calc(2em + 5px)" : undefined,
    };
  }

  function getReactionTextStyle(): CSSProperties {
    const color = getReactionTextColor({
      reactions: comment.comment?.reactions || null,
      currentUserId: authenticatedUser?.id,
    });

    return {
      color: hasReacted ? color : "#8d8f93",
      fontWeight: "bold",
    };
  }

  function handleMoreOptionsClick() {
    onDeleteClick(commentId);
  }

  function handleReactionClick() {
    if (hasReacted) {
      removeCommentReaction({
        variables: {
          input: { commentId, reactionOwnerId: authenticatedUser?.id },
        },
      });
    } else {
      addCommentReaction({
        variables: {
          input: {
            commentId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType: ReactionType.LIKE,
          },
        },
      });
    }

    if (commentReactionTimer) {
      clearTimeout(commentReactionTimer);
      return;
    }

    if (isHoveringOverEmojis) {
      setIsHoveringOverEmojis((prev) => !prev);
    }
    if (isHoveringOverReactionText) {
      setIsHoveringOverReactionText((prev) => !prev);
    }
  }

  function handleReactionEmojisClick(newReactionType: ReactionType) {
    const currentReaction = getUserCommentReaction({
      currentUserId: authenticatedUser?.id,
      reactions: comment.comment?.reactions || null,
    });

    if (!currentReaction) {
      addCommentReaction({
        variables: {
          input: {
            commentId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType: newReactionType,
          },
        },
      });
    } else if (currentReaction.type !== newReactionType) {
      updateCommentReaction({
        variables: {
          input: {
            commentId,
            ownerId: authenticatedUser?.id,
            postId: comment?.comment?.postId,
            reactionType: newReactionType,
          },
        },
      });
    } else {
      removeCommentReaction({
        variables: {
          input: { commentId, reactionOwnerId: authenticatedUser?.id },
        },
      });
    }
  }

  const commentReplies = useCommentReplies({
    authenticatedUser,
    commentId,
    level: replyLevel,
    postOwnerId,
  });

  if (!comment.comment) {
    return <></>;
  }

  const { dateTime, owner, reactions, text } = comment.comment;

  const isCommentOwner = owner.id === authenticatedUser?.id;
  const isPostOwner = postOwnerId === owner.id;

  return (
    <OuterContainer style={getOuterContainerStyle()}>
      <InnerContainer
        onMouseOver={() => {
          setIsMoreOptionsVisible((prev) => !prev);
        }}
        onMouseOut={() => {
          setIsMoreOptionsVisible((prev) => !prev);
        }}
      >
        <div style={{ display: "flex", gap: "0.5em" }}>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${owner.username}`)}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <OwnerDetails.Container>
              {isPostOwner && <OwnerDetails.Badge>Author</OwnerDetails.Badge>}
              <OwnerDetails.Name onClick={() => navigate(`/${owner.username}`)}>
                {owner.firstName} {owner.lastName}
              </OwnerDetails.Name>
              <p>{text}</p>
            </OwnerDetails.Container>
            <Reactions.Container>
              <p
                style={getReactionTextStyle()}
                onClick={handleReactionClick}
                onMouseEnter={() => {
                  commentReactionTimer = setTimeout(() => {
                    setIsHoveringOverReactionText((prev) => !prev);
                  }, 750);
                }}
                onMouseLeave={() => {
                  if (commentReactionTimer) {
                    clearTimeout(commentReactionTimer);
                    return;
                  }

                  if (isHoveringOverReactionText) {
                    setTimeout(() => {
                      setIsHoveringOverReactionText((prev) => !prev);
                    }, 750);
                  }
                }}
              >
                {getReactionText({
                  hasReacted,
                  reactions,
                  currentUserId: authenticatedUser?.id,
                })}
              </p>
              {(isHoveringOverEmojis || isHoveringOverReactionText) && (
                <ReactionEmojis
                  size={32}
                  style={{
                    left: "-5px",
                    top: "-48px",
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
              <p
                style={{ color: "#8d8f93", fontWeight: "bold" }}
                onClick={() => {
                  setIsWriteReplyVisible((prev) => !prev);
                }}
              >
                Reply
              </p>
              <p>{getTimeFromDate(dateTime)}</p>
              {reactions && <p>{reactions.length}</p>}
            </Reactions.Container>
          </div>
        </div>
        {isCommentOwner && (
          <MdMoreHoriz
            color="#8d8f93"
            style={{
              visibility: isMoreOptionsVisible ? "visible" : "hidden",
            }}
            onClick={handleMoreOptionsClick}
          />
        )}
      </InnerContainer>
      {isWriteReplyVisible && (
        <WriteComment
          autoFocus
          placeholder="Write a reply..."
          style={{
            marginLeft: "calc(2em + 5px)",
            marginTop: "0.5em",
          }}
          user={authenticatedUser}
          onCancelClick={() => {
            setIsWriteReplyVisible((prev) => !prev);
          }}
          onSendClick={(commentText) => {
            addCommentReply({
              variables: {
                input: {
                  commentId,
                  ownerId: authenticatedUser?.id,
                  text: commentText,
                },
              },
              onCompleted: () => {
                fetchCommentReplies({
                  variables: { commentId },
                });
                setIsWriteReplyVisible((prev) => !prev);
              },
            });
          }}
        />
      )}
      {commentReplies}
    </OuterContainer>
  );
}
