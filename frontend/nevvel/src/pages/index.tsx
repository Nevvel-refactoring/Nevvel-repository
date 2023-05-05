import NovelSwiper from "../components/main/NovelSwiper";
import BestDetails from "../components/main/BestDetails";
import AssetSwiper from "../components/main/AssetSwiper";
import styled from "styled-components";

export default function Home() {
  return (
    <HomeWrapper>
      <DetailWrapper>
        <BestDetails title="베스트 콘텐츠" more="/novels/genres" />
        <NovelSwiper />
      </DetailWrapper>
      <Line />
      <DetailWrapper>
        <BestDetails title="베스트 에셋" more="/assetstore/assetstore" />
        <AssetSwiper />
      </DetailWrapper>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

const DetailWrapper = styled.div``;

const Line = styled.hr`
  width: 90%;
`;
