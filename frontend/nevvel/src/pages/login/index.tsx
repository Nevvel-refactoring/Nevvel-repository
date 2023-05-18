import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import kakao_login from "../../assets/img/kakao_login_medium_narrow.png";
import styled from "styled-components";

function Login() {
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
