import { useState, useEffect } from "react";
import axios from "axios";
import SemiTitle from "./SemiTitle";
import styled from "styled-components";
import { NewvelApi } from "@/src/api";

interface Content {
  id: number;
  title: string;
  type: string;
  uploader: {
    id: number;
    nickname: string;
    profileImage: string;
  };
  thumbnail: string;
  url: string;
  price: number;
  downloadCount: number;
  isAvailable: boolean;
  tags: {
    id: number;
    tagName: string;
    useCount: number;
  }[];
}

interface Asset {
  content: Content[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

function MyAsset() {
  // 만든 에셋

  // 구매한 에셋
  const [purchasedAsset, setPurchasedAsset] = useState<Asset | undefined>(
    undefined
  );
  const [purchasedAsset5, setPurchasedAsset5] = useState<Content[] | undefined>(
    undefined
  );
  const [purchasedMore, setPurchasedMore] = useState("");
  useEffect(() => {
    const getPurchasedAssets = async () => {
      const res = await NewvelApi.purchasedAssets();
      // console.log(res.data);
      setPurchasedAsset(res.data);
      if (res.data.empty) {
        setPurchasedMore("");
      } else {
        setPurchasedMore("/myPage/purchasedAsset");
      }
    };
    getPurchasedAssets();
  }, []);
  // 구매한 에셋 5개 받아오기
  useEffect(() => {
    setPurchasedAsset5(purchasedAsset?.content?.slice(0, 5));
  }, [purchasedAsset]);

  return (
    <AssetWrapper>
      <TitleWrapper>에셋</TitleWrapper>
      <AssetContent>
        <SemiTitle title="만든 에셋" more="" />
      </AssetContent>
      <AssetContent>
        <SemiTitle title="구매한 에셋" more={purchasedMore} />
      </AssetContent>
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

const AssetContent = styled.div`
  display: flex;
  flex-direction: column;
`;
