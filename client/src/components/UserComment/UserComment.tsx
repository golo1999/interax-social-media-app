import { gql, useMutation } from "@apollo/client";

import { CSSProperties, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ReactionEmojis, UserPhoto, WriteComment } from "../../components";
import { getTimeFromDate } from "../../helpers";
import { useCommentReplies } from "../../hooks";
import { Comment, ReactionType, User } from "../../models";
import { GET_FRIENDS_POSTS_BY_USER_ID } from "../../sections/Posts/Posts";

import {
  getInitialHasReacted,
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

const ADD_COMMENT_REACTION = gql`
  mutation AddCommentReaction($input: AddCommentReactionInput!) {
    addCommentReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

const REMOVE_COMMENT_REACTION = gql`
  mutation RemoveCommentReaction($input: RemoveCommentReactionInput!) {
    removeCommentReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

const UPDATE_COMMENT_REACTION = gql`
  mutation UpdateCommentReaction($input: UpdateCommentReactionInput!) {
    updateCommentReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

interface Props {
  authenticatedUser?: User;
  comment: Comment;
  postOwnerId: string;
  replyLevel?: number;
  onDeleteClick: () => void;
}

export function UserComment({
  authenticatedUser,
  comment,
  postOwnerId,
  replyLevel = 0,
  onDeleteClick,
}: Props) {
  const [addCommentReaction] = useMutation(ADD_COMMENT_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [removeCommentReaction] = useMutation(REMOVE_COMMENT_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [updateCommentReaction] = useMutation(UPDATE_COMMENT_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });

  const { dateTime, id: commentId, owner, reactions, replies, text } = comment;

  const [hasReacted, setHasReacted] = useState<boolean>(
    getInitialHasReacted({ currentUserId: authenticatedUser?.id, reactions })
  );
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionText, setIsHoveringOverReactionText] =
    useState(false);
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(false);

  const navigate = useNavigate();

  let commentReactionTimer: ReturnType<typeof setTimeout>;

  function getOuterContainerStyle(): CSSProperties {
    return {
      marginLeft: `calc(${replyLevel} * 2em + ${replyLevel} * 5px)`,
    };
  }

  function getReactionTextStyle(): CSSProperties {
    return {
      color: hasReacted
        ? getReactionTextColor({
            reactions,
            currentUserId: authenticatedUser?.id,
          })
        : "#8d8f93",
      fontWeight: "bold",
    };
  }

  function handleMoreOptionsClick() {
    onDeleteClick();
    console.log("more options clicked");
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

    setHasReacted((prev) => !prev);

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

  function handleReactionEmojisClick(reactionType: ReactionType) {
    const currentReaction = getUserCommentReaction({
      currentUserId: authenticatedUser?.id,
      reactions,
    });

    if (!currentReaction) {
      addCommentReaction({
        variables: {
          input: {
            commentId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType,
          },
        },
      });
      if (!hasReacted) {
        setHasReacted((prev) => !prev);
      }
    } else if (currentReaction.type !== reactionType) {
      updateCommentReaction({
        variables: {
          input: { commentId, ownerId: authenticatedUser?.id, reactionType },
        },
      });
    } else {
      removeCommentReaction({
        variables: {
          input: { commentId, reactionOwnerId: authenticatedUser?.id },
        },
      });
      if (hasReacted) {
        setHasReacted((prev) => !prev);
      }
    }
  }

  function handleReplyClick() {
    setIsWriteReplyVisible((prev) => !prev);
  }

  function toggleIsMoreOptionsVisible() {
    setIsMoreOptionsVisible((prev) => !prev);
  }

  const commentReplies = useCommentReplies({
    authenticatedUser,
    level: replyLevel,
    postOwnerId,
    replies,
  });

  const isCommentOwner = comment.owner.id === authenticatedUser?.id;
  const isPostOwner = postOwnerId === owner.id;

  return (
    <OuterContainer style={getOuterContainerStyle()}>
      <InnerContainer
        onMouseOver={toggleIsMoreOptionsVisible}
        onMouseOut={toggleIsMoreOptionsVisible}
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
                  }, 500);
                }}
                onMouseLeave={() => {
                  if (commentReactionTimer) {
                    clearTimeout(commentReactionTimer);
                    return;
                  }

                  if (isHoveringOverReactionText) {
                    setTimeout(() => {
                      setIsHoveringOverReactionText((prev) => !prev);
                    }, 500);
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
                    }, 500);
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
                onClick={handleReplyClick}
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
          placeholder="Write a reply..."
          style={{
            marginLeft: "calc(2em + 5px)",
          }}
          user={authenticatedUser}
          onCancelClick={handleReplyClick}
          onSendClick={() => {
            console.log("send clicked");
          }}
        />
      )}
      {commentReplies}
    </OuterContainer>
  );
}
