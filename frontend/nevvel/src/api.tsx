import axios from "axios";

// export interface Tokens {
//   "accessToken": string;
//   "refreshToken": string;
// }

const springApi = axios.create({
  // withCredentials: true,
  baseURL: "https://www.nevvel.net:8081/api",
  // baseURL: "http://3.35.53.215:8080//api"
  // baseURL: "https://k8d106.p.ssafy.io:8080/api"
});
springApi.defaults.withCredentials = true;

export default springApi;

// api request가 있는 경우 | api에 params가 들어가는 경우 -> springApi 호출로 baseURL만 받아서 request 넣거나, api 완성해서 axios 요청

// ----------------------------------------------------------------------------------------------------------------------------------

// api request 없고, params도 안들어가는 경우 -> NewvelApi.___ 호출로 바로 response 받을 수 있음

export const NewvelApi = {
  // users

  // 소셜 로그인
  logIn: () => springApi.get("/oauth2/authorization/kakao"),
  // 로그인 api 이게 맞나요...??

  // 에피소드 판매지수 높은 순 인기작가
  bestWriters: () => springApi.get("/users/best"),

  // 내 프로필 정보 반환
  profileInfo: () => springApi.get("/users"),

  // covers

  // 좋아요한 소설 표지 불러오기
  likesCovers: () => springApi.get("/covers/likes"),

  // 구매한 소설 표지
  purchasedCovers: () => springApi.get("/covers/purchased-on"),

  // episodes

  // 에피소드 구매목록 조회
  purchasedEpisodes: () => springApi.get("/episodes/purchased-on"),

  // assets

  // 내가 가지고 있는 에셋 조회
  purchasedAssets: () => springApi.get("/assets/purchased-on"),

  // genre

  // DB에 있는 전체 장르 목록 조회
  allGenres: () => springApi.get("/genres"),

  // tags

  // 태그 목록 조회
  tagsList: () => springApi.get("/tags"),
};
