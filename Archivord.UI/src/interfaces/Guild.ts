export interface GuildData {
  name: string;
  icon: string;
}

export interface Guild {
  [key: number]: GuildData;
}