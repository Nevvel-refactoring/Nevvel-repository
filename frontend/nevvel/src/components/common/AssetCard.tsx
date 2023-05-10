import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "@/src/components/common/Modal";


interface AssetTag {
  id : number,
  name : string,
}

interface AssetUploader {
  id: number,
  nickname: string,
  profileImage: string
}

interface AssetData{
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

interface Asset {
  // key: number
  id: number,
  title: string,
  type: string,
  thumbnail : string,
  url: string,
  tags: Array<AssetTag>,

  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalData: React.Dispatch<React.SetStateAction<AssetData>>;
  // price: number,
  // uploader: AssetUploader
  AssetData: AssetData
}

function AssetCard({
  // key,
  id,
  title,
  type,
  thumbnail,
  url,
  tags,

  setModalOpen,
  setOpenModalData,
  // price,
  // uploader,
  AssetData,
} : Asset) {

  const audioRef = useRef<any>(null)

  // hover 트리거
  const [hoverTrigger, setHoverTrigger] = useState(0)

  // 이미지 gif on/off 함수
  const ImgTriggerOn = () => {
    setHoverTrigger(1)
  }
  const ImgTriggerOff = () => {
    setHoverTrigger(0)
  }

  // 음성 on/off 함수
  const AudTriggerOn = () => {
    setHoverTrigger(1)
    audioRef.current.play()    
  }
  const AudTriggerOff = () => {
    setHoverTrigger(0)
    audioRef.current.pause() 
  }

  // 에셋 디테일 모달 오픈 트리거
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일 모달 오픈
  const AssetDetail = () => {
    setModalOpen(true);
    setOpenModalData(AssetData)
  };

  return(
    <div>
      <Wrapper onClick={AssetDetail}>
        <CardImgDiv>
          {/* 오디오 재생 ref */}
          <audio ref={audioRef} src={`${url}`} />

          {/* 이중 삼항연산자 */}
          {/* type이 AUDIO면 오디오 트리거 */}
          {
            type === "AUDIO"?
            (
              hoverTrigger === 0?
              // hovertrigger에 따라 트리거가 오디오 on/off
              <CardImg1 src="https://cdn4.iconfinder.com/data/icons/proglyphs-multimedia/512/Volume_Off-512.png" alt="썸네일" onMouseOver={AudTriggerOn} />
              :
              <CardImg1 src={thumbnail} alt="썸네일" onMouseLeave={AudTriggerOff} />
            )
            :
            // type이 AUDIO가 아니면 (IMAGE), 이미지 트리거
            (
              hoverTrigger === 0?
              // hovertrigger에 따라 트리거가 이미지 스위치(썸네일 <-> 원본)
              <CardImg1 src={thumbnail} alt="썸네일" onMouseOver={ImgTriggerOn} />:
              <CardImg1 src={url} alt="썸네일" onMouseLeave={ImgTriggerOff} />
            )
          }
        </CardImgDiv>
        <CardInfo1>{title}</CardInfo1>
          {/* 태그 객체 리스트 1,2,3번째까지만 매핑 */}
          <RowDiv>
            {
              tags.slice(0,3).map((tag) => {
                return (
                  <CardInfo2Div key={tag.id}>
                    <CardInfo2>#{tag.name}</CardInfo2>
                  </CardInfo2Div>
                )
              })
            }
            {/* {tags[0].name} */}
          </RowDiv>
      </Wrapper>
      {/* 여기부터 모달 */}
      {/* {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="700"
          element={
            <p>{title}</p>
          }
        />
      ) : null} */}
    </div>
  )
}

export default AssetCard


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  /* flex-direction: column; */
  width: 13rem;
  height: 20rem;
  margin-top: 1%;
  margin-bottom: 5%;
  margin-right: 1%;
  margin-left: 1%;
  border-radius: 1rem;
  /* background-color: #C1C2FF; */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const CardImgDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
`

const CardImg1 = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 5%;
`
// const CardImg2 = styled.img`
//   width: auto;
//   height: 30vh;
//   border-radius: 5%;
// `
const CardInfo1 = styled.p`
  color: ${({ theme }) => theme.color.text1};
  width: 100%;
  height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5%;
  font-size: 150%;
  text-align: center;
  /* margin-left: 2.5%; */
  /* margin-right: 2.5%; */
`

const CardInfo2 = styled.p`
  color: ${({ theme }) => theme.color.text1};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5%;
  font-size: 100%;
  display: flex;
  justify-content: left;
  /* margin-left: 10%; */
`

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
`

const RowDiv = styled.div`
  display: flex;
`