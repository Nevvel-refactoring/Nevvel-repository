import React, { useState } from "react";
import { Asset } from "editor";
import styled from "styled-components";
import AssetCard from "@/src/components/common/AssetCard";
import { Modal } from "@/src/components/common/Modal";
import AssetDetailModal from "@/src/components/assetstore/AssetDetailModal";
import { mobile } from "@/src/util/Mixin";

type EditorMainAssetTotalListProps = {
  assetStore: Asset[];
  assetType: "AUDIO" | "IMAGE";
  setAssetType: React.Dispatch<React.SetStateAction<"AUDIO" | "IMAGE">>;
  setAxiosReloaer: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditorMainAssetTotalList({
  assetStore,
  assetType,
  setAssetType,
  setAxiosReloaer
}: EditorMainAssetTotalListProps) {

   // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 데이터
  const [openModalData, setOpenModalData] = useState<Asset>({
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
  const [modalStarter, setModalStarter] = useState<boolean>(true);

  return (
    <AssetList>
      <BtnContainer>
        <Btn onClick={() => setAssetType("IMAGE")}>IMAGE</Btn>
        <Btn onClick={() => setAssetType("AUDIO")}>AUDIO</Btn>
      </BtnContainer>
      {assetStore.map((asset, index) => (
        <AssetItem key={index}>
          <AssetCard
            AssetData={asset}
            key={asset.id}
            id={asset.id}
            title={asset.title}
            type={asset.type}
            thumbnail={asset.thumbnail}
            url={asset.url}
            tags={asset.tags}
            setModalOpen={setModalOpen}
            setOpenModalData={setOpenModalData}
            // price={AssetData.price}
            // uploader={AssetData.uploader}
          />
        </AssetItem>
      ))}
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="700"
          element={
            <AssetDetailModal
              openModalData={openModalData}
              setModalOpen={setModalOpen}
              modalStarter={modalStarter}
              setAxiosReloaer={setAxiosReloaer}  
            />
          }
        />
      )}
    </AssetList>
  );
}

const AssetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
  overflow: scroll;
  height: 80vh;
  position: relative;
  ${mobile}{
    height: 20vh;
    width:50vh;
  }
`;
const BtnContainer =styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 1rem;
  justify-content: flex-start;
  color:${({theme})=>theme.color.text1}
  ${mobile}{
    width:50vh;
  }
`
const AssetItem = styled.div`

  margin: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 4.5rem;
  height: 5.5rem;
  white-space: nowrap;
  text-align: start;
`;

const Btn = styled.div`
    color: ${({ theme }) => theme.color.text1};
`
const Img = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;
export default EditorMainAssetTotalList;
