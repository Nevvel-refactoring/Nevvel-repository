import styled from "styled-components";

function Logout() {
  const kakaoLogout = "http://k8d106.p.ssafy.io/api/users/logout";

  return (
    <Wrapper>
      <LogoutBtn href={kakaoLogout}>카카오 로그아웃</LogoutBtn>
    </Wrapper>
  );
}

export default Logout;

const Wrapper = styled.div``;

const LogoutBtn = styled.a``;
