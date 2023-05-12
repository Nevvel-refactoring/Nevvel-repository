import React from 'react'
import styled from 'styled-components'
import SeriesMainList from './SeriesMainList'
import { cover } from 'series'

type SeriesMainProps = {
  SeriesData:cover;
}

function SeriesMain({SeriesData}:SeriesMainProps) {
  const Info = SeriesData
  return (
    <MainContainer>
      <MainHeader>
        <BtnContainer>
          <SortBtn className='firstStory'>
            1화부터 
          </SortBtn>
          <SortBtn className='newStory'>
            최신부터
          </SortBtn>
        </BtnContainer>
        <div>{Info.episodes.length}개의 스토리</div>
      </MainHeader>
      <SeriesMainList Info={Info} />
    </MainContainer>
  )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15vh;
`
const MainHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme })=> theme.color.text1};
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 14px;
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const SortBtn = styled.button`
  &.firstStory{
    margin-right: 0.5rem;
  }
  &.newStory{
    border-left: 1px solid ${({ theme })=>theme.color.text1};
    padding-left: 0.5rem;
  }
`

export default SeriesMain;
