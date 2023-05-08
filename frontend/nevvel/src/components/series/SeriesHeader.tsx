import React, { useState } from 'react'
import styled from 'styled-components'
import { cover } from 'series'
import Image from "next/image";
import unupload from "../../../public/UnUploadImgBtn.png";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai'
import { mobile } from '@/src/util/Mixin';
import { useRouter } from 'next/router';
import { Modal } from '../common/Modal';
import SeriesSelected from './SeriesSelected';

type SeriesHeaderProps = {
    SeriesData: cover
}

function SeriesHeader({ SeriesData }: SeriesHeaderProps) {
    const router = useRouter();
    const Info = SeriesData
    const [modalOpen, setModalOpen] = useState(false);

    const clickHandler = (e: string) => {
        if (e === "first") {
            router.push({
                pathname: '/viewer/[id]',
                query: { id: 1 }
            })
        }
    }

    return (
        <HeaderContainer>
            <HeaderTitle>시리즈 상세보기 </HeaderTitle>
            <SeriesInfo>
                <SeriesCover >
                    <Image src={unupload} alt="thumbnail" width={150} height={150} />
                    <SeriesInfoContainer>
                        <SeriesText>
                            <AiOutlineEye />
                            {Info.views}</SeriesText>
                        <SeriesText>
                            <AiOutlineHeart />
                            {Info.likes}</SeriesText>
                    </SeriesInfoContainer>
                </SeriesCover>
                <SeriesEx>
                    <SeriesText className='title'>{Info.title}</SeriesText>
                    <SeriesText className='writter'>{Info.writter.nickname}</SeriesText>
                    <SeriesText className='description'>{Info.description}</SeriesText>
                    <SeriesText className='genre'>{Info.genre}</SeriesText>
                    <SeriesBtnContainer>
                        <SeriesBtn className='first' onClick={() => clickHandler("first")}>첫화보기</SeriesBtn>
                        <SeriesBtn className='choice'onClick={()=>setModalOpen(true)}>선택구매</SeriesBtn>
                    </SeriesBtnContainer>
                </SeriesEx>
            </SeriesInfo>
            {modalOpen &&
                <Modal
                    modal={modalOpen}
                    setModal={setModalOpen}
                    width="300"
                    height="600"
                    element={<SeriesSelected
                        Info={Info} />}
                />}
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`

const HeaderTitle = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.color.text3} ;
    padding-bottom: 2rem;
    padding-top: 2rem;
    font-weight: 700;
`
const SeriesInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-top: 1rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.text3} ;
    ${mobile}{
        flex-direction: column;
        align-items: center;
    }
    height: 30vh;
`
const SeriesEx = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    div{
        padding: 0.5rem;
    }
      ${mobile}{
        flex-direction: column;
        justify-content: center;
    }
`
const SeriesCover = styled.div`
    display: flex;
    width: 30%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const SeriesBtnContainer = styled.div`
    display: flex;
    align-items: center;
`
const SeriesBtn = styled.button`
    /* border: 1px solid ${({ theme }) => theme.color.text1}; */
    box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1}; ;
    width: 10rem;
    height: 2rem;
    border-radius: 10px;
    margin-left:0.5rem;
    &.first{
        background-color: ${({ theme }) => theme.color.text1};
        color:${({ theme }) => theme.color.text2};
    }
    &.choice {
        background-color: ${({ theme }) => theme.color.text2};
        color:${({ theme }) => theme.color.text1};
    }
`
const SeriesText = styled.div`
    margin-left:0.5rem;
    display: flex;
    text-align: center;
    align-items: center;
    &.title{
        font-weight: 600;
        font-size: 22px;
        color:${({ theme }) => theme.color.text1};
    }
    
    &.writter{
        font-weight: 500;
        font-size: 18px;
        color:${({ theme }) => theme.color.text1};
    }

    &.description {
        font-size: 12px;
        color:${({ theme }) => theme.color.text3};
        
    }

    &.genre { 
        box-shadow:0px 0px 2px ${({ theme }) => theme.color.text3};
        color:${({ theme }) => theme.color.text1};
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        margin-left:1rem;
        font-size: 12px;
        height: 1.5rem;
    }
`
const SeriesInfoContainer = styled.div`
    display: flex;
`

export default SeriesHeader
