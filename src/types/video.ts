export interface Channel {
  id: number;
  name: string;
  channelId: string;
  createdAt: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  videoId: string;
  url: string;
  uploadDate: string;
  createdAt: string;
  channel: Channel;
}

export interface VideoResponse {
  items: Video[];
  limit: number;
  skip: number;
  total: number;
}
