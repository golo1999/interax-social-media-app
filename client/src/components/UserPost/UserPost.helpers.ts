import { Reaction, ReactionType } from "../../models";

interface InitialHasReactedProps {
  currentUserId?: string;
  reactions: Reaction[];
}

interface ReactionButtonTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: Reaction[];
}

interface ReactionButtonTextColorProps {
  currentUserId?: string;
  reactions: Reaction[];
}

interface UserPostReactionProps {
  currentUserId?: string;
  reactions: Reaction[];
}

export function getCommentsText(commentsCount: number) {
  return commentsCount > 1
    ? `${commentsCount} comments`
    : `${commentsCount} comment`;
}

export function getInitialHasReacted({
  currentUserId,
  reactions,
}: InitialHasReactedProps) {
  return reactions
    ? reactions.some((reaction) => reaction.owner.id === currentUserId)
    : false;
}

export function getReactionButtonText({
  currentUserId,
  hasReacted,
  reactions,
}: ReactionButtonTextProps) {
  if (!reactions) {
    return "Like";
  }

  const userReaction = getUserPostReaction({ currentUserId, reactions });
  const formattedReactionType = userReaction?.type
    .toString()
    .slice(0, 1)
    .concat(userReaction.type.toString().slice(1).toLowerCase());

  return !hasReacted ? "Like" : formattedReactionType;
}

export function getReactionButtonTextColor({
  currentUserId,
  reactions,
}: ReactionButtonTextColorProps) {
  const userReactionType = reactions
    ? reactions.find((reaction) => reaction.owner.id === currentUserId)?.type
    : undefined;

  if (typeof userReactionType === "undefined") {
    return "#8d8f93";
  }

  switch (userReactionType) {
    case ReactionType.ANGRY:
      return "#c46e1c";
    case ReactionType.LIKE:
      return "#2d86ff";
    case ReactionType.LOVE:
      return "#ee3553";
    default:
      return "#f9ce58";
  }
}

export function getSharesText(sharesCount: number) {
  return sharesCount > 1 ? `${sharesCount} shares` : `${sharesCount} share`;
}

export function getUserPostReaction({
  currentUserId,
  reactions,
}: UserPostReactionProps) {
  const userReaction = reactions?.find(
    (reaction) => reaction.owner.id === currentUserId
  );
  return userReaction;
}
