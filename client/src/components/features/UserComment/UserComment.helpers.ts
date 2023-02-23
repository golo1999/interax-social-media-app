import { Comment, Reaction, ReactionType } from "../../../models";

interface FindMatchedCommentProps {
  commentId: string;
  comments: Comment[] | null;
}

interface ReactionTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: Reaction[] | null;
}

interface ReactionTextColorProps {
  currentUserId?: string;
  reactions: Reaction[] | null;
}

interface UserCommentReactionProps {
  currentUserId?: string;
  reactions: Reaction[] | null;
}

export function findMatchedComment({
  commentId,
  comments,
}: FindMatchedCommentProps): Comment | undefined {
  if (!comments || comments.length === 0) {
    return undefined;
  }

  for (let index = 0; index < comments.length; ++index) {
    const comment = comments[index];

    if (comment.id === commentId) {
      return comment;
    } else if (comment.replies) {
      const found = findMatchedComment({
        commentId,
        comments: comment.replies,
      });

      if (found) {
        return found;
      }
    }
  }
}

export function getReactionText({
  currentUserId,
  hasReacted,
  reactions,
}: ReactionTextProps) {
  if (!reactions || reactions.length === 0) {
    return "Like";
  }

  const userReaction = reactions.find(
    (reaction) => reaction.owner.id === currentUserId
  );

  if (!userReaction) {
    return "Like";
  }

  const formattedReactionType = userReaction?.type
    .toString()
    .slice(0, 1)
    .concat(userReaction.type.toString().slice(1).toLowerCase());

  return !hasReacted ? "Like" : formattedReactionType;
}

export function getReactionTextColor({
  currentUserId,
  reactions,
}: ReactionTextColorProps) {
  const userReactionType = reactions
    ? reactions.find((reaction) => reaction.owner.id === currentUserId)?.type
    : undefined;

  switch (userReactionType) {
    case ReactionType.ANGRY:
      return "#c46e1c";
    case ReactionType.LIKE:
      return "#2d86ff";
    case ReactionType.LOVE:
      return "#ee3553";
    case ReactionType.CARE:
    case ReactionType.HAHA:
    case ReactionType.SAD:
    case ReactionType.WOW:
      return "#f9ce58";
    default:
      return undefined;
  }
}

export function getUserCommentReaction({
  currentUserId,
  reactions,
}: UserCommentReactionProps) {
  const userReaction = reactions?.find(
    (reaction) => reaction.owner.id === currentUserId
  );
  return userReaction;
}
