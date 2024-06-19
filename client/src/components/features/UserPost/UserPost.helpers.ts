import { ReactionType } from "enums";
import { Colors, Icons as AppIcons } from "environment";
import { PostReaction } from "models";

interface ReactionButtonTextProps {
  currentUserId?: string;
  hasReacted: boolean;
  reactions: PostReaction[] | undefined;
}

interface ReactionButtonTextColorProps {
  currentUserId?: string;
  reactions: PostReaction[] | undefined;
}

interface ReactionIconProps {
  reactionType?: ReactionType;
}

interface UserPostReactionProps {
  currentUserId?: string;
  reactions: PostReaction[] | undefined;
}

export function getPostReactionsCount(reactions: PostReaction[] | undefined) {
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
      (r) => r.type === reaction.reactionType
    );

    if (!matchedReaction) {
      return;
    }

    matchedReaction.count = matchedReaction.count + 1;
  });

  const existingReactions = reactionsCount
    .filter(({ count }) => count > 0)
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
  const formattedReactionType = userReaction?.reactionType
    .toString()
    .slice(0, 1)
    .concat(userReaction.reactionType.toString().slice(1).toLowerCase());

  return !hasReacted ? "Like" : formattedReactionType;
}

export function getReactionButtonTextColor({
  currentUserId,
  reactions,
}: ReactionButtonTextColorProps) {
  const userReactionType = reactions?.find(
    (reaction) => reaction.userId === currentUserId
  )?.reactionType;

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

export function getUserPostReaction({
  currentUserId,
  reactions,
}: UserPostReactionProps) {
  const userReaction = reactions?.find(
    (reaction) => reaction.userId === currentUserId
  );
  return userReaction;
}
