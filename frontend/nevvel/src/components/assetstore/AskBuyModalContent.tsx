import React from "react";
import styled from "styled-components";
import springApi from "@/src/api";


type ModalonModalProps = {
  setModalonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChanger: React.Dispatch<React.SetStateAction<boolean>>;
  setBuyBtnChanger : React.Dispatch<React.SetStateAction<boolean>>;
  AssetId : number
  setAxiosReloaer : React.Dispatch<React.SetStateAction<boolean>>;
}

function AskBuyModalContent({setModalonModalOpen, setModalChanger, AssetId, setBuyBtnChanger, setAxiosReloaer} : ModalonModalProps) {

  const BuyAsset = () => {
    // axios
    springApi.post(`/assets/purchasing/${AssetId}`)
      .then(res => {
        if (res.status === 201) {
          setModalChanger(true)
          setBuyBtnChanger(true)
          setAxiosReloaer(true)
        } else if (res.status === 200) {
          alert('포인트 잔액이 부족합니다')
          setModalonModalOpen(false)
        } else if (res.status === 204) {
          alert("이미 구매한 에셋입니다")
          setModalonModalOpen(false)
        } else {
          alert("오류가 발생하였습니다")
          setModalonModalOpen(false)
        }
      })
  }

  const CloseBuyModal = () => {
    setModalonModalOpen(false)
    setBuyBtnChanger(true)
  }

  return(
    <div>
      <ColDiv>
        <AskP>
          에셋을 구매하시겠습니까?
        </AskP>
        <RowDiv>
          {/* 제출버튼 */}
            <BuyBtn onClick={BuyAsset}>구매</BuyBtn>
          {/* 닫기버튼 */}
          <ModalCloseBtn onClick={CloseBuyModal}>닫기</ModalCloseBtn>
        </RowDiv>
      </ColDiv>
    </div>
  )
}

export default AskBuyModalContent


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
