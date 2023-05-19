import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AssetCard from "../common/AssetCard";
import imgdata from "./DummyAssetData_Image.json"
import sounddata from "./DummyAssetData_Audio.json"

import { Modal } from "../common/Modal";
import AssetDetailModal from "./AssetDetailModal";

import springApi from "@/src/api";


interface AssetTag {
  id : number,
  tagName : string,
  useCount : number
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
  isAvailable : boolean,
  tags: Array<AssetTag>,
  uploader : AssetUploader
}

interface AssetstorePorps {
  afterUpload : boolean;
  setAfterUpload : React.Dispatch<React.SetStateAction<boolean>>;
  reaxiosTrigger : boolean;
  setReaxiosTrigger : React.Dispatch<React.SetStateAction<boolean>>;
  queryString : string;
}

function AssetstoreAssetList(props : AssetstorePorps) {

  const [AssetData, setAssetData] = useState<Array<Asset>>([]);

  const [axiosURI, setAxiosURI] = useState<string>("/assets?assettype=IMAGE&page=1&searchtype=ALL&sort=downloadCount,desc")

  const [uritoAxios, setUritoAxios] = useState<boolean>(false)

  useEffect(() => {
    if (props.reaxiosTrigger === true){
      setAxiosURI(props.queryString)
      props.setReaxiosTrigger(false)
      setUritoAxios(true)
    }
  },[props.reaxiosTrigger])


  // axios로 데이터 get받아오기
  useEffect(() => {
    const getAssetList = async() => {
      const res = await springApi.get(`${axiosURI}`)
      // console.log(res.data.content)
      setAssetData(res.data.content)
    }
    getAssetList()
  },[])

  // reaxios로 데이터 get 받아오기
  useEffect(() => {
    const getAssetList = async() => {
      const res = await springApi.get(`${axiosURI}`)
      // console.log(res.data.content)
      setAssetData(res.data.content)
      setUritoAxios(false)
    }
    if (uritoAxios === true){
      getAssetList()
    }
  },[uritoAxios])


  // axios reloader

  const[axiosReloader, setAxiosReloaer] = useState<boolean>(false)

  useEffect(() => {
    const getAssetList = async() => {
      const res = await springApi.get(`/assets?assettype=IMAGE&pageNum=1&searchtype=ALL&sort =downloadCount`)
      // console.log(res.data.content)
      setAssetData(res.data.content)
      setAxiosReloaer(false)
      props.setAfterUpload(false)
    }
    if (axiosReloader === true) {
      getAssetList()
    }
    if (axiosReloader === true){
      getAssetList()
    }
  },[axiosReloader, props.afterUpload])  



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
    isAvailable : false,
    tags: [{
      id : 0,
      tagName : "",
      useCount : 0
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