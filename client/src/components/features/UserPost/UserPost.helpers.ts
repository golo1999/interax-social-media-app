import { Colors, Icons as AppIcons } from "environment";
import { Reaction, ReactionType } from "models";

interface ReactionButtonTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: Reaction[] | null;
}

interface ReactionButtonTextColorProps {
  currentUserId?: string;
  reactions: Reaction[] | null;
}

interface ReactionIconProps {
  reactionType?: ReactionType;
}

interface UserPostReactionProps {
  currentUserId?: string;
  reactions: Reaction[] | null;
}

export function getCommentsText(commentsCount: number) {
  return commentsCount > 1 ? `${commentsCount} comments` : "1 comment";
}

export function getPostReactionsCount(reactions: Reaction[] | null) {
  let reactionsCount = [
    { count: 0, icon: AppIcons.Like, type: ReactionType.LIKE },
    { count: 0, icon: AppIcons.Love, type: ReactionType.LOVE },
    { count: 0, icon: AppIcons.Care, type: ReactionType.CARE },
    { count: 0, icon: AppIcons.Haha, type: ReactionType.HAHA },
    { count: 0, icon: AppIcons.Wow, type: ReactionType.WOW },
    { count: 0, icon: AppIcons.Sad, type: ReactionType.SAD },
    { count: 0, icon: AppIcons.Angry, type: ReactionType.ANGRY },
  ];

  reactions?.forEach((reaction) => {
    const matchedReaction = reactionsCount.find(
      (r) => r.type === reaction.type
    );

    if (!matchedReaction) {
      return;
    }

    matchedReaction.count = matchedReaction.count + 1;
  });

  const existingReactions = reactionsCount
    .filter((r) => r.count > 0)
    .sort((a, b) => (a.count < b.count ? 1 : -1));

  return existingReactions;
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
    return Colors.PhilippineGray;
  }

  switch (userReactionType) {
    case ReactionType.ANGRY:
      return Colors.Ochre;
    case ReactionType.LIKE:
      return Colors.DodgerBlue;
    case ReactionType.LOVE:
      return Colors.Desire;
    default:
      return Colors.NaplesYellow;
  }
}

export function getReactionIcon({ reactionType }: ReactionIconProps) {
  switch (reactionType) {
    case ReactionType.ANGRY:
      return AppIcons.Angry;
    case ReactionType.CARE:
      return AppIcons.Care;
    case ReactionType.HAHA:
      return AppIcons.Haha;
    case ReactionType.LIKE:
      return AppIcons.Like;
    case ReactionType.LOVE:
      return AppIcons.Love;
    case ReactionType.SAD:
      return AppIcons.Sad;
    case ReactionType.WOW:
      return AppIcons.Wow;
    default:
      return undefined;
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
