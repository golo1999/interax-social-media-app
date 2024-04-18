import { HiHeart, HiThumbUp } from "react-icons/hi";

import { Emoji } from "enums";

export function getDisplayedEmoji(emoji: Emoji | undefined) {
  switch (emoji) {
    case Emoji.LOVE:
      return HiHeart;
    default:
      return HiThumbUp;
  }
}
