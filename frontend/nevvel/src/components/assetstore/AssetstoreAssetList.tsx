import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AssetCard from "../common/AssetCard";
import imgdata from "./DummyAssetData_Image.json"
import sounddata from "./DummyAssetData_Audio.json"

import { Modal } from "../common/Modal";
import AssetDetailModal from "./AssetDetailModal";


interface AssetTag {
  id : number,
  name : string,
}

interface AssetUploader {
  id : number,
  nickname : string,
  profileImage : string,
}

interface Asset {
  id: number,
  title: string,
  type: string,
  thumbnail : string,
  url: string,
  price : number,
  downloadCount : number,
  tags: Array<AssetTag>,
  uploader : AssetUploader
}

function AssetstoreAssetList() {

  const [AssetData, setAssetData] = useState<Array<Asset>>([]);

  // axios로 데이터 get받아오기, 현재는 더미데이터
  useEffect(() => {
    // setAssetData(imgdata.content);
    setAssetData(imgdata.content);
  },[])
  // console.log('이건데', AssetData)

  const changeImg = () => {
    setAssetData(imgdata.content)
  }
  const changeSound = () => {
    setAssetData(sounddata.content)
  }

  // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 데이터
  const[openModalData, setOpenModalData] = useState<Asset>({
    id: 0,
    title: "",
    type: "",
    thumbnail : "",
    url: "",
    price : 0,
    downloadCount : 0,
    tags: [{
      id : 0,
      name : "",
    }],
    uploader : {
      id : 0,
      nickname : "",
      profileImage : "",
    }
  })

  // 모달의 모달이 어떻게 나올지 결정해주는 인자
  const [modalStarter, setModalStarter] = useState<boolean>(true)

  return(
    <div>
      <div>
        {/* 이미지 데이터/사운드 데이터 스위치 버튼 */}
        <button onClick={changeImg}>이미지</button>
        <button onClick={changeSound}>사운드</button>
      </div>
      <Wrapper>
        {
          AssetData.map((AssetData) => {
            return (
              <AssetCard
                AssetData={AssetData}
                key={AssetData.id}
                id={AssetData.id}
                title={AssetData.title}
                type={AssetData.type}
                thumbnail={AssetData.thumbnail}
                url={AssetData.url}
                tags={AssetData.tags}

                setModalOpen={setModalOpen}
                setOpenModalData={setOpenModalData}
                // price={AssetData.price}
                // uploader={AssetData.uploader}
              />
            )
          })
        }
      </Wrapper>
      {/* 여기부터 모달 */}
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
            />
          }
        />
      ) : null}
    </div>
  )
}

export default AssetstoreAssetList

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* flex-direction: column; */
  width: 100%;
  height: 45%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 7%;
  padding-right: 7%;
`;