import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

import { useAtomValue } from "jotai";
import { tabletH } from "../../util/Mixin";
import { mobile } from "../../util/Mixin";
import { themeAtom } from "@/src/store/Theme";

import nevvel_light from "../../assets/img/nevvel_light.png";
import nevvel_dark from "../../assets/img/nevvel_dark.png";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";

interface Props {
  clickNull: boolean;
  onClickBottom: () => void;
}

function NavigationBottom(props: Props) {
  const router = useRouter();
  const value = useAtomValue(themeAtom);
  const [userD, setUserD] = useState<boolean | number>(false);

  // 소설 목록 클릭했을 때 배경색 주기
  const [clicked, setClicked] = useState<string | null>(null);

  useEffect(() => {
    const isTouchDevice: boolean | number =
      navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
    setUserD(isTouchDevice);
  }, []);

  const genreSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/genres",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/genres`
    );
    setClicked("genre");
    props.onClickBottom();
  };

  const completedSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/completed",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/completed`
    );
    setClicked("completed");
    props.onClickBottom();
  };

  const latestSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/latest",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/latest`
    );
    setClicked("latest");
    props.onClickBottom();
  };

  // assetstore 클릭 시 색상 초기화 설정을 위한 handler
  const assetstoreHandler = () => {
    setClicked(null);
  };

  // Logo 클릭 시 색상 초기화 설정을 위한 handler
  const logoHandler = () => {
    setClicked(null);
  };

  // NavigationTop에서 버튼 클릭했을 때
  useEffect(() => {
    if (props.clickNull) {
      setClicked(null);
    }
  }, [props.clickNull]);

  // series 페이지로 넘어갔을 때
  useEffect(() => {
    if (router.pathname === "/series/[id]") {
      setClicked(null);
    }
  }, [router]);

  return (
    <Wrapper clicked={clicked === null}>
      <LogoNav onClick={logoHandler}>
        <Link href="/">
          {userD ? (
            <Image src={nevvel_m_dark} alt="Logo" width={25} height={25} />
          ) : value === "light" ? (
            <Image src={nevvel_light} alt="Logo" width={100} height={25} />
          ) : (
            <Image src={nevvel_dark} alt="Logo" width={100} height={25} />
          )}
        </Link>
      </LogoNav>
      <Novel>
        <BackgroundDiv>
          <NavList clicked={clicked === "genre"} onClick={genreSelectHandler}>
            {userD ? "장르" : "장르별 소설"}
          </NavList>
        </BackgroundDiv>
        <BackgroundDiv>
          <NavList
            clicked={clicked === "completed"}
            onClick={completedSelectHandler}
          >
            {userD ? "완결" : "완결 소설"}
          </NavList>
        </BackgroundDiv>
        <BackgroundDiv>
          <NavList clicked={clicked === "latest"} onClick={latestSelectHandler}>
            {userD ? "최신" : "최신 소설"}
          </NavList>
        </BackgroundDiv>
        <BackgroundDiv>
          <AssetStore onClick={assetstoreHandler}>
            <Link href="/assetstore/assetstore">
              {userD ? "에셋" : "에셋 스토어"}
            </Link>
          </AssetStore>
        </BackgroundDiv>
      </Novel>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  height: 3.75rem;
  padding-left: 2rem;
  padding-right: 8rem;

  border-bottom: 0.5px solid
    ${({ clicked, theme }) => (clicked ? "#e6e6e6" : theme.color.subNavbar)};

  ${tabletH} {
    padding-right: 12%;
    justify-content: space-between;
  }

  ${mobile}
`;

const LogoNav = styled.div`
  margin-top: 0.75rem;
`;

const Novel = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-left: 10%;

  ${tabletH} {
    margin-left: 0;
    width: 80%;
    font-size: 14px;
  }

  ${mobile} {
    margin-left: 1rem;
    width: 100%;
  }
`;

const BackgroundDiv = styled.div`
  display: flex;
  width: 25%;
  height: 3rem;
  line-height: 3rem;
  margin-top: 0.75rem;
`;

const NavList = styled.div<{ clicked: boolean }>`
  cursor: pointer;
  text-align: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: ${({ clicked, theme }) =>
    clicked ? theme.color.subNavbar : ""};
  color: ${({ clicked, theme }) =>
    clicked ? theme.color.text2 : theme.color.text1};
  ${mobile} {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
  }
`;

const AssetStore = styled.div`
  text-align: center;
  width: 100%;
  a {
    ${mobile} {
      font-size: 12px;
    }
  }
`;

export default NavigationBottom;
