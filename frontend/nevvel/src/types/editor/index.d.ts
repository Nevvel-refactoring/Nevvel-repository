declare module "editor" {
    export interface episode {
        coverId: number;
        statusType: string;
        point: number;
        title: string;
        contents: content[];
    };

    interface content {
        idx: number;
        context: string;
        event: event[]
    };
    interface event {
        assetId: number;
        type: string
    };
    interface AssetTag {
        id : number,
        name : string,
      };
      
      interface AssetUploader {
        id : number,
        nickname : string,
        profileImage : string,
      };
      
      interface Asset {
        id: number,
        title: string,
        type: string,
        thumbnail : string,
        url: string,
        price : number,
        downloadCount : number,
        tags: Array<AssetTag>,
        uploader : AssetUploader
      }

}