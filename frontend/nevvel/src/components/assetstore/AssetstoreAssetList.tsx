import React from "react";
import styled from "styled-components";
import AssetCard from "../common/AssetCard";

function AssetstoreAssetList() {
  return(
    <Wrapper>
      에셋스토어 에셋 리스트 자리입니다
        <AssetCard />
      에셋스토어 에셋 리스트 자리입니다
    </Wrapper>
  )
}

export default AssetstoreAssetList

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 7%;
  padding-right: 7%;
`;