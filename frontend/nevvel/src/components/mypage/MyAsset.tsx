import { useState, useEffect } from "react";
import axios from "axios";
import SemiTitle from "./SemiTitle";
import styled from "styled-components";
import springApi, { NewvelApi } from "@/src/api/instance";
import AssetCard from "../common/AssetCard";
import { Modal } from "../common/Modal";
import AssetDetailModal from "../assetstore/AssetDetailModal";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "@/src/store/Login";
import { getPurchasedAssets } from "@/src/api/assets";

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
  const userInfoStatus = useAtomValue(userInfoAtom);
  // 만든 에셋
  const [uploadedAsset, setUploadedAsset] = useState<Asset | undefined>(
    undefined
  );
  const [uploadedAsset5, setUploadedAsset5] = useState<Content[] | undefined>(
    undefined
  );
  const [uploadedMore, setUploadedMore] = useState("");
  useEffect(() => {
    const getUploadedAssets = async () => {
      const res = await springApi.get(`/assets/uploader/${userInfoStatus?.id}`);
      // console.log(res.data);
      setUploadedAsset(res.data);
      if (res.data.empty) {
        setUploadedMore("");
      } else {
        setUploadedMore("/myPage/uploadedAsset");
      }
    };
    getUploadedAssets();
  }, []);
  // 구매한 에셋 5개 받아오기
  useEffect(() => {
    // console.log(uploadedAsset?.content?.slice(0, 5));
    setUploadedAsset5(uploadedAsset?.content?.slice(0, 5));
  }, [uploadedAsset]);

  // 구매한 에셋
  const [purchasedAsset, setPurchasedAsset] = useState<Asset | undefined>(
    undefined
  );
  const [purchasedAsset5, setPurchasedAsset5] = useState<Content[] | undefined>(
    undefined
  );
  const [purchasedMore, setPurchasedMore] = useState("");
  useEffect(() => {
    const getPurchasedAsset = async () => {
      const res = await getPurchasedAssets(undefined);
      if (res != null) {
        // console.log(res.data);
        setPurchasedAsset(res.data);
        if (res.data.empty) {
          setPurchasedMore("");
        } else {
          setPurchasedMore("/myPage/purchasedAsset");
        }
      }
    };
    getPurchasedAsset();
  }, []);
  // 구매한 에셋 5개 받아오기
  useEffect(() => {
    // console.log(purchasedAsset?.content?.slice(0, 5));
    setPurchasedAsset5(purchasedAsset?.content?.slice(0, 5));
  }, [purchasedAsset]);

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
    <AssetWrapper>
      <TitleWrapper>에셋</TitleWrapper>
      <AssetContent>
        <SemiTitle title="생성한 에셋" more={uploadedMore} />
        <UploadedAssetDiv>
          {uploadedAsset?.empty ? (
            <EmptyDiv>생성한 에셋이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <AssetDiv>
              {uploadedAsset5?.map((asset, index: number) => {
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
            </AssetDiv>
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
        </UploadedAssetDiv>
      </AssetContent>
      <AssetContent>
        <SemiTitle title="구매한 에셋" more={purchasedMore} />
        <PurchasedAssetDiv>
          {purchasedAsset?.empty ? (
            <EmptyDiv>구매한 에셋이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <AssetDiv>
              {purchasedAsset5?.map((asset, index: number) => {
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
            </AssetDiv>
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
        </PurchasedAssetDiv>
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

const PurchasedAssetDiv = styled.div``;

const UploadedAssetDiv = styled.div``;

const EmptyDiv = styled.div`
  padding-left: 8%;
  margin-top: 1rem;
  text-align: center;
`;

const AssetDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
`;
