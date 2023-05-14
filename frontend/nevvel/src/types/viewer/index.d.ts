declare module "viewer" {
    export interface episode {
        coverId: number;
        statusType: string;
        point: number;
        title: string;
        contents: content[];
    };
    export interface content {
        idx: number;
        context: string;
        event: event[];
      }
    export interface event {
        assetId: number;
        type: string
    }
}