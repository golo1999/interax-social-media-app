import { IconType } from "react-icons";
import { HiHeart, HiThumbUp } from "react-icons/hi";

import { Colors } from "environment";
import { ConversationTheme, Emoji } from "models";

export function getDisplayedEmoji(emoji: Emoji | undefined) {
  switch (emoji) {
    case Emoji.LOVE:
      return HiHeart;
    default:
      return HiThumbUp;
  }
}

export function getEmojiType(displayedEmoji: IconType) {
  switch (displayedEmoji) {
    case HiHeart:
      return Emoji.LOVE;
    default:
      return Emoji.LIKE;
  }
}

export function getMessageTheme(
  theme: ConversationTheme | undefined
): keyof typeof Colors {
  switch (theme) {
    case ConversationTheme.BLOOD:
      return "Blood";
    case ConversationTheme.CHINESE_YELLOW:
      return "ChineseYellow";
    case ConversationTheme.INDIGO:
      return "Indigo";
    case ConversationTheme.MAXIMUM_BLUE_PURPLE:
      return "MaximumBluePurple";
    case ConversationTheme.OCEAN_BLUE:
      return "OceanBlue";
    case ConversationTheme.PURPLE_PIZZAZZ:
      return "PurplePizzazz";
    case ConversationTheme.RED:
      return "Red";
    case ConversationTheme.SUNSET_ORANGE:
      return "SunsetOrange";
    case ConversationTheme.SWEET_BROWN:
      return "SweetBrown";
    case ConversationTheme.VERY_LIGH_BLUE:
      return "VeryLightBlue";
    case ConversationTheme.VIVID_MALACHITE:
      return "VividMalachite";
    default:
      return "Azure";
  }
}
