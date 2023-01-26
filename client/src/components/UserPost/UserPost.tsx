import { gql, useMutation } from "@apollo/client";

import { CSSProperties, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Divider,
  ReactionEmojis,
  UserComment,
  UserPhoto,
  WriteComment,
} from "../../components";
import { getTimeFromDate } from "../../helpers";
import { Post, ReactionType, User } from "../../models";
import { GET_FRIENDS_POSTS_BY_USER_ID } from "../../sections/Posts/Posts";

import {
  getCommentsText,
  getInitialHasReacted,
  getReactionButtonText,
  getReactionButtonTextColor,
  getSharesText,
  getUserPostReaction,
} from "./UserPost.helpers";

const ADD_POST_COMMENT = gql`
  mutation AddPostComment($input: AddPostCommentInput!) {
    addPostComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      reactions {
        type
      }
      replies {
        text
      }
      text
    }
  }
`;

const ADD_POST_REACTION = gql`
  mutation AddPostReaction($input: AddPostReactionInput!) {
    addPostReaction(input: $input) {
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

// const GET_USER_POST_REACTION = gql`
//   query GetUserPostReaction($input: GetUserPostReactionInput!) {
//     userPostReaction(input: $input) {
//       id
//       owner {
//         email
//         firstName
//         id
//         lastName
//         username
//       }
//       type
//     }
//   }
// `;

const REMOVE_POST_COMMENT = gql`
  mutation RemovePostComment($input: RemovePostCommentInput!) {
    removePostComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      reactions {
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
      replies {
        dateTime
        id
        owner {
          username
        }
        reactions {
          type
        }
        replies {
          text
        }
        text
      }
      text
    }
  }
`;

const REMOVE_POST_REACTION = gql`
  mutation RemovePostReaction($input: RemovePostReactionInput!) {
    removePostReaction(input: $input) {
      id
      owner {
        username
      }
      type
    }
  }
`;

const UPDATE_POST_REACTION = gql`
  mutation UpdatePostReaction($input: UpdatePostReactionInput!) {
    updatePostReaction(input: $input) {
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

const buttonStyle: CSSProperties = {
  backgroundColor: "transparent",
  flex: 1,
  fontSize: "1em",
  fontWeight: "bold",
  padding: "0.5em 0",
};

const containerStyle: CSSProperties = {
  backgroundColor: "#242526",
  borderRadius: "5px",
  color: "#abadb1",
  padding: "1em",
};

const postOwnerDetailsContainerStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  gap: "1em",
};

const postOwnerNameTextStyle: CSSProperties = {
  color: "#cfd1d5",
  fontWeight: "bold",
  userSelect: "none",
};

const postTextStyle: CSSProperties = { color: "#cfd1d5" };

const headerStyle: CSSProperties = { alignItems: "center", display: "flex" };

enum ButtonTypes {
  COMMENT,
  REACTION,
  SHARE,
}

// interface GetUserPostReactionData {
//   userPostReaction: Reaction;
// }

interface Props {
  authenticatedUser?: User;
  post: Post;
}

export function UserPost({ authenticatedUser, post }: Props) {
  const [addPostComment] = useMutation(ADD_POST_COMMENT, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [addPostReaction] = useMutation(ADD_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  // const [fetchUserPostReaction, { data: userPostReactionData }] =
  //   useLazyQuery<GetUserPostReactionData>(GET_USER_POST_REACTION);
  const [removePostComment] = useMutation(REMOVE_POST_COMMENT, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [removePostReaction] = useMutation(REMOVE_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [updatePostReaction] = useMutation(UPDATE_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });

  const {
    comments,
    dateTime,
    id: postId,
    owner,
    reactions,
    shares,
    text,
  } = post;

  // const [areReactionEmojisVisible, setAreReactionEmojisVisible] =
  //   useState(false);
  const [hasReacted, setHasReacted] = useState<boolean>(
    getInitialHasReacted({ currentUserId: authenticatedUser?.id, reactions })
  );
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);

  const navigate = useNavigate();

  function getButtonStyles(buttonType: ButtonTypes): CSSProperties {
    return {
      ...buttonStyle,
      ...{
        color:
          buttonType === ButtonTypes.REACTION && hasReacted
            ? getReactionButtonTextColor({
                currentUserId: authenticatedUser?.id,
                reactions,
              })
            : "#8d8f93",
      },
    };
  }

  function handleCommentClick() {
    setIsWriteCommentVisible((prev) => !prev);
  }

  function handleMoreOptionsClick() {
    console.log("more options clicked");
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

    setHasReacted((prev) => !prev);
  }

  function handleReactionEmojisClick(reactionType: ReactionType) {
    const currentReaction = getUserPostReaction({
      currentUserId: authenticatedUser?.id,
      reactions,
    });

    if (!currentReaction) {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType,
          },
        },
      });
      if (!hasReacted) {
        setHasReacted((prev) => !prev);
      }
    } else if (currentReaction.type !== reactionType) {
      updatePostReaction({
        variables: {
          input: {
            ownerId: authenticatedUser?.id,
            postId,
            reactionType,
          },
        },
      });
    } else {
      removePostReaction({
        variables: {
          input: { ownerId: authenticatedUser?.id, postId },
        },
      });
      if (hasReacted) {
        setHasReacted((prev) => !prev);
      }
    }
  }

  const postOwnerNameText = `${owner.firstName} ${owner.lastName}`;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={postOwnerDetailsContainerStyle}>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${owner.id}`)}
          />
          <div>
            <p
              style={postOwnerNameTextStyle}
              onClick={() => navigate(`/${owner.id}`)}
            >
              {postOwnerNameText}
            </p>
            <p>{getTimeFromDate(dateTime)}</p>
          </div>
        </div>
        <MdMoreHoriz
          color="#8d8f93"
          size="1.5em"
          onClick={handleMoreOptionsClick}
        />
      </div>
      <p style={postTextStyle}>{text}</p>
      {(comments?.length > 0 ||
        reactions?.length > 0 ||
        shares?.length > 0) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5em 0",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <p>Icons</p>
            {reactions && <p>{reactions.length}</p>}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {comments && <p>{getCommentsText(comments.length)}</p>}
            {shares && <p>{getSharesText(shares.length)}</p>}
          </div>
        </div>
      )}
      <Divider />
      <div style={{ display: "flex", position: "relative" }}>
        <button
          style={getButtonStyles(ButtonTypes.REACTION)}
          onClick={handleReactionClick}
          // onMouseOver={() => {
          //   setAreReactionEmojisVisible((prev) => !prev);
          // }}
          // onMouseOut={() => {
          //   setAreReactionEmojisVisible((prev) => !prev);
          // }}
        >
          {getReactionButtonText({
            hasReacted,
            reactions,
            currentUserId: authenticatedUser?.id,
          })}
        </button>
        <ReactionEmojis
          onReactionClick={(reactionType) =>
            handleReactionEmojisClick(reactionType)
          }
        />
        <button
          style={getButtonStyles(ButtonTypes.COMMENT)}
          onClick={handleCommentClick}
        >
          Comment
        </button>
        <button style={getButtonStyles(ButtonTypes.SHARE)}>Share</button>
      </div>
      <>
        <Divider />
        {isWriteCommentVisible && (
          <WriteComment
            placeholder="Write a comment..."
            user={authenticatedUser}
            onCancelClick={handleCommentClick}
            onSendClick={(commentText) => {
              addPostComment({
                variables: {
                  input: {
                    commentOwnerId: authenticatedUser?.id,
                    postId,
                    text: commentText,
                  },
                },
              });
            }}
          />
        )}
        {comments?.length > 0 && (
          <div>
            {comments.map((comment, index) => (
              <UserComment
                key={index}
                authenticatedUser={authenticatedUser}
                comment={comment}
                postOwnerId={owner.id}
                onDeleteClick={() => {
                  removePostComment({
                    variables: { input: { commentId: comment.id, postId } },
                  });
                }}
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
}

// #242526 pentru button hover
