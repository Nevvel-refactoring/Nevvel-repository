import React from "react";
import { useState } from "react";
import styled from "styled-components";

type assetstoreProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AudUpload(props:assetstoreProps) {

  const [submitBtnTrigger, setSubmitBtnTrigger] = useState(0)

  const CloseAssetUpload = () => {
    props.setModalOpen(false)
  }
  
  const SubmitAsset = () => {
    // axios통신하기
  }

  const UnsubmitAsset = () => {
    alert("에셋을 등록해주세요.")
    setSubmitBtnTrigger(1)
  }


  return(
    <div>
      <p>사운드 에셋 업로드</p>
      {
        submitBtnTrigger === 0?
        <ModalSubmitBtn_Un onClick={UnsubmitAsset}>등록</ModalSubmitBtn_Un>:
        <ModalSubmitBtn onClick={SubmitAsset}>등록</ModalSubmitBtn>
      }
      <ModalCloseBtn onClick={CloseAssetUpload}>닫기</ModalCloseBtn>
    </div>
  )
}

export default AudUpload


const ModalCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`
const ModalSubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 12rem;
  height: 3rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
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
  /* border: 0.1rem solid black; */
  border-radius: 0.5rem;
  font-size: 1.5rem;
`