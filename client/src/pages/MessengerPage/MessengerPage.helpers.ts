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

export function getMessageTheme(theme: ConversationTheme | undefined) {
  switch (theme) {
    case ConversationTheme.BLOOD:
      return Colors.Blood;
    case ConversationTheme.CHINESE_YELLOW:
      return Colors.ChineseYellow;
    case ConversationTheme.INDIGO:
      return Colors.Indigo;
    case ConversationTheme.MAXIMUM_BLUE_PURPLE:
      return Colors.MaximumBluePurple;
    case ConversationTheme.OCEAN_BLUE:
      return Colors.OceanBlue;
    case ConversationTheme.PURPLE_PIZZAZZ:
      return Colors.PurplePizzazz;
    case ConversationTheme.RED:
      return Colors.Red;
    case ConversationTheme.SUNSET_ORANGE:
      return Colors.SunsetOrange;
    case ConversationTheme.SWEET_BROWN:
      return Colors.SweetBrown;
    case ConversationTheme.VERY_LIGH_BLUE:
      return Colors.VeryLightBlue;
    case ConversationTheme.VIVID_MALACHITE:
      return Colors.VividMalachite;
    default:
      return Colors.Azure;
  }
}
