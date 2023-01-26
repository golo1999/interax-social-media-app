import { Reaction, ReactionType } from "../../models";

interface InitialHasReactedProps {
  currentUserId?: string;
  reactions: Reaction[];
}

interface ReactionTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: Reaction[];
}

interface ReactionTextColorProps {
  currentUserId?: string;
  reactions: Reaction[];
}

export function getInitialHasReacted({
  currentUserId,
  reactions,
}: InitialHasReactedProps) {
  return reactions
    ? reactions.some((reaction) => reaction.owner.id === currentUserId)
    : false;
}

export function getReactionText({
  currentUserId,
  hasReacted,
  reactions,
}: ReactionTextProps) {
  if (!reactions) {
    return "Like";
  }

  const userReaction = reactions.find(
    (reaction) => reaction.owner.id === currentUserId
  );
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
    default:
      return "#f9ce58";
  }
}
