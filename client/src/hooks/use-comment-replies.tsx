import { useMemo, useState } from "react";
import styled from "styled-components";

import { UserComment } from "../components";
import { Comment, User } from "../models";

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
  level: number;
  postOwnerId: string;
  replies: Comment[] | null;
}

export function useCommentReplies({
  authenticatedUser,
  level,
  postOwnerId,
  replies,
}: Props) {
  const [isMoreRepliesClicked, setIsMoreRepliesClicked] = useState(false);

  return useMemo(() => {
    if (!replies) {
      return <></>;
    }

    function handleDeleteClick() {
      // TODO
    }

    function handleParagraphClick() {
      setIsMoreRepliesClicked((prev) => !prev);
    }

    const paragraphText = isMoreRepliesClicked
      ? "Show less replies"
      : replies.length > 1
      ? `Show ${replies.length} more replies`
      : "Show 1 more reply";

    return (
      <>
        <Paragraph onClick={handleParagraphClick}>{paragraphText}</Paragraph>
        {isMoreRepliesClicked &&
          replies.map((reply, index) => (
            <UserComment
              key={index}
              authenticatedUser={authenticatedUser}
              comment={reply}
              postOwnerId={postOwnerId}
              replyLevel={level + 1}
              onDeleteClick={handleDeleteClick}
            />
          ))}
      </>
    );
  }, [authenticatedUser, isMoreRepliesClicked, level, postOwnerId, replies]);
}
