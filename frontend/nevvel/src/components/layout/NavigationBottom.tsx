import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import nevvel_light from "../../assets/img/nevvel_light.png";
import nevvel_dark from "../../assets/img/nevvel_dark.png";
import nevvel_m_light from "../../assets/img/nevvel_m_light.png";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import styled from "styled-components";
import { tabletH } from "../../util/Mixin";
import { mobile } from "../../util/Mixin";
import { themeAtom } from "@/src/store/Theme";
import { useAtomValue } from "jotai";

function NavigationBottom() {
  const router = useRouter();
  const value = useAtomValue(themeAtom);

  const genreSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/genres",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/genres`
    );
  };

  const completedSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/completed",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/completed`
    );
  };

  const latestSelectHandler = () => {
    router.push(
      {
        pathname: "/novels/latest",
        query: { genre: 1, sort: "like" },
      }
      // `/novels/latest`
    );
  };

  return (
    <Wrapper>
      <Link href="/">
        {value === "light" ? (
          <Image src={nevvel_light} alt="Logo" width={100} height={25} />
        ) : (
          <Image src={nevvel_dark} alt="Logo" width={100} height={25} />
        )}
      </Link>
      <Novel>
        <Genre onClick={genreSelectHandler}>장르별 소설</Genre>
        <Completed onClick={completedSelectHandler}>완결 소설</Completed>
        <Latest onClick={latestSelectHandler}>최신 소설</Latest>
        <AssetStore>
          <Link href="/assetstore/assetstore">에셋 스토어</Link>
        </AssetStore>
      </Novel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3.75rem;
  padding-left: 2rem;
  padding-right: 8rem;

  ${tabletH} {
    padding-right: 12%;
    justify-content: space-between;
  }

  ${mobile}
`;

const Novel = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-left: 20%;

  ${tabletH} {
    margin-left: 0;
    width: 80%;
    font-size: 14px;
  }

  ${mobile} {
    margin-left: 2rem;
    width: 100%;
  }
`;

const Genre = styled.div`
  cursor: pointer;
`;

const Completed = styled.div`
  cursor: pointer;
`;

const Latest = styled.div`
  cursor: pointer;
`;

const AssetStore = styled.div``;

export default NavigationBottom;
