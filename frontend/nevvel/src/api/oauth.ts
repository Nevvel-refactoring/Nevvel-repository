import springApi from "./instance";

// 로그아웃
// refresh token 삭제
export const postLogout = () => {
  try {
    springApi.post("/users/signout");
    return true;
  } catch (error) {
    console.log(error);
  }
};
