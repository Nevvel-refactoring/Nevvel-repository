import { NextPageContext } from "next";
import { loginAtom, userInfoAtom } from "../store/Login";
import { useAtom } from "jotai";
import { useEffect } from "react";
import NovelSwiper from "../components/main/NovelSwiper";
import BestDetails from "../components/main/BestDetails";
import AssetSwiper from "../components/main/AssetSwiper";
import styled from "styled-components";

export default function Home(props: { userDTO: string }) {
  // console.log(props.userDTO);
  const userDTO = props.userDTO === "" ? "" : JSON.parse(props.userDTO);
  const newUserInfo =
    userDTO === ""
      ? undefined
      : {
          id: userDTO.id,
          nickname: userDTO.nickname,
          profileImage: userDTO.profileImage,
          // description: userDTO.description,
          point: userDTO.point,
        };
  // console.log(userDTO);
  // console.log(userDTO.id);
  // console.log(userDTO.nickname);
  // console.log(userDTO.profileImage);
  // console.log(userDTO.description);
  // console.log(userDTO.point);

  // 쿠키 상태 관리
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
  useEffect(() => {
    setLoginStatus(userDTO === "" ? false : true);
    setUserInfoStatus(newUserInfo);
  }, []);

  // console.log(loginStatus);
  // console.log(userInfoStatus);

  return (
    <HomeWrapper>
      <DetailWrapper>
        <BestDetails title="베스트 콘텐츠" more="/novels" />
        <NovelSwiper />
      </DetailWrapper>
      <Line />
      <DetailWrapper>
        <BestDetails title="베스트 에셋" more="/assetstore/assetstore" />
        <AssetSwiper />
      </DetailWrapper>
    </HomeWrapper>
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

const HomeWrapper = styled.div`
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

const DetailWrapper = styled.div``;

const Line = styled.hr`
  width: 82%;
`;
