import springApi from "./instance";

// 로그아웃
// refresh token 삭제
export const postLogout = async () => {
  try {
    await springApi.post("/users/signout");
    return true;
  } catch (error) {
    console.log(error);
  }
};
