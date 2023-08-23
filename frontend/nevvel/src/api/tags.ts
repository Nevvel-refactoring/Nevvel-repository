import springApi from "./instance";

export const getTagList = async () => {
  try {
    const { data } = await springApi.get("/tags");
    return data;
  } catch (error) {
    console.log(error);
  }
};
