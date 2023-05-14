declare module "series" {
  export interface cover {
    coverId: number;
    title: string;
    thumbnail: string;
    status: string;
    description: string;
    genreName: string;
    isLiked: boolean;
    writter: writter;
    viewCount: number;
    likes: number;
    episodes: episode[];
  }

  export interface writter {
    id: number;
    nickname: string;
    profileImg: string;
  }

  export interface episode {
    id: number;
    title: string;
    viewCount: number;
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
