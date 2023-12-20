export interface Message {
  content: string;
  authorId: string;
  authorUsername: string;
  authorNick: string | null;
}