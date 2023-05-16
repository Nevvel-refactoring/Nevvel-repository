declare module "series" {
  export interface cover {
    coverId: number;
    title: string;
    thumbnail: string;
    status: string;
    description: string;
    genre: string;
    isLiked: boolean;
    writer: writer;
    viewCount: number;
    likes: number;
    lastReadEpisodeId: number;
    episodes: episode[];
  }

  export interface writer {
    id: number;
    nickname: string;
    profileImg: string;
  }

  export interface episode {
    id: number;
    title: string;
    views: number;
    isPurchased: boolean;
    isRead: boolean;
    point: number;
    uploadedDateTime: string;
  }
  export interface shoppingList {
    coverId: number;
    episodes: number[];
  }
}
