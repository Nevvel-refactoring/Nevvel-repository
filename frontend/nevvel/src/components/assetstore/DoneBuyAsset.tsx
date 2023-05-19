import React from "react";
import styled from "styled-components";


type ModalonModalProps = {
  setModalonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChanger: React.Dispatch<React.SetStateAction<boolean>>;
  modalStarter: boolean;
}

function DoneBuyAsset({setModalonModalOpen, setModalChanger, modalStarter} : ModalonModalProps) {


  const CloseBuyModal = () => {
    setModalonModalOpen(false)
    setModalChanger(false)
  }

  return(
    <div>
      <ColDiv>
        <AskP>
          에셋 구매가 완료되었습니다
        </AskP>
        {
          modalStarter?
          <RowDiv>
            {/* 제출버튼 */}
            <BuyBtn>구매한 에셋 보기</BuyBtn>
            {/* 닫기버튼 */}
            <ModalCloseBtn onClick={CloseBuyModal}>에셋 계속 보기</ModalCloseBtn>
          </RowDiv>
          :
          <RowDiv>
            {/* 닫기버튼 */}
            <ModalCloseBtn onClick={CloseBuyModal}>확인</ModalCloseBtn>
          </RowDiv>
        }
      </ColDiv>
    </div>
  )
}

export default DoneBuyAsset


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
