export interface MessageData {
  content: string;
  authorId: string;
  authorUsername: string;
  authorNick: string | null;
}

export interface Message {
  [key: number]: MessageData;
}