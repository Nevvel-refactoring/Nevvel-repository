declare module "viewer" {
  export interface episodeViewer {
    coverId: number;
    coverTitle: string;
    statusType: string;
    episodeId: number;
    point: number;
    title: string;
    contents: content[];
  }
  export interface newEpisodeViewer {
    coverId: number;
    coverTitle: string;
    statusType: string;
    episodeId: number;
    point: number;
    title: string;
    nextEpisodeId: number;
    prevEpisodeId: number;
    wirterId: number;
    contents: content[];
  }
  export interface content {
    idx: string;
    context: context[];
    event: event[];
  }
  export interface context {
    id:string;
    tag: string;
    text: string;
  }
  export interface event {
    assetId: number;
    type: string;
    assetUrl: string;
  }
}
