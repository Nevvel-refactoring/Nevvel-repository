declare module "series" {
    export interface cover {
        coverId : number;
        title: string;
        thumbnail:string;
        status:string;
        description:string;
        genre:string;
        isLiked:boolean;
        writter:writter;
        views:number;
        likes:number;
        episodes:episode[]

    };

    export interface writter {
        id:number;
        nickname:string;
        profileImg:string;
    };

    export interface episode {
        id:number;
        title:string;
        views:number;
        isPurchased:boolean;
        isRead:boolean;
        uploadedDateTime: string;
    }
}