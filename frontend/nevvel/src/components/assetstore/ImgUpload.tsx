import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import TagSearchBar from "./TagSearchBar";


type assetstoreProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ImgUpload(props:assetstoreProps) {

  // 이미지 파일 업로딩
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
    // console.log(image)
  };


  useEffect(() => {
    console.log('이미지 들어옴', image)
    // console.log('ref',fileInputRef)
  },[image])

  // 이미지 파일 삭제
  const DeleteImg = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // console.log(image)
  }

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
    console.log(image, title, description, price, selectTag)
  }

  // 제출버튼 비활성화
  const UnsubmitAsset = () => {
    alert("에셋을 등록해주세요.")
    // setSubmitBtnTrigger(1)
  }


  return(
    <ColDiv>
      <p>이미지 에셋 업로드</p>
      {/* 이미지 파일 업로딩 */}
      <RowDiv>
        <ColDiv>
          <AssetInfoTextDiv>
            <p>이미지 파일</p>
          </AssetInfoTextDiv>
          <ImgUploadLabel>
            <ImgUploadInput
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {
              image?
              <ImgUploadBtn src={URL.createObjectURL(image)} alt="Selected image" />:
              <ImgUploadBtn src="/UnUploadImgBtn.png" alt="UnUploadImgBtn"/>
            }
          </ImgUploadLabel>
          {image && (
            <div>
              <ImageUploadTitle>{image.name}</ImageUploadTitle>
            </div>
          )}
          {/* 이미지 파일 삭제 버튼 */}
          {
            image?
            <ImgDelBtn onClick={DeleteImg}>X</ImgDelBtn>:
            null
          }
        </ColDiv>

        <ColDiv>
          <AssetInfoTextDiv>
            <p>제목</p>
          </AssetInfoTextDiv>
          <AssetInfoInput1
            placeholder="에셋 제목을 입력해주세요."
            onChange={onChangeTitle}
          />

          <AssetInfoTextDiv>
            <p>설명</p>
          </AssetInfoTextDiv>
          <AssetInfoInput2
            placeholder="에셋 설명을 입력해주세요."
            onChange={onChangeDescription}
          />

          <AssetInfoTextDiv>
            <p>가격</p>
          </AssetInfoTextDiv>
          <AssetInfoInput1
            placeholder="에셋 가격을 입력해주세요."
            onChange={onChangePrice}
          />

          <AssetInfoTextDiv>
            <p>태그</p>
          </AssetInfoTextDiv>
          <TagSearchBar
            selectTag={selectTag}
            AddTag={AddTag}
            TagInputWidth={"15rem"}
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
      </RowDiv>
      
      <RowDiv>
        {/* 제출버튼 */}
        {
          (image&&title&&description&&price&&selectTag[0])?
          <ModalSubmitBtn onClick={SubmitAsset}>등록</ModalSubmitBtn>:
          <ModalSubmitBtn_Un onClick={UnsubmitAsset}>등록</ModalSubmitBtn_Un>
        }
        {/* 닫기버튼 */}
        <ModalCloseBtn onClick={CloseAssetUpload}>닫기</ModalCloseBtn>
      </RowDiv>
    </ColDiv>
  )
}

export default ImgUpload

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4rem;
`
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImgUploadLabel = styled.label`
  width: 15rem;
  height: 15rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  /* border: 0.15rem solid #4D4D4D;
  border-radius: 1.5rem; */
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`

const ImgUploadInput = styled.input`
  display: none;
  /* float: left; */
`

const ImgUploadBtn = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: contain;
  border: 0.15rem solid #4D4D4D;
  border-radius: 1.5rem;
  /* float: left; */
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.5rem;
  }
`

const ImageUploadTitle = styled.p`
  width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const AssetInfoTextDiv =styled.div`
  width: 14rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: left;
  margin-top: 0.7rem;
  margin-bottom: 0.3rem;
`

const AssetInfoInput1 = styled.input`
  width: 15rem;
  height: 2.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.6rem;
`

const AssetInfoInput2 = styled.input`
  width: 15rem;
  height: 7.5rem;
  border: 0.15rem solid #4D4D4D;
  border-radius: 0.8rem;
`

const ImgDelBtn = styled.button`
  border: 0.1rem solid #4D4D4D;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  margin-top: 0.5rem;
  &:hover {
    box-shadow: 0.1rem 0.1rem 0.5rem;
  }
`

const TagRowDiv = styled.div`
  width: 15rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 0.5rem;
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