import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import kakao_login from "../../assets/img/kakao_login_medium_narrow.png";
import styled from "styled-components";

import { useAtom } from "jotai";
import { userInfoAtom, loginAtom } from "@/src/store/Login";
import { NextPageContext } from "next";

function Login(props: { userDTO: string }) {
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

  const router = useRouter();

  const kakaoLogin = () => {
    router.push("https://k8d1061.p.ssafy.io/api/oauth2/authorization/kakao");
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={nevvel_m_dark} alt="로그인" width={300} height={300} />
      </ImageWrapper>
      <LoginText>Nevvel 로그인</LoginText>
      <LoginImage>
        <Image onClick={kakaoLogin} src={kakao_login} alt="카카오 로그인" />
      </LoginImage>
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

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  margin-top: 5rem;
  opacity: 0.3;
`;

const LoginText = styled.div`
  position: absolute;
  margin-top: -3rem;
  font-size: 20px;
  font-weight: 800;
`;

const LoginImage = styled.div`
  position: absolute;
  margin-top: 10rem;
`;
