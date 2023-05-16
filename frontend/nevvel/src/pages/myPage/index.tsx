import { useEffect } from "react";
import { useRouter } from "next/router";
import springApi from "@/src/api";
import { NewvelApi } from "@/src/api";
import MyProfile from "@/src/components/mypage/MyProfile";
import MyPoint from "@/src/components/mypage/MyPoint";
import MyNovel from "@/src/components/mypage/MyNovel";
import MyAsset from "@/src/components/mypage/MyAsset";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import styled from "styled-components";

function MyPage() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  const router = useRouter();
  useEffect(() => {
    if (!loginStatus) {
      router.push({ pathname: "/" });
    }
  }, []);

  // // 작성한 소설
  // useEffect(() => {
  //   const getUploadedCovers = async () => {
  //     // const res = await springApi.get(`/covers/uploader/${}`)
  //     // console.log(res)
  //   };
  //   getUploadedCovers();
  // }, []);

  // // 구매한 소설
  // useEffect(() => {
  //   const getPurchasedCovers = async () => {
  //     const res = await NewvelApi.purchasedCovers();
  //     console.log(res);
  //   };
  //   getPurchasedCovers();
  // }, []);

  // // 좋아요한 소설
  // useEffect(() => {
  //   const getLikeCovers = async () => {
  //     const res = await NewvelApi.likesCovers();
  //     console.log(res);
  //   };
  //   getLikeCovers();
  // }, []);

  // // 구매한 에셋
  // useEffect(() => {
  //   const getPurchasedAssets = async () => {
  //     const res = await NewvelApi.purchasedAssets();
  //     console.log(res);
  //   };
  //   getPurchasedAssets();
  // }, []);

  // // 만든 에셋
  // useEffect(() => {
  //   const getUploadedAssets = async () => {
  //     // const res = await springApi.get(`/assets/uploader/${}`)
  //     // console.log(res)
  //   };
  //   getUploadedAssets();
  // }, []);

  return (
    <Wrapper>
      {loginStatus ? (
        <>
          <MyProfile />
          <MyPoint />
          <MyNovel />
          <MyAsset />
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
`;
