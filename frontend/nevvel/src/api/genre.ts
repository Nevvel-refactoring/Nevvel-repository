import springApi from "./instance";

// 장르 받아오기
export const getGenre = async () => {
  try {
    const data = await springApi.get("/genre");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
