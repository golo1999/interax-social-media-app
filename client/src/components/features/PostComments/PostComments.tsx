import { useMutation } from "@apollo/client";

import { useMemo } from "react";

import { UserComment } from "components";
import {
  GET_COMMENT_REPLIES,
  GET_POST,
  RemoveCommentData,
  REMOVE_COMMENT,
} from "helpers";
import { Comment } from "models";

interface Props {
  comments: Comment[] | null;
  postId: string;
  postOwnerId: string;
}

export function PostComments({ comments, postId, postOwnerId }: Props) {
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
            id={comment.id}
            postOwnerId={postOwnerId}
            onDeleteClick={(replyId) => handleDeleteClick(replyId)}
          />
        ))}
      </div>
    );
  }, [comments, postId, postOwnerId, removeComment]);
}
