declare module "asset" {
export interface AssetTag {
  id: number;
  tagName: string;
  useCount: number;
}

export interface AssetUploader {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface Asset {
  id: number;
  title: string;
  type: string;
  thumbnail: string;
  url: string;
  price: number;
  downloadCount: number;
  isAvailable: boolean;
  tags: Array<AssetTag>;
  uploader: AssetUploader;
}
export interface TagData {
    id: number;
    tagName: string;
    useCount: number;
  };

}