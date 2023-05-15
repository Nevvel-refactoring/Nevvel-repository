import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import TagSearchBar from "./TagSearchBar";

import { ModalonModal } from "../common/ModalonModal";
import AskUploadModalContent from "./AskUploadModalContent";

import springApi from "@/src/api";


type assetstoreProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// type TagType = {
//   tagName: string,
// }

type ImgType = {
  type: string,
  title: string,
  description: string,
  point: number,
  tags: string[],
}


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

  // 이미지 들어오는지 테스트
  // useEffect(() => {
  //   console.log('이미지 들어옴', image)
  //   // console.log('ref',fileInputRef)
  // },[image])


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


  // 전체 JsonData
  const [jsonDatas, setJasonDatas] = useState<ImgType>({
    type: "",
    title: "",
    description: "",
    point: 0,
    tags: [""],
  })

  
  // 제출버튼
  
  // // 제출버튼으로 모달 위의 모달 열기
  const [modalonModalOpen, setModalonModalOpen] = useState<boolean>(false)

  // formData 정의
  // const [formData, setFormData] = useState(new FormData());
  
  const SubmitAsset = async () => {
    const formData = new FormData()
    try{
      // 들어오는지 테스트
      console.log(image, title, description, price, selectTag)

      // 태그 리스트 객체화
      // const tagOjectList = selectTag.map((tag) => ({ tagName : tag }))
      
      // jsonDatas에 json 집어넣기
      setJasonDatas({
        type: "IMAGE",
        title: title,
        description: description,
        point: price,
        tags: selectTag,
      })
      
      // 제출버튼 누르면 formdata에 데이터 집어넣기
      if (image) {
        formData.append('file', image)
      }
      formData.append('assetRegistDto', JSON.stringify(jsonDatas))
      // formData.append('assetRegistDto', new Blob([JSON.stringify(jsonDatas)], {type: "application/json"}))
      
      // 데이터 집어넣어진 다음 모달 열기
      setModalonModalOpen(true)

      // console.log(formData)

      // console.log('엑시오스 아직 비활성화', axiosTrigger)

      springApi.post("/assets", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log("에러남 error")
      })
      
    }
    catch (error) {
      alert('업로드 과정에서 문제가 발생하였습니다.')
    }
  }

  useEffect(()=>{
    console.log(jsonDatas)
  
  },[jsonDatas])

  
  // 모달에서 제출 버튼 누르면 시그널 받아서 axios
  const [axiosTrigger, setAxiosTrigger] = useState<boolean|null>(null)

  // useEffect(() => {
  //   if (axiosTrigger) {
  //     console.log('엑시오스 활성화',axiosTrigger)
  //     springApi.post("/assets", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }).then(res => {
  //       console.log(res)
  //     }).catch(err => {
  //       console.log("에러남 error")
  //     })
  //     setAxiosTrigger(null)
  //   }
  // },[axiosTrigger])

  // 모달에서 취소버튼 누르면 모달 닫으면서 formdata 초기화
  const [formDataClear, setFormDataClear] = useState<boolean|null>(null)

  useEffect(() => {
    setJasonDatas({
      type: "",
      title: "",
      description: "",
      point: 0,
      tags: [""],
    })
    setFormDataClear(null)
  },[formDataClear])

  // 제출버튼 비활성화
  const UnsubmitAsset = () => {
    alert("에셋 정보를 모두 입력해주세요.")
    
    // 테스트 끝나면 이거 지우기
    // console.log(formData)
    setModalonModalOpen(true)
  }
  
  
    // 닫기 버튼
    const CloseAssetUpload = () => {
      props.setModalOpen(false)
    }
  
  // const OpenModalonModal = () => {
    //   setModalonModalOpen(true)
    // }
    
    
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
              accept=".jpg, .jpeg, .png, .gif"
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

      {/* 여기부터 모달온 모달 */}
      {modalonModalOpen ? (
        <ModalonModal
          modal={modalonModalOpen}
          width="500"
          height="300"
          element={
            <AskUploadModalContent
              setModalonModalOpen={setModalonModalOpen}
              setAxiosTrigger={setAxiosTrigger}
              setFormDataClear={setFormDataClear}
            />
          }
          setModalonModalOpen={setModalonModalOpen}
        />
      ) : null}
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