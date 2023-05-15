import SemiTitle from "./SemiTitle";
import styled from "styled-components";

function MyAsset() {
  return (
    <AssetWrapper>
      <TitleWrapper>에셋</TitleWrapper>
      <SemiTitle title="구매한 에셋" more="" />
      <SemiTitle title="만든 에셋" more="" />
    </AssetWrapper>
  );
}

export default MyAsset;

const AssetWrapper = styled.div``;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
