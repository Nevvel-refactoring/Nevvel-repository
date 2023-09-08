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
  let urlDetail = "?";
  if (assetType) {
    urlDetail = `?assettype=${assetType}`;
  }
  try {
    const data = await springApi.get(`/assets/purchased-on${urlDetail}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 에셋 생성하기
export const postAsset = async (formData: FormData) => {
  try {
    const data = await springApi.post("/assets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 에셋 상태(사용 가능 여부) 수정
export const putAsset = async (assetId: number) => {
  try {
    const data = await springApi.put(`/assets/${assetId}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 특정 유저가 만든 에셋 목록 조회
export const getUploadedAsset = async (
  userId: number,
  assetType: string | undefined
) => {
  let urlDetail = "?";
  if (assetType) {
    urlDetail = `?assettype=${assetType}`;
  }
  try {
    const data = await springApi.get(`/assets/uploader/${userId}${urlDetail}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 에셋 구매하기
export const postPurchaseAsset = async (AssetId: number) => {
  try {
    const data = await springApi.post(`/assets/purchasing/${AssetId}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
