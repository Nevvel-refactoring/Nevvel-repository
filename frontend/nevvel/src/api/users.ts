import springApi from "./instance";

// 회원 정보
export const getUserInfo = async () => {
  try {
    const data = await springApi.get("/users");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 회원 수정

// 인기 작가 정보
