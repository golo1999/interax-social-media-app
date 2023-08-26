import { useLazyQuery, useMutation } from "@apollo/client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { UserComment } from "components";
import {
  GetCommentRepliesData,
  GET_COMMENT_REPLIES,
  RemoveCommentReplyData,
  REMOVE_COMMENT_REPLY,
} from "helpers";
import { User } from "models";

const Paragraph = styled.p`
  margin: 5px 0 5px 37px;
  user-select: none;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  authenticatedUser?: User;
  commentId: string;
  level: number;
  postOwnerId: string;
}

export function useCommentReplies({
  authenticatedUser,
  commentId,
  level,
  postOwnerId,
}: Props) {
  const [fetchCommentReplies, { data: replies }] =
    useLazyQuery<GetCommentRepliesData>(GET_COMMENT_REPLIES);
  const [fetchRepliesReplies, { data: repliesReplies }] =
    useLazyQuery<GetCommentRepliesData>(GET_COMMENT_REPLIES);

  const [removeCommentReply] = useMutation<RemoveCommentReplyData>(
    REMOVE_COMMENT_REPLY,
    {
      refetchQueries: [
        { query: GET_COMMENT_REPLIES, variables: { commentId } },
      ],
    }
  );

  const [isMoreRepliesClicked, setIsMoreRepliesClicked] = useState(false);

  useEffect(() => {
    fetchCommentReplies({ variables: { commentId } });
    fetchRepliesReplies({ variables: { commentId } });
  }, [commentId, fetchCommentReplies, fetchRepliesReplies]);

  return useMemo(() => {
    if (!replies?.commentReplies) {
      return <></>;
    }

    const { commentReplies } = replies;

    if (commentReplies.length === 0) {
      return <></>;
    }

    function handleDeleteClick(replyId: string) {
      removeCommentReply({
        variables: { input: { commentId, replyId } },
        refetchQueries: [
          { query: GET_COMMENT_REPLIES, variables: { commentId } },
        ],
      });
    }

    function handleParagraphClick() {
      fetchRepliesReplies({
        variables: { commentId },
        onCompleted: () => {
          setIsMoreRepliesClicked((prev) => !prev);
        },
      });
    }

    const paragraphText = isMoreRepliesClicked
      ? "Show less replies"
      : replies.commentReplies.length > 1
      ? `Show ${replies.commentReplies.length} more replies`
      : "Show 1 more reply";

    return (
      <>
        <Paragraph onClick={handleParagraphClick}>{paragraphText}</Paragraph>
        {repliesReplies?.commentReplies &&
          isMoreRepliesClicked &&
          repliesReplies.commentReplies.map((reply, index) => {
            const { id: replyId } = reply;

            return (
              <UserComment
                key={index}
                authenticatedUser={authenticatedUser}
                id={replyId}
                postOwnerId={postOwnerId}
                replyLevel={level + 1}
                onDeleteClick={(replyId) => handleDeleteClick(replyId)}
              />
            );
          })}
      </>
    );
  }, [
    authenticatedUser,
    commentId,
    isMoreRepliesClicked,
    level,
    postOwnerId,
    replies,
    repliesReplies?.commentReplies,
    fetchRepliesReplies,
    removeCommentReply,
  ]);
}
