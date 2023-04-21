import { HiHeart, HiThumbUp } from "react-icons/hi";

import { Emoji } from "models";

export function getDisplayedEmoji(emoji: Emoji | undefined) {
  switch (emoji) {
    case Emoji.LOVE:
      return HiHeart;
    default:
      return HiThumbUp;
  }
}
