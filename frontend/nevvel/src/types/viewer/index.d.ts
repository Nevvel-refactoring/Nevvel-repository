declare module "viewer" {
    export interface EpisodeView {
        title: string;
        contents: content[];
    };

    export interface event {
        assetId: number;
        type: string
    }
}