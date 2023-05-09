import axios from "axios";
import styled from "styled-components";

function Logout() {
  const kakaoLogout = () => {
    axios
      .put("http://k8d1061.p.ssafy.io/api/users/signout")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <LogoutBtn onClick={kakaoLogout}>카카오 로그아웃</LogoutBtn>
    </Wrapper>
  );
}

export default Logout;

const Wrapper = styled.div``;

const LogoutBtn = styled.div`
  cursor: pointer;
`;
