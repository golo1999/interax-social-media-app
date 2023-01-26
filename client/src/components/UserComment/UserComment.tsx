import { gql, useMutation } from "@apollo/client";

import { CSSProperties, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { UserPhoto, WriteComment } from "../../components";
import { getTimeFromDate } from "../../helpers";
import { Comment, ReactionType, User } from "../../models";
import { GET_FRIENDS_POSTS_BY_USER_ID } from "../../sections/Posts/Posts";

import {
  getInitialHasReacted,
  getReactionText,
  getReactionTextColor,
} from "./UserComment.helpers";

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

const detailsContainerStyle: CSSProperties = {
  backgroundColor: "#3a3b3c",
  borderRadius: "20px",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: "5px 10px",
};

const innerContainerStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "0.5em",
  marginTop: "0.5em",
};

const outerContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const reactionsContainerStyle: CSSProperties = {
  display: "flex",
  fontSize: "0.7em",
  gap: "0.5em",
  userSelect: "none",
};

interface Props {
  authenticatedUser?: User;
  comment: Comment;
  postOwnerId: string;
  onDeleteClick: () => void;
}

export function UserComment({
  authenticatedUser,
  comment,
  postOwnerId,
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

  const { dateTime, id: commentId, owner, reactions, text } = comment;

  const [hasReacted, setHasReacted] = useState<boolean>(
    getInitialHasReacted({ currentUserId: authenticatedUser?.id, reactions })
  );
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(false);

  const navigate = useNavigate();

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
  }

  function handleReplyClick() {
    setIsWriteReplyVisible((prev) => !prev);
  }

  function iterate(comment: Comment) {
    console.log(`***** ${comment.id}`);
    Object.keys(comment).forEach((key) => {
      console.log(`${key}: ${comment[key as keyof Comment]}`);
      // if (typeof comment[key as keyof Comment] === "object") {
      //   console.log("object");
      // }
      if (key === "replies") {
        // console.log("replies found");
        // iterate(comment[key as keyof Comment]);
        // const repliesList: Comment[] = comment[key as keyof Comment];
        console.log("***** replies");
        console.log(comment[key as keyof Comment]);
      }
    });
  }

  function toggleIsMoreOptionsVisible() {
    setIsMoreOptionsVisible((prev) => !prev);
  }

  const isCommentOwner = comment.owner.id === authenticatedUser?.id;
  const isPostOwner = postOwnerId === owner.id;

  // iterate(comment);

  return (
    <div style={outerContainerStyle}>
      <div
        style={innerContainerStyle}
        onMouseOver={toggleIsMoreOptionsVisible}
        onMouseOut={toggleIsMoreOptionsVisible}
      >
        <div style={{ display: "flex", gap: "0.5em" }}>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${owner.id}`)}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={detailsContainerStyle}>
              {isPostOwner && <p style={{ fontSize: "0.6em" }}>Author</p>}
              <p
                style={{ fontWeight: "bold", userSelect: "none" }}
                onClick={() => navigate(`/${owner.id}`)}
              >
                {owner.firstName} {owner.lastName}
              </p>
              <p>{text}</p>
            </div>
            <div style={reactionsContainerStyle}>
              <p style={getReactionTextStyle()} onClick={handleReactionClick}>
                {getReactionText({
                  hasReacted,
                  reactions,
                  currentUserId: authenticatedUser?.id,
                })}
              </p>
              <p style={{ fontWeight: "bold" }} onClick={handleReplyClick}>
                Reply
              </p>
              <p>{getTimeFromDate(dateTime)}</p>
              {reactions && <p>{reactions.length}</p>}
            </div>
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
      </div>
      {isWriteReplyVisible && (
        <WriteComment
          placeholder="Write a reply..."
          style={{ marginLeft: "calc(2em + 5px)" }}
          user={authenticatedUser}
          onCancelClick={handleReplyClick}
          onSendClick={() => {
            console.log("send clicked");
          }}
        />
      )}
    </div>
  );
}
