import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import MyProfile from "@/src/components/mypage/MyProfile";
import styled from "styled-components";

function EditMyProfile() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  const router = useRouter();
  useEffect(() => {
    if (!loginStatus) {
      router.push({ pathname: "/" });
    }
  }, []);

  return (
    <Wrapper>
      {loginStatus ? (
        <>
          <ProfileTitle>프로필 수정</ProfileTitle>
          <MyProfile />
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default EditMyProfile;

const Wrapper = styled.div`
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 5rem;
`;

const ProfileTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
`;
