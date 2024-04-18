import { ReactionType } from "enums";
import { Colors } from "environment";
import { Comment, CommentReaction } from "models";

interface FindMatchedCommentProps {
  commentId: string;
  comments: Comment[] | null;
}

interface ReactionTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: CommentReaction[] | null;
}

interface ReactionTextColorProps {
  currentUserId?: string;
  reactions: CommentReaction[] | null;
}

interface UserCommentReactionProps {
  currentUserId?: string;
  reactions: CommentReaction[] | null;
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
    (reaction) => reaction.userId === currentUserId
  );

  if (!userReaction) {
    return "Like";
  }

  const formattedReactionType = userReaction.reactionType
    .toString()
    .slice(0, 1)
    .concat(userReaction.reactionType.toString().slice(1).toLowerCase());

  return !hasReacted ? "Like" : formattedReactionType;
}

export function getReactionTextColor({
  currentUserId,
  reactions,
}: ReactionTextColorProps) {
  const userReactionType = reactions
    ? reactions.find((reaction) => reaction.userId === currentUserId)
        ?.reactionType
    : undefined;

  switch (userReactionType) {
    case ReactionType.ANGRY:
      return Colors.Ochre;
    case ReactionType.LIKE:
      return Colors.DodgerBlue;
    case ReactionType.LOVE:
      return Colors.Desire;
    case ReactionType.CARE:
    case ReactionType.HAHA:
    case ReactionType.SAD:
    case ReactionType.WOW:
      return Colors.NaplesYellow;
    default:
      return undefined;
  }
}

export function getUserCommentReaction({
  currentUserId,
  reactions,
}: UserCommentReactionProps) {
  const userReaction = reactions?.find(
    (reaction) => reaction.userId === currentUserId
  );
  return userReaction;
}
