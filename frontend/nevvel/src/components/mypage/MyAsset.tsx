import { useState, useEffect } from "react";
import axios from "axios";
import SemiTitle from "./SemiTitle";
import styled from "styled-components";
import { NewvelApi } from "@/src/api";

function MyAsset() {
  // 구매한 에셋
  const [purchasedAsset, setPurchasedAsset] = useState();
  useEffect(() => {
    const getPurchasedAssets = async () => {
      const res = await NewvelApi.purchasedAssets();
      console.log(res.data);
    };
    // getPurchasedAssets();
  }, []);

  // 만든 에셋
  return (
    <AssetWrapper>
      <TitleWrapper>에셋</TitleWrapper>
      <SemiTitle title="구매한 에셋" more="" />
      <SemiTitle title="만든 에셋" more="" />
    </AssetWrapper>
  );
}

export default MyAsset;

const AssetWrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
