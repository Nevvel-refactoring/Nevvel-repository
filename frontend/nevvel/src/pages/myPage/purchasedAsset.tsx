import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import AssetCard from "@/src/components/common/AssetCard";
import { Modal } from "../../components/common/Modal";
import AssetDetailModal from "../../components/assetstore/AssetDetailModal";
import axios from "axios";
import { NewvelApi } from "@/src/api";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import styled from "styled-components";

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

function purchasedAsset() {
  // 로그인 여부 확인
  const loginStatus = useAtomValue(loginAtom);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  // 로그인 상태인 경우 axios 요청
  const router = useRouter();
  const [purchasedAsset, setPurchasedAsset] = useState<Asset | undefined>(
    undefined
  );
  useEffect(() => {
    const getPurchasedAssets = async () => {
      const res = await NewvelApi.purchasedCovers();
      // console.log(res.data);
      setPurchasedAsset(res.data);
    };
    // if (!loginStatus) {
    //   router.push({ pathname: "/" });
    // } else {
    getPurchasedAssets();
    // }
  }, []);

  // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 key값
  const [openModalData, setOpenModalData] = useState<Content>({
    id: 0,
    title: "",
    type: "",
    thumbnail: "",
    url: "",
    price: 0,
    downloadCount: 0,
    isAvailable: false,
    tags: [
      {
        id: 0,
        tagName: "",
        useCount: 0,
      },
    ],
    uploader: {
      id: 0,
      nickname: "",
      profileImage: "",
    },
  });

  // 모달의 모달이 어떻게 나올지 결정해주는 인자
  const [modalStarter, setModalStarter] = useState<boolean>(true);

  const [axiosReloader, setAxiosReloaer] = useState<boolean>(false);

  return (
    <Wrapper>
      <AssetTop>구매한 에셋</AssetTop>
      {purchasedAsset?.empty ? (
        <AssetEmptyWrapper>
          <ImageWrapper>
            <Image
              src={nevvel_m_dark}
              alt="구매한 에셋이 존재하지 않습니다."
              width={300}
              height={300}
            />
          </ImageWrapper>
          <AssetEmpty>구매한 에셋이 존재하지 않습니다.</AssetEmpty>
        </AssetEmptyWrapper>
      ) : (
        <AssetExists>
          {purchasedAsset?.content.map((asset, index: number) => {
            return (
              <AssetCard
                key={index}
                AssetData={asset}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                thumbnail={asset.thumbnail}
                url={asset.url}
                tags={asset.tags}
                setModalOpen={setModalOpen}
                setOpenModalData={setOpenModalData}
              />
            );
          })}
        </AssetExists>
      )}
      {/* 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="710"
          element={
            <AssetDetailModal
              openModalData={openModalData}
              setModalOpen={setModalOpen}
              modalStarter={modalStarter}
              setAxiosReloaer={setAxiosReloaer}
            />
          }
        />
      ) : null}
    </Wrapper>
  );
}

export default purchasedAsset;

const Wrapper = styled.div``;

const AssetTop = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 800;
`;

const AssetEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AssetEmpty = styled.div`
  position: absolute;
  margin-top: 5rem;
`;

const ImageWrapper = styled.div`
  margin-top: 2rem;
  opacity: 0.3;
`;

const AssetExists = styled.div``;
