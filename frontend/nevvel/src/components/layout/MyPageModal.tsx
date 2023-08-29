import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { postLogout } from "@/src/api/oauth";

interface ModalProps {
  modal: any;
  width: string;
  height: string;
  setModal: Dispatch<SetStateAction<boolean>>;
  onClickProfile: () => void;
}

export const MyPageModal = ({
  width,
  height,
  setModal,
  onClickProfile,
}: ModalProps) => {
  const disableModal = () => {
    setModal(false);
  };

  // myPage 라우터
  const router = useRouter();
  const toMyPageHandler = () => {
    router.push({ pathname: "/myPage" });
    setModal(false);
    onClickProfile();
  };

  // 로그아웃
  const kakaoLogout = () => {
    setModal(false);
    onClickProfile();
    const KaKaoLogout = async () => {
      const res = await postLogout();
      if (res === true) {
        console.log(444);
        // localStorage 초기화
        localStorage.removeItem("loginStatus");
        localStorage.removeItem("userInfoStatus");
        // 로그아웃 후 메인페이지 리다이렉트
        router.push({ pathname: "/" });
      }
      console.log(333);
    };
    KaKaoLogout();
    // axios
    //   .post("https://www.nevvel.net:8081/api/users/signout", null, {
    //     withCredentials: true,
    //   })
    //   .then(() => logoutRoute())
    //   .catch((error) => console.log(error));
  };

  // 로그아웃 후 로그아웃페이지 리다이렉트
  const logoutRoute = () => {
    router.push({ pathname: "/logout" });
  };

  return (
    <>
      <Container width={width} height={height}>
        <Wrapper>
          <ModalDiv onClick={toMyPageHandler}>마이페이지</ModalDiv>
          <LogoutDiv onClick={kakaoLogout}>로그아웃</LogoutDiv>
        </Wrapper>
      </Container>
      <Canvas onClick={disableModal} />
    </>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  position: absolute;
  top: 4rem;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  padding-left: 10px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 8px;
  z-index: 2000;
  color: ${({ theme }) => theme.color.text1};
  border: 1px solid ${({ theme }) => theme.color.text1};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ModalDiv = styled.div`
  cursor: pointer;
  &:hover {
    color: #8385ff;
  }
`;

const LogoutDiv = styled.div`
  cursor: pointer;
  color: #ff0000;
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200vw;
  height: 200vh;
  z-index: 53;
`;
