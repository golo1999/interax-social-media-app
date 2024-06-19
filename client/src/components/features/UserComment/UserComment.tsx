import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { CSSProperties, useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ReactionEmojis, UserPhoto, WriteComment } from "components";
import { ReactionType } from "enums";
import { Colors } from "environment";
import {
  ADD_COMMENT_REACTION,
  GET_COMMENT,
  GET_COMMENT_REPLIES,
  REMOVE_COMMENT_REACTION,
  getTimePassedFromDateTime,
  AddCommentReactionData,
  GetCommentRepliesData,
  RemoveCommentReactionData,
  GetCommentData,
  AddCommentData,
  ADD_COMMENT,
  GET_POST,
  GET_POST_COMMENTS,
} from "helpers";
import { Comment } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import {
  getReactionText,
  getReactionTextColor,
  getUserCommentReaction,
} from "./UserComment.helpers";
import { Container, Text } from "./UserComment.style";

interface Props {
  commentId: string;
  isTopLevel?: boolean;
  postId: string;
  postOwnerId: string;
  replyLevel?: number;
  onDeleteClick: (id: string) => void;
}

export function UserComment({
  commentId,
  isTopLevel = false,
  postId,
  postOwnerId,
  replyLevel = 0,
  onDeleteClick,
}: Props) {
  // console.log({ userCommentCommentId: commentId });
  const { authenticatedUser } = useAuthenticationStore();
  const [commentRepliesResponse, setCommentRepliesResponse] = useState<
    Comment[]
  >([]);
  const { data: commentData = { comment: null } } = useQuery<GetCommentData>(
    GET_COMMENT,
    {
      variables: { id: commentId },
    }
  );
  const [
    fetchCommentReplies,
    { loading: isFetchingCommentReplies, fetchMore },
  ] = useLazyQuery<GetCommentRepliesData>(GET_COMMENT_REPLIES);
  const [addComment] = useMutation<AddCommentData>(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
  });
  const [addCommentReaction] = useMutation<AddCommentReactionData>(
    ADD_COMMENT_REACTION,
    {
      refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    }
  );
  const [removeCommentReaction] = useMutation<RemoveCommentReactionData>(
    REMOVE_COMMENT_REACTION,
    {
      refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    }
  );
  const { theme } = useSettingsStore();

  useEffect(() => {
    if (isTopLevel) {
      fetchCommentReplies({
        notifyOnNetworkStatusChange: true,
        variables: { input: { commentId, first: 2 } },
        onCompleted: ({ commentReplies }) =>
          setCommentRepliesResponse(
            commentReplies.edges.map(({ node }) => node)
          ),
      });
    }
  }, [commentId, isTopLevel, fetchCommentReplies]);

  const [hasReacted, setHasReacted] = useState(false);
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionText, setIsHoveringOverReactionText] =
    useState(false);
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const commentHasUserReaction =
      commentData.comment?.reactions?.some(
        (reaction) => reaction.userId === authenticatedUser?.id
      ) || false;

    setHasReacted(commentHasUserReaction);
  }, [authenticatedUser, commentData.comment]);

  let commentReactionTimer: ReturnType<typeof setTimeout>;

  function getOuterContainerStyle(): CSSProperties {
    return {
      marginLeft: replyLevel > 0 ? "calc(2em + 5px)" : undefined,
    };
  }

  function getReactionTextStyle(): CSSProperties {
    const color = getReactionTextColor({
      reactions: commentData.comment?.reactions || null,
      currentUserId: authenticatedUser?.id,
    });

    return {
      color: hasReacted ? color : Colors.PhilippineGray,
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
          input: { commentId, userId: authenticatedUser?.id },
        },
      });
    } else {
      addCommentReaction({
        variables: {
          input: {
            commentId,
            reactionType: ReactionType.LIKE,
            userId: authenticatedUser?.id,
          },
        },
      });
    }

    if (commentReactionTimer) {
      clearTimeout(commentReactionTimer);
      return;
    }

    if (isHoveringOverEmojis) {
      setIsHoveringOverEmojis(false);
    }
    if (isHoveringOverReactionText) {
      setIsHoveringOverReactionText(false);
    }
  }

  function handleReactionEmojisClick(newReactionType: ReactionType) {
    const currentReaction = getUserCommentReaction({
      currentUserId: authenticatedUser?.id,
      reactions: commentData.comment?.reactions || null,
    });

    if (!currentReaction || currentReaction.reactionType !== newReactionType) {
      addCommentReaction({
        variables: {
          input: {
            commentId,
            reactionType: newReactionType,
            userId: authenticatedUser?.id,
          },
        },
      });
    } else {
      removeCommentReaction({
        variables: {
          input: { commentId, userId: authenticatedUser?.id },
        },
      });
    }
  }

  if (!commentData.comment) {
    return <></>;
  }

  const { dateTime, owner, reactions, repliesCount, text, topLevelParentId } =
    commentData.comment;

  const isCommentOwner = owner.id === authenticatedUser?.id;
  const isPostOwner = postOwnerId === owner.id;

  return (
    <Container.Outer style={getOuterContainerStyle()}>
      <Container.Inner
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
            <Container.OwnerDetails
              isAuthenticated={!!authenticatedUser}
              theme={theme}
            >
              {isPostOwner && (
                <Text.OwnerDetails.Badge>Author</Text.OwnerDetails.Badge>
              )}
              <Text.OwnerDetails.Name
                isAuthenticated={!!authenticatedUser}
                theme={theme}
                onClick={() => navigate(`/${owner.username}`)}
              >
                {owner.firstName} {owner.lastName}
              </Text.OwnerDetails.Name>
              <Text.OwnerDetails.Text
                isAuthenticated={!!authenticatedUser}
                theme={theme}
              >
                {text}
              </Text.OwnerDetails.Text>
            </Container.OwnerDetails>
            <Container.Reactions>
              {!!authenticatedUser && (
                <p
                  style={getReactionTextStyle()}
                  onClick={handleReactionClick}
                  onMouseEnter={() => {
                    commentReactionTimer = setTimeout(() => {
                      setIsHoveringOverReactionText(true);
                    }, 750);
                  }}
                  onMouseLeave={() => {
                    if (commentReactionTimer) {
                      clearTimeout(commentReactionTimer);
                      return;
                    }

                    if (isHoveringOverReactionText) {
                      setTimeout(() => {
                        setIsHoveringOverReactionText(false);
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
              )}
              {!!authenticatedUser &&
                (isHoveringOverEmojis || isHoveringOverReactionText) && (
                  <ReactionEmojis
                    size={32}
                    style={{
                      left: "-5px",
                      top: "-48px",
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
              {!!authenticatedUser && (
                <p
                  style={{ color: Colors.PhilippineGray, fontWeight: "bold" }}
                  onClick={() => {
                    setIsWriteReplyVisible((prev) => !prev);
                  }}
                >
                  Reply
                </p>
              )}
              <p>{getTimePassedFromDateTime(dateTime, "COMMENT")}</p>
              {reactions.length > 0 && <p>{reactions.length}</p>}
            </Container.Reactions>
          </div>
        </div>
        {isCommentOwner && (
          <MdMoreHoriz
            color={Colors.PhilippineGray}
            style={{
              visibility: isMoreOptionsVisible ? "visible" : "hidden",
            }}
            onClick={handleMoreOptionsClick}
          />
        )}
      </Container.Inner>
      {isWriteReplyVisible && (
        <WriteComment
          autoFocus
          placeholder="Write a reply..."
          style={{
            marginLeft: isTopLevel ? "calc(2em + 5px)" : undefined,
            marginTop: "0.5em",
          }}
          onCancelClick={() => {
            setIsWriteReplyVisible((prev) => !prev);
          }}
          onSendClick={(commentText) => {
            addComment({
              variables: {
                input: {
                  commentOwnerId: authenticatedUser?.id,
                  parentId: commentId,
                  postId,
                  text: commentText,
                  topLevelParentId,
                },
              },
              // TODO: adding a post comment works, but after adding a few replies to a comment, the app crashes
              // TODO: check if the commented code below can fix the bug
              // TODO: limit should not be 50 at GET_POST_COMMENTS
              refetchQueries: [
                {
                  query: GET_POST_COMMENTS,
                  variables: { input: { first: 50, postId } },
                },
              ],
              onCompleted: ({ addComment: newComment }) => {
                fetchMore({
                  variables: {
                    input: {
                      after:
                        commentRepliesResponse[
                          commentRepliesResponse.length - 1
                        ].id,
                      commentId,
                      first: 1,
                    },
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => ({
                    commentReplies: {
                      ...previousResult.commentReplies,
                      edges: [
                        ...previousResult.commentReplies.edges,
                        ...fetchMoreResult.commentReplies.edges,
                      ],
                      pageInfo: fetchMoreResult.commentReplies.pageInfo,
                      totalCount:
                        previousResult.commentReplies.totalCount +
                        fetchMoreResult.commentReplies.totalCount,
                    },
                  }),
                });
                setIsWriteReplyVisible((prev) => !prev);
              },
            });
          }}
        />
      )}
      <div>
        {commentRepliesResponse.map(
          ({
            id: replyId,
            post: { ownerId: replyPostOwnerId },
            postId: replyPostId,
          }) => (
            <UserComment
              key={replyId}
              commentId={replyId}
              postId={replyPostId}
              postOwnerId={replyPostOwnerId}
              replyLevel={1}
              onDeleteClick={onDeleteClick}
            />
          )
        )}
      </div>
      {isTopLevel && commentRepliesResponse.length < repliesCount && (
        <Container.Replies>
          {isFetchingCommentReplies ? (
            <p>Loading...</p>
          ) : (
            <Text.ShowMoreReplies
              onClick={() => {
                fetchMore({
                  variables: {
                    input: {
                      after:
                        commentRepliesResponse[
                          commentRepliesResponse.length - 1
                        ].id,
                      commentId,
                      first: 3,
                    },
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => ({
                    commentReplies: {
                      ...previousResult.commentReplies,
                      edges: [
                        ...previousResult.commentReplies.edges,
                        ...fetchMoreResult.commentReplies.edges,
                      ],
                      pageInfo: fetchMoreResult.commentReplies.pageInfo,
                      totalCount:
                        previousResult.commentReplies.totalCount +
                        fetchMoreResult.commentReplies.totalCount,
                    },
                  }),
                });
              }}
            >
              Show {repliesCount - commentRepliesResponse.length} more replies
            </Text.ShowMoreReplies>
          )}
        </Container.Replies>
      )}
    </Container.Outer>
  );
}
