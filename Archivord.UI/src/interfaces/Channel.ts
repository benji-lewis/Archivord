export interface ChannelData {
  name: string;
  topic: string | null;
}

export interface Channel {
  [key: number]: ChannelData;
}