import styled from "styled-components";

function Login() {
  const kakaoLogin =
    "http://k8d1061.p.ssafy.io:8080/oauth2/authorization/kakao";

  return (
    <Wrapper>
      <LoginBtn href={kakaoLogin}>카카오 로그인</LoginBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

const LoginBtn = styled.a``;

export default Login;
