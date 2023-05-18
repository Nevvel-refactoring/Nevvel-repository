import { useEffect } from "react";
import styled from "styled-components";

import { useAtom } from "jotai";
import { userInfoAtom, loginAtom } from "@/src/store/Login";
import { NextPageContext } from "next";

function Profile(props: { userDTO: string }) {
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

  return (
    <Wrapper>
      {loginStatus ? (
        <ProfileTitle>프로필</ProfileTitle>
      ) : (
        <ProfileTitle>로그인 하세요</ProfileTitle>
      )}
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

export default Profile;

const Wrapper = styled.div`
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 5rem;
`;

const ProfileTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
`;
