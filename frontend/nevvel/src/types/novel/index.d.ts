declare module "novel" {
  export interface Content {
    id: number;
    title: string;
    status: string;
    thumbnail: string;
    genre: string;
    writer: {
      id: number;
      nickname: string;
    };
    isUploaded: boolean;
    isNew: boolean;
  }

  export interface Novel {
    content: Content[];
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      pageSize: number;
      pageNumber: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }

  export interface NovelCardType {
    id: number;
    title: string;
    writer: string;
    writerId: number;
    genre: string;
    thumbnail: string;
    isUploaded: boolean;
    isNew: boolean;
  }

  export interface NovelPage {
    nav: string;
    name: string;
    genre: number | string;
    sort: string;
    pageNum: number | string;
    totalPage: number;
  }
}
