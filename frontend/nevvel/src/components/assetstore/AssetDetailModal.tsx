import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";

import { ModalonModal } from "../common/ModalonModal";
import AskBuyModalContent from "./AskBuyModalContent";

interface AssetTag {
  id : number,
  name : string,
}

interface AssetUploader {
  id : number,
  nickname : string,
  profileImage : string,
}

type ModalDataProps = {
  openModalData:{
    id: number,
    title: string,
    type: string,
    thumbnail : string,
    url: string,
    price : number,
    downloadCount : number,
    tags: Array<AssetTag>,
    uploader : AssetUploader
  },
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AssetDetailModal({
  openModalData,
  setModalOpen
  } : ModalDataProps) {

  // 오디오 재생
  const audioRef = useRef<any>(null)

  // hover 트리거
  const [hoverTrigger, setHoverTrigger] = useState<number>(0)

  // 이미지 hover 기능
  const hoverOn= () => {
    setHoverTrigger(1)
  }
  const hoverOff= () => {
    setHoverTrigger(0)
  }

  // 오디오 hover 기능
  const AudioOn= () => {
    setHoverTrigger(1)
    audioRef.current.play()
  }
  const AudioOff= () => {
    setHoverTrigger(0)
    audioRef.current.pause()
  }

  // 구매버튼으로 모달 위의 모달 열기
  const [modalonModalOpen, setModalonModalOpen] = useState<boolean>(false)

  const OpenModalonModal = () => {
    setModalonModalOpen(true)
  }


  // 모달창 닫기
  const CloseAssetDetail = () => {
    setModalOpen(false)
  }


  return(
    <div>
      <RowDiv>
        <audio ref={audioRef} src={`${openModalData.url}`} />
        {
          openModalData.type === "AUDIO"?
          (
            hoverTrigger === 0?
            <ThumbnailImg
            onMouseOver={AudioOn}
            src="https://cdn4.iconfinder.com/data/icons/proglyphs-multimedia/512/Volume_Off-512.png"
            alt="thumbnail"
            />
            :
            <ThumbnailImg
              onMouseLeave={AudioOff}
              src={openModalData.thumbnail}
              alt="thumbnail"
            />
          )
          :
          (
            hoverTrigger === 0?
            <ThumbnailImg
              onMouseOver={hoverOn}
              src={openModalData.thumbnail}
              alt="thumbnail"
            />
            :
            <ThumbnailImg
              onMouseLeave={hoverOff}
              src={openModalData.url}
              alt="thumbnail"
            />
            )
        }
        <ColDiv>
          <DetailInfoP>
            {openModalData.title}
          </DetailInfoP>

          <RowDiv>

            <ColDiv>
              <TagRowDiv>
                {/* <DetailInfoP>{tagLIst}</DetailInfoP> */}
                {
                  openModalData.tags.map((tag) => {
                    return(
                    <CardInfo2Div key={tag.id}>
                      <p>{tag.name}</p>
                    </CardInfo2Div>
                    )
                  })
                }
                {/* {
                  tagLIst.map((tags) => {
                    <CardInfo2Div>
                    <p>{tags}</p>
                    </CardInfo2Div>
                  })
                } */}
              </TagRowDiv>
              <RowDiv>
                <UploaderImg
                  src={openModalData.uploader.profileImage}
                  alt="profileimg"
                />
                <DetailInfoP>&nbsp;&nbsp;{openModalData.uploader.nickname}</DetailInfoP>
              </RowDiv>
            </ColDiv>

            <ColDiv>
              <DetailInfoP>
                가격 : {openModalData.price} Point
              </DetailInfoP>
              <DetailInfoP>
                다운로드 수 : {openModalData.downloadCount}
              </DetailInfoP>
              <ModalBtn onClick={OpenModalonModal}>구매</ModalBtn>
            </ColDiv>

          </RowDiv>

        </ColDiv>

      </RowDiv>
      <hr />
      <DetailInfoP>미리보기</DetailInfoP>
      <hr />
      <MiriDiv>

      </MiriDiv>
      <ModalBtn onClick={CloseAssetDetail}>닫기</ModalBtn>
      {/* 여기부터 모달온 모달 */}
      {modalonModalOpen ? (
        <ModalonModal
          modal={modalonModalOpen}
          width="500"
          height="300"
          element={
            <AskBuyModalContent
              setModalonModalOpen={setModalonModalOpen}
            />
          }
          setModalonModalOpen={setModalonModalOpen}
        />
      ) : null}
    </div>
  )
}

export default AssetDetailModal

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const TagRowDiv = styled.div`
  width: 15rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-bottom: 0.5rem;
`

const ThumbnailImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  object-fit: contain;
`

const UploaderImg = styled.img`
  width: 3rem;
  height: 2.5rem;
  border-radius: 1rem;
`
const DetailInfoP = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

// 에셋카드 재활용
const CardInfo2Div = styled.div`
  background-color: white;
  color: black;
  width: 4rem;
  height: 2rem;
  border-radius: 0.5rem;
  /* box-shadow: 0.5rem 0.5rem 0.2rem; */
  border: 0.15rem inset black;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  font-size: 1rem;
`

const MiriDiv = styled.div`
  width: 45rem;
  height: 45rem;
  border: 0.1rem solid #4D4D4D;
  border-radius: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const ModalBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  /* margin-left: 0.5rem; */
  margin-top: 1rem;
  margin-bottom: 1rem;
`