import { useEffect } from "react";
import { useRouter } from "next/router";
import MyProfile from "@/src/components/mypage/MyProfile";
import MyPoint from "@/src/components/mypage/MyPoint";
import MyNovel from "@/src/components/mypage/MyNovel";
import MyAsset from "@/src/components/mypage/MyAsset";
import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { useAtom } from "jotai";
import styled from "styled-components";

import { NextPageContext } from "next";

function MyPage(props: { userDTO: string }) {
  const userDTO = props.userDTO === "" ? "" : JSON.parse(props.userDTO);
  const newUserInfo =
    userDTO === ""
      ? undefined
      : {
          id: userDTO.id,
          nickname: userDTO.nickname,
          profileImage: userDTO.profileImage,
          point: userDTO.point,
        };

  // 쿠키 상태 관리
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
  useEffect(() => {
    setLoginStatus(userDTO === "" ? false : true);
    setUserInfoStatus(newUserInfo);
  }, []);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  const router = useRouter();
  // useEffect(() => {
  //   if (!loginStatus) {
  //     router.push({ pathname: "/" });
  //   }
  // }, []);

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
      {/* {loginStatus ? (
        <> */}
          <MyProfile />
          <MyPoint />
          <MyNovel />
          <MyAsset />
        {/* </>
      ) : (
        <></>
      )} */}
    </Wrapper>
  );
}

// 쿠키 확인
export async function getServerSideProps({ req }: NextPageContext) {
  const cookies =
    req && req.headers && req.headers.cookie ? req.headers.cookie : "";
  const cookie = decodeURIComponent(cookies);
  // 쿠키를 ; 기준으로 나누어 그 중 userDto가 존재하는지 확인
  const parts = cookie.split("; ");
  let userDTOcookie = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("userDto=")) {
      userDTOcookie = parts[i].substring("userDto=".length);
      break;
    }
  }
  return {
    props: {
      userDTO: userDTOcookie,
    },
  };
}

export default MyPage;

const Wrapper = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
`;
