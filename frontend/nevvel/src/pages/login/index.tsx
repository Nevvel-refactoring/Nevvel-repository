import styled from "styled-components";

function Login() {
  return <Wrapper>Login</Wrapper>;
}

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

export default Login;
