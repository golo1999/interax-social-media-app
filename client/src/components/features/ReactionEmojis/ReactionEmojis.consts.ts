import { ReactionType } from "enums";
import { Icons as AppIcons } from "environment";

export const REACTIONS = [
  { icon: AppIcons.Like, type: ReactionType.LIKE },
  { icon: AppIcons.Love, type: ReactionType.LOVE },
  { icon: AppIcons.Care, type: ReactionType.CARE },
  { icon: AppIcons.Haha, type: ReactionType.HAHA },
  { icon: AppIcons.Wow, type: ReactionType.WOW },
  { icon: AppIcons.Sad, type: ReactionType.SAD },
  { icon: AppIcons.Angry, type: ReactionType.ANGRY },
];
