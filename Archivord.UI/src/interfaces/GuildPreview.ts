export interface GuildPreview {
  id: number;
  name: string;
  icon:	string | null;
  splash:	string | null;
  discovery_splash:	string | null;
  emojis:	Array<any>;
  features:	Array<string>;
  approximate_member_count:	number;
  approximate_presence_count:	number;
  description:	string | null;
  stickers: Array<any>;
}