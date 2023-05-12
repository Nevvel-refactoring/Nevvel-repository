import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import TagSearchBar from "./TagSearchBar";


type assetstoreProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AudUpload(props:assetstoreProps) {

  // ---------------------------------------------------------
  // // 사운드 파일 업로딩
  const [audio, setAudio] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setAudio(files[0]);
    }
  };


  // useEffect(() => {
  //   console.log('이미지 들어옴', image)
  //   // console.log('ref',fileInputRef)
  // },[image])

  // // 사운드 파일 삭제
  const DeleteAud = () => {
    setAudio(null)
    if (audioRef.current) {
      audioRef.current.src = '';
    }
    // console.log(image)
  }
  // ----------------------------------------------------------

  // 제목 저장
  const [title, setTitle] = useState<string>("")

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trim())
  }

  // 설명 저장
  const [description, setdecription] = useState<string>("")

  const onChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {
    setdecription(e.currentTarget.value.trim())
  }

  // 가격저장
  const [price, setPrice] = useState<number>(0)

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pricevalue = parseInt(e.target.value);
    setPrice(isNaN(pricevalue) ? 0 : pricevalue);
  }


  // 태그 저장
  const [selectTag, setSelectTag] = useState<string[]>([])

  const AddTag = (newSelectTag:string) => {
    setSelectTag([...selectTag, newSelectTag])
  }

  // 태그 삭제
  const DelTag = (index : number) => {
    setSelectTag(selectTag.filter((_, i) => i !== index))
  }


  // 제출버튼 트리거
  const [submitBtnTrigger, setSubmitBtnTrigger] = useState(0)

  // 닫기 버튼
  const CloseAssetUpload = () => {
    props.setModalOpen(false)
  }

  // 제출버튼
  const SubmitAsset = () => {
    // axios통신하기
    console.log(audio, title, description, price, selectTag)
  }

  // 제출버튼 비활성화
  const UnsubmitAsset = () => {
    alert("에셋을 등록해주세요.")
    // setSubmitBtnTrigger(1)
  }


  return(
    <ColDiv>
      <p>사운드 에셋 업로드</p>
      {/* 사운드 파일 업로딩 */}
      <RowDiv>

        {/* ------------------------------------------------------------------ */}
        {/* <ColDiv>
        </ColDiv> */}
        {/* ----------------------------------------------------------------- */}

        <ColDiv>
          <RowDiv>
            <AssetInfoTextDiv2>
              <p>음원 파일</p>
            </AssetInfoTextDiv2>
            <AudUploadBtnDiv>
              {
                audio?
                <AudUploadBtn onClick={DeleteAud}>삭제</AudUploadBtn>
                :
                null
                // <AudUploadLabelBtn>
                //   <AudUploadBtn>
                //     <AudUploadBtnP>업로드</AudUploadBtnP>
                //     <AudUploadInputBtn
                //       type="file"
                //       accept="audio/*"
                //       onChange={handleAudioChange}
                //     />
                //   </AudUploadBtn>
                // </AudUploadLabelBtn>
              }
            </AudUploadBtnDiv>
          </RowDiv>
          <AudUploadLabel>
          <AudUploadInput
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
          />
          {
            audio?
            <AudioUploaded src={URL.createObjectURL(audio)} ref={audioRef} controls />
            // <p>Selected audio: {audio.name}</p>
            :
            <AudUnloadDiv>
              <p>이곳을 클릭해서 음원파일을 업로드 해주세요 (20MB 이하)</p>
            </AudUnloadDiv>
          }
          </AudUploadLabel>
          <AssetInfoTextDiv1>
            <p>제목</p>
          </AssetInfoTextDiv1>
          <AssetInfoInput1
            placeholder="에셋 제목을 입력해주세요."
            onChange={onChangeTitle}
          />

          <AssetInfoTextDiv1>
            <p>설명</p>
          </AssetInfoTextDiv1>
          <AssetInfoInput2
            placeholder="에셋 설명을 입력해주세요."
            onChange={onChangeDescription}
          />

          <RowDivPriceTag>
            <ColDiv>
              <AssetInfoTextDiv2>
                <p>가격</p>
              </AssetInfoTextDiv2>
              <AssetInfoInput3
                placeholder="에셋 가격을 입력해주세요."
                onChange={onChangePrice}
              />
            </ColDiv>
            <ColDiv>
              <AssetInfoTextDiv2>
                <p>&nbsp;&nbsp;태그</p>
              </AssetInfoTextDiv2>
              <TagSearchBar
                selectTag={selectTag}
                AddTag={AddTag}
                TagInputWidth={"14rem"}
              />
              <TagRowDiv>
                {
                  selectTag.map((tags, index) => (
                    <CardInfo2Div onClick={() => DelTag(index)}>
                      <p>{tags}</p>
                    </CardInfo2Div>
                  ))
                }
              </TagRowDiv>
            </ColDiv>
          </RowDivPriceTag>
        </ColDiv>
      </RowDiv>
      
      <RowDiv>
        {/* 제출버튼 */}
        {
          (audio&&title&&description&&price&&selectTag[0])?
          <ModalSubmitBtn onClick={SubmitAsset}>등록</ModalSubmitBtn>:
          <ModalSubmitBtn_Un onClick={UnsubmitAsset}>등록</ModalSubmitBtn_Un>
        }
        {/* 닫기버튼 */}
        <ModalCloseBtn onClick={CloseAssetUpload}>닫기</ModalCloseBtn>
      </RowDiv>
    </ColDiv>
  )
}

export default AudUpload

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1rem;
`

const RowDivPriceTag = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: left;
`

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AudUploadLabel = styled.label`
  width: 30rem;
  height: 4rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
  border: 0.15rem dotted #4D4D4D;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    cursor: pointer;
  }
`

const AudioUploaded = styled.audio`
  width: 30rem;
`

const AudUploadLabelBtn = styled.label`
  width: 6rem;
  height: 2.5rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  /* border: 0.15rem dotted #4D4D4D; */
  /* border-radius: 1.5rem; */
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`

const AudUploadInput = styled.input`
  display: none;
`
const AudUploadInputBtn = styled.input`
  width: 6rem;
  height: 2.5rem;
  visibility: hidden;
  position: relative;
`
const AudUploadBtnP = styled.p`
  position: absolute;
  padding-left : 1.2rem;
  padding-top: 0.4rem;
`

const AudUnloadDiv = styled.div`
  width: 28rem;
  height: 3rem;
  /* border: 0.2rem dotted #4D4D4D; */
  border-radius: 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AudUploadBtnDiv = styled.div`
  width: 6rem;
  margin-left: 9rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AudUploadBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 6rem;
  height: 2.5rem;
  border: 0.1rem solid #4D4D4D;
  border-radius: 0.5rem;
  font-size: 1.2rem;
`

const AssetInfoTextDiv1 =styled.div`
  width: 30rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: left;
  margin-top: 1.2rem;
  margin-bottom: 0.3rem;
`
const AssetInfoTextDiv2 = styled.div`
  width: 14rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: left;
  margin-top: 1.2rem;
  margin-bottom: 0.3rem;
  margin-right: 0.5rem;
`

const AssetInfoInput1 = styled.input`
  width: 30rem;
  height: 2.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
`

const AssetInfoInput2 = styled.input`
  width: 30rem;
  height: 5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.8rem;
`

const AssetInfoInput3 = styled.input`
  width: 14rem;
  height: 2.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
  margin-right: 1.5rem;
`


const TagRowDiv = styled.div`
  width: 14rem;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 0.5rem;
  white-space: nowrap;
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

const ModalCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`
const ModalSubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-right: 0.5rem;
  &:hover{
    background-color: #8385FF;
    border: 0.1rem solid #8385FF;
  }
`
const ModalSubmitBtn_Un = styled.button`
  background-color: #B3B3B3;
  color: #ffffff;
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-right: 0.5rem
`