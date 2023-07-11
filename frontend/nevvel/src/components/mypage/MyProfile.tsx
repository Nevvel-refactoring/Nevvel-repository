import { userInfoAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { NewvelApi } from "@/src/api";
import styled from "styled-components";

function MyProfile() {
  const userInfoStatus = useAtomValue(userInfoAtom);

  // 유저 Description 받아오기
  const [userDescription, setUserDescription] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const getUserData = async () => {
      const res = await NewvelApi.profileInfo();
      // console.log(res.data.description);
      setUserDescription(res.data.description);
    };
    getUserData();
  }, []);

  return (
    <ProfileWrapper>
      <TitleWrapper>내 프로필</TitleWrapper>
      <ProfileContent>
        <ProfileImgDiv>
          <ProfileImg src={userInfoStatus?.profileImage} alt="내 프로필 사진" />
        </ProfileImgDiv>
        <NickNameDescDiv>
          <NickName>{userInfoStatus?.nickname}</NickName>
          <Description>{userDescription}</Description>
        </NickNameDescDiv>
      </ProfileContent>
    </ProfileWrapper>
  );
}

export default MyProfile;

const ProfileWrapper = styled.div``;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const ProfileImgDiv = styled.div`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  border-radius: 100rem;
  object-fit: cover;
  width: 128px;
  height: 128px;
`;

const ProfileImg = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 100rem;
`;

const NickNameDescDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const NickName = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const Description = styled.div`
  margin-top: 1rem;
`;
