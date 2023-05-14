declare module "editor" {
  export interface episodeRegistDto {
    episodeRegistDto: episode;
  }

  export interface episode {
    coverId: number;
    statusType: string;
    point: number;
    title: string;
    contents: content[];
  }

  export interface content {
    idx: number;
    context: string;
    event: event[];
  }
  export interface event {
    assetId: number;
    type: string;
  }
  export interface AssetTag {
    id: number;
    name: string;
  }

  export interface AssetUploader {
    id: number;
    nickname: string;
    profileImage: string;
  }

  interface Asset {
    id: number;
    title: string;
    type: string;
    thumbnail: string;
    url: string;
    price: number;
    downloadCount: number;
    tags: Array<AssetTag>;
    uploader: AssetUploader;
  }
}
