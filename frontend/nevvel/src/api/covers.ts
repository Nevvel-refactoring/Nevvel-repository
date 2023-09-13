import springApi from "./instance";

// 새 소설 생성하기
export const postCover = async (formData: FormData) => {
  try {
    const data = await springApi.post("/covers", formData, {
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

// 소설의 전체 에피소드 목록
export const getCoverSeries = async (Id: number) => {
  try {
    const data = await springApi.get(`/covers/${Id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 소설 정보 수정
export const putCover = async (Id: number, formData: FormData) => {
  try {
    const data = await springApi.put(`/covers/${Id}`, formData, {
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

// 소설 좋아요
export const postCoverLike = async (Id: number) => {
  try {
    const data = await springApi.post(`/covers/likes/${Id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 좋아요한 소설 목록
export const getLikedNovel = async () => {
  try {
    const data = await springApi.get("/covers/likes");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 작성한 소설 목록
export const getUploadedNovel = async (userId: number) => {
  try {
    //   const data = await springApi.get(`/covers/uploader/${userInfoStatus?.id}`);
    const data = await springApi.get(`/covers/uploader/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 구매한 소설 목록
export const getPurchasedNovel = async () => {
  try {
    const data = await springApi.get("/covers/purchased-on");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 분류별 소설 목록 (장르, 완결, 최신, 검색)
