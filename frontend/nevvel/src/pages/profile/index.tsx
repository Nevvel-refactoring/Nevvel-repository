import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import styled from "styled-components";

function Profile() {
  const loginStatus = useAtomValue(loginAtom);

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
