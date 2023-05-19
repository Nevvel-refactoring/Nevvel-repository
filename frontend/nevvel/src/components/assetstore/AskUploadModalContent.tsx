import React from "react";
import styled from "styled-components";


type ModalonModalProps = {
  setModalonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAxiosTrigger: React.Dispatch<React.SetStateAction<boolean|null>>;
  setFormDataClear: React.Dispatch<React.SetStateAction<boolean|null>>;
}

function AskUploadModalContent({setModalonModalOpen, setAxiosTrigger, setFormDataClear} : ModalonModalProps) {

  const UploadAsset = () => {
    setAxiosTrigger(true)
  }

  const CloseBuyModal = () => {
    setFormDataClear(true)
    setModalonModalOpen(false)
    // formdata 초기화 시그널 주기
  }

  return(
    <div>
      <ColDiv>
        <AskP>
          에셋을 업로드하시겠습니까?
        </AskP>
        <RowDiv>
          {/* 제출버튼 */}
            <BuyBtn onClick={UploadAsset}>업로드</BuyBtn>
          {/* 닫기버튼 */}
          <ModalCloseBtn onClick={CloseBuyModal}>취소</ModalCloseBtn>
        </RowDiv>
      </ColDiv>
    </div>
  )
}

export default AskUploadModalContent


const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4rem;
`

const AskP = styled.p`
  font-size: 2rem;
  margin-top: 3.5rem;
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

const BuyBtn = styled.button`
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
