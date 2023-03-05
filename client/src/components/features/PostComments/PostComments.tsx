import { useMutation } from "@apollo/client";

import { useMemo } from "react";

import { UserComment } from "components";
import { GET_COMMENT_REPLIES, GET_POST, REMOVE_COMMENT } from "helpers";
import { Comment, User } from "models";

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
