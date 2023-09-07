import springApi from "./instance";

// asset 받아오기
interface getAssetsType {
  assetType: string | undefined;
  tags: string | undefined;
  page: number | undefined;
  size: number | undefined;
  searchType: string | undefined;
  sort: string | undefined;
}

export const getAssets = async ({
  assetType,
  tags,
  page,
  size,
  searchType,
  sort,
}: getAssetsType) => {
  let urlDetail = "?";
  if (assetType) {
    urlDetail += `assettype=${assetType}`;
  }
  if (tags) {
    if (urlDetail === "?") {
      urlDetail += `tags=${tags}`;
    } else {
      urlDetail += `&tags=${tags}`;
    }
  }
  if (page) {
    if (urlDetail === "?") {
      urlDetail += `page=${page}`;
    } else {
      urlDetail += `&page=${page}`;
    }
  }
  if (size) {
    if (urlDetail === "?") {
      urlDetail += `size=${size}`;
    } else {
      urlDetail += `&size=${size}`;
    }
  }
  if (searchType) {
    if (urlDetail === "?") {
      urlDetail += `searchtype=${searchType}`;
    } else {
      urlDetail += `&searchtype=${searchType}`;
    }
  }
  if (sort) {
    if (urlDetail === "?") {
      urlDetail += `sort=${sort}`;
    } else {
      urlDetail += `&sort=${sort}`;
    }
  }
  try {
    const data = await springApi.get(`/assets${urlDetail}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 구매한 에셋 조회
export const getPurchasedAssets = async (assetType: string | undefined) => {
  let urlDetail = '?'
  if (assetType) {
    urlDetail = `?assettype=${assetType}`
  }
  try {
    const data = await springApi.get(`/assets/purchased-on${urlDetail}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
