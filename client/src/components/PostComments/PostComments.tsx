import { gql, useMutation } from "@apollo/client";

import { useMemo } from "react";

import { GET_POST } from "../UserPost/UserPost";

import { Comment, User } from "../../models";

import { UserComment } from "../UserComment";
import { GET_COMMENT_REPLIES } from "../../hooks/use-comment-replies";

const REMOVE_COMMENT = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
    postId
    reactions {
      dateTime
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
        email
        firstName
        id
        lastName
        username
      }
      text
    }
    text
  }

  mutation RemoveComment($id: ID!) {
    removeComment(id: $id) {
      ...CommentData
    }
  }
`;

interface RemoveCommentData {
  removeComment: Comment | null;
}

interface Props {
  authenticatedUser?: User;
  comments: Comment[] | null;
  postId: string;
  postOwnerId: string;
}

export function PostComments({
  authenticatedUser,
  comments,
  postId,
  postOwnerId,
}: Props) {
  const [removeComment] = useMutation<RemoveCommentData>(REMOVE_COMMENT);

  return useMemo(() => {
    if (!comments || comments.length === 0) {
      return <></>;
    }

    function handleDeleteClick(commentId: string) {
      removeComment({
        variables: { id: commentId },
        refetchQueries: [
          {
            query: GET_POST,
            variables: { id: postId },
          },
          { query: GET_COMMENT_REPLIES, variables: { commentId } },
        ],
      });
    }

    return (
      <div>
        {comments.map((comment, index) => (
          <UserComment
            key={index}
            authenticatedUser={authenticatedUser}
            id={comment.id}
            postOwnerId={postOwnerId}
            onDeleteClick={(replyId) => handleDeleteClick(replyId)}
          />
        ))}
      </div>
    );
  }, [authenticatedUser, comments, postId, postOwnerId, removeComment]);
}
