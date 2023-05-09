import styled from "styled-components";

function Login() {
  const kakaoLogin = "http://k8d106.p.ssafy.io/oauth2/authorization/kakao";

  return (
    <Wrapper>
      <LoginBtn href={kakaoLogin}>카카오 로그인</LoginBtn>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

const LoginBtn = styled.a``;
