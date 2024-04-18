import { useLazyQuery, useMutation } from "@apollo/client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { UserComment } from "components";
import { Colors } from "environment";
import {
  GetCommentRepliesData,
  GET_COMMENT_REPLIES,
  RemoveCommentData,
  REMOVE_COMMENT,
} from "helpers";
import { useAuthenticationStore, useSettingsStore } from "store";
import { Theme } from "types";

const Paragraph = styled.p<ThemeProps>`
  color: ${({ isAuthenticated, theme }) =>
    isAuthenticated && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray};
  font-size: 15px;
  font-weight: 600;
  margin: 5px 0 5px 37px;
  user-select: none;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  commentId: string;
  level: number;
  postOwnerId: string;
}

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export function useCommentReplies({ commentId, level, postOwnerId }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [fetchCommentReplies, { data: replies }] =
    useLazyQuery<GetCommentRepliesData>(GET_COMMENT_REPLIES);
  const [fetchRepliesReplies, { data: repliesReplies }] =
    useLazyQuery<GetCommentRepliesData>(GET_COMMENT_REPLIES);
  const [removeComment] = useMutation<RemoveCommentData>(REMOVE_COMMENT, {
    refetchQueries: [{ query: GET_COMMENT_REPLIES, variables: { commentId } }],
  });
  const { theme } = useSettingsStore();
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
      removeComment({
        variables: { id: replyId },
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
        <Paragraph
          isAuthenticated={!!authenticatedUser}
          theme={theme}
          onClick={handleParagraphClick}
        >
          {paragraphText}
        </Paragraph>
        {repliesReplies?.commentReplies &&
          isMoreRepliesClicked &&
          repliesReplies.commentReplies.map((reply, index) => {
            const { id: replyId, postId: replyPostId } = reply;

            return (
              <UserComment
                key={index}
                id={replyId}
                postId={replyPostId}
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
    theme,
    fetchRepliesReplies,
    removeComment,
  ]);
}
