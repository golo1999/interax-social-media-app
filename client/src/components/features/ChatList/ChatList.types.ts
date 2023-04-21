import { Message } from "models";

export type GroupedMessage = { messages: Message[] | null; userId: string };
