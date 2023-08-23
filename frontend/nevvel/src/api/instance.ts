import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE_URL);

// api request가 있는 경우 | api에 params가 들어가는 경우 -> springApi 호출로 baseURL만 받아서 request 넣거나, api 완성해서 axios 요청
const springApi = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: "https://www.nevvel.net:8081/api",
  // http://3.35.53.215:8080//api
  // https://k8d106.p.ssafy.io:8080/api
});
springApi.defaults.withCredentials = true;

export default springApi;

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
