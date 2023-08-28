import springApi from "./instance";

// 로그아웃
// refresh token 삭제
export const postLogout = () => {
  try {
    springApi.post("/users/signout");
  } catch (error) {
    console.log(error);
  }
};

// access token 재발급
export const postRefresh = () => {
  try {
    springApi.post("/users/refresh", {});
  } catch (error) {
    console.log(error);
  }
};
