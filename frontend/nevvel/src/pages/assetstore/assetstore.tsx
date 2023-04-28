import React from "react";
import styled from "styled-components";
import AssetstoreBanner from "@/src/components/assetstore/AssetstoreBanner";
import AssetstoreAssetList from "@/src/components/assetstore/AssetstoreAssetList";

function assetstore() {
  return (
    <Wrapper>
      <AssetstoreBanner />
      <AssetstoreAssetList />
    </Wrapper>
  )
}

export default assetstore

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 1%;
  padding-left: 3%;
  padding-right: 3%;
`;