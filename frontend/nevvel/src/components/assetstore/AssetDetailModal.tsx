import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";

import { ModalonModal } from "../common/ModalonModal";
import AskBuyModalContent from "./AskBuyModalContent";
import DoneBuyAsset from "./DoneBuyAsset";

import DummyEpisode from "./DummyEpisodeforMiri.json"

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

type ModalDataProps = {
  openModalData:{
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
  };
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalStarter: boolean;
}

function AssetDetailModal({
  openModalData,
  setModalOpen,
  modalStarter
  } : ModalDataProps) {

  // 오디오 재생
  const audioRef = useRef<any>(null)

  // hover 트리거
  const [onOffTrigger, setOnOffTrigger] = useState<number>(0)

  // 이미지 hover 기능
  // const hoverOn= () => {
  //   setHoverTrigger(1)
  // }
  // const hoverOff= () => {
  //   setHoverTrigger(0)
  // }

  // 오디오 재생 기능
  const AudioOn= () => {
    setOnOffTrigger(1)
    audioRef.current.play()
  }
  const AudioOff= () => {
    setOnOffTrigger(0)
    audioRef.current.pause()
  }

  // 에셋 아이디 정의
  const AssetId = openModalData.id

  // 구매버튼으로 모달 위의 모달 열기
  const [modalonModalOpen, setModalonModalOpen] = useState<boolean>(false)

  const OpenModalonModal = () => {
    setModalonModalOpen(true)
  }

  // 모달 위의 모달 changer
  const [modalChanger, setModalChanger] = useState<boolean>(false)


  // 모달창 닫기
  const CloseAssetDetail = () => {
    setModalOpen(false)
  }

  // 미리보기 트리거
  const [miriTrigger, setMiriTrigger] = useState<number>(0)

  const MiriOperate = () => {
    if (miriTrigger === 0) {
      setMiriTrigger(1)
    } else if (miriTrigger === 1) {
      setMiriTrigger(2)
    } else {
      setMiriTrigger(0)
    }
  }

  useEffect(() => {
    if (miriTrigger > 0) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  },[miriTrigger])


  return(
    <AllDiv>
      <RowDiv>
        <audio ref={audioRef} src={`${openModalData.url}`} onEnded={AudioOn} />
        {
          openModalData.type === "AUDIO"?
          (
            onOffTrigger === 0?
            <ThumbnailImg
              onClick={AudioOn}
              src="https://cdn4.iconfinder.com/data/icons/proglyphs-multimedia/512/Volume_Off-512.png"
              alt="thumbnail"
            />
            :
            <ThumbnailImg
              onClick={AudioOff}
              src={openModalData.thumbnail}
              alt="thumbnail"
            />
          )
          :
          <ThumbnailImg
            src={openModalData.url}
            alt="image"
          />
        }
        <ColDiv>
          <DetailInfoP>
            {openModalData.title}
          </DetailInfoP>
          <br />

          <RowDiv>

            <ColDiv>
              <TagRowDiv>
                {/* <DetailInfoP>{tagLIst}</DetailInfoP> */}
                {
                  openModalData.tags.map((tag) => {
                    return(
                    <CardInfo2Div key={tag.id}>
                      <DetailInfoP>{tag.tagName}</DetailInfoP>
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
              <br />
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
              <br />
              <br />
              <DetailInfoP>
                다운로드 수 : {openModalData.downloadCount}
              </DetailInfoP>
              <br />
              <br />
              {
                openModalData.isAvailable?
                <UnModalBtn>구매완료</UnModalBtn>
                :
                <ModalBtn onClick={OpenModalonModal}>구매</ModalBtn>
              }
            </ColDiv>

          </RowDiv>

        </ColDiv>

      </RowDiv>
      <hr />
      <DetailInfoP>&nbsp;&nbsp;미리보기</DetailInfoP>
      <hr />
      {/* 미리보기 영역 클릭하면 미리보기 트리거가 0->1->2->0으로 순회 */}
      <MiriDiv onClick={MiriOperate}>
        {/* 미리보기 트리거 1됐을때 나타나는 에셋 */}
        {/* 데이터 타입이 이미지일 경우 이미지, 오디오일 경우 useRef 음원 재생 */}
        {
          miriTrigger > 0?
          (
            openModalData.type === "IMAGE"?
              <MiriImgDiv>
                <MiriImg
                  src={openModalData.url}
                  alt="image"
                />
              </MiriImgDiv>
              :
              null
          )
          :
          null
        }
        {/* 처음에 기본으로 있는 미리보기 내용 */}
        {
          DummyEpisode.contents.slice(0,7).map((sentence) => {
            return(
              <MiriPDiv key={sentence.idx}>
                <p>{sentence.context}</p>
              </MiriPDiv>
            )
          })
        }
        {/* 미리보기 트리거 1됐을때 나타나는 내용 */}
        {
          miriTrigger === 1?
          DummyEpisode.contents.slice(7,9).map((sentence) => {
            return(
              <MiriPDiv key={sentence.idx}>
                <p>{sentence.context}</p>
              </MiriPDiv>
            )
          })
          :
          // 미리보기 트리거 2됐을때 나타나는 내용
          (
            miriTrigger === 2?
            DummyEpisode.contents.slice(7,14).map((sentence) => {
              return(
                <MiriPDiv key={sentence.idx}>
                  <p>{sentence.context}</p>
                </MiriPDiv>
              )
            })
            :
            null
          )
        }
      </MiriDiv>

      <ModalBtn onClick={CloseAssetDetail}>닫기</ModalBtn>

      {/* 여기부터 모달온 모달 */}
      {modalonModalOpen ? (
        <ModalonModal
          modal={modalonModalOpen}
          width="500"
          height="300"
          element={
            // 모달 체인저로 구매 전이면 구매할 것인지 묻고, 구매 후에는 구매완료 띄움
            // 모달 스타터로 디테일 모달 시작한 페이지부터 쭉 props 함 -> 구매완료 창이 다른 경우를 컨트롤
            (
              modalChanger?
              <DoneBuyAsset
                setModalonModalOpen={setModalonModalOpen}
                setModalChanger={setModalChanger}
                modalStarter={modalStarter}
              />
              :
              <AskBuyModalContent
                setModalonModalOpen={setModalonModalOpen}
                setModalChanger={setModalChanger}
                AssetId={AssetId}
              />
            )
          }
          setModalonModalOpen={setModalonModalOpen}
        />
      ) : null}
    </AllDiv>
  )
}

export default AssetDetailModal

const AllDiv = styled.div`
  width: 50rem;
  height: 41rem;
  overflow-y: scroll;
  padding-left: 1rem;
`

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
  /* margin-top: 0.5rem;
  margin-bottom: 1rem; */
  color: ${({ theme }) => theme.color.text1};
`

// 에셋카드 재활용
const CardInfo2Div = styled.div`
  background-color: ${({ theme }) => theme.color.buttonText};
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
  margin-left: 1.5rem;
  position: relative;
`

const MiriClickDiv = styled.div`
  
`

const MiriPDiv = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  position: relative;
  /* z-index: 999; */
`

const MiriP = styled.p`
  
`
const MiriImgDiv = styled.div`
  width: 45rem;
  height: 45rem;
  /* border: 0.1rem solid black; */
  /* margin-left: 4.75rem; */
  position: absolute;
  /* margin-top: 5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const MiriImg = styled.img`
  /* float: left; */
  border-radius: 1rem;
  opacity: 0.7;
  width: 35rem;
  height: 35rem;
  object-fit: contain;
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

const UnModalBtn = styled.button`
  background-color: #B3B3B3;
  color: white;
  width: 12rem;
  height: 3rem;
  /* border: 0.1rem solid black; */
  border-radius: 0.5rem;
  font-size: 1.5rem;
  /* margin-left: 0.5rem; */
  margin-top: 1rem;
  margin-bottom: 1rem;
  &:hover{
    cursor: default;
  }
`