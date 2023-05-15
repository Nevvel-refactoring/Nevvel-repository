import Image from "next/image";
import styled from "styled-components";

function MyProfile() {
  return (
    <ProfileWrapper>
      <TitleWrapper>내 프로필</TitleWrapper>
      <ProfileContent>
        <ProfileImgDiv>
          {/* <Image /> */}
          이미지를 대신할 아무말
        </ProfileImgDiv>
        <NickNameDescDiv>
          <NickName>내 닉네임</NickName>
          <Description>
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명{" "}
          </Description>
        </NickNameDescDiv>
      </ProfileContent>
    </ProfileWrapper>
  );
}

export default MyProfile;

const ProfileWrapper = styled.div`
  width: 50%;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ProfileContent = styled.div`
  display: flex;
`;

const ProfileImgDiv = styled.div``;

const NickNameDescDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.div``;

const Description = styled.div``;
