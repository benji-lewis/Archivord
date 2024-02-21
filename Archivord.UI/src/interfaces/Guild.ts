export interface GuildData {
  guildName: string;
  icon: string;
}

export interface Guild {
  [key: number]: GuildData;
}