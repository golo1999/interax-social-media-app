import { Emoji } from "enums";

import { Reaction } from "models";

type MessageCommonTypes = {
  __typename?: "Message";
  id: string;
  dateTime: string;
  parentId: string | null;
  receiverId: string;
  reactions: Reaction[];
  replies: Message[];
  senderId: string;
};

type MessageConditionalTypes =
  | { emoji: Emoji; text?: never }
  | { emoji?: never; text: string };

export type Message = MessageCommonTypes & MessageConditionalTypes;
