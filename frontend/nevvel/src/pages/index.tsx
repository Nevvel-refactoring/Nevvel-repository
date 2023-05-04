import AssetSwiper from "../components/main/AssetSwiper";
import styled from "styled-components";
import NovelSwiper from "../components/main/NovelSwiper";

export default function Home() {
  return (
    <HomeWrapper>
      <NovelSwiper />
      <AssetSwiper />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  /* background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1}; */
`;
