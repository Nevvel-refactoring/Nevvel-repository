import React from 'react'
import styled from 'styled-components'

function index() {
  return (
    <SeriesWrapper>
      <HeadContainer>
      <SeriesTitle>시리즈</SeriesTitle>
      </HeadContainer>
      <MainContainer></MainContainer>
    </SeriesWrapper>
  )
}
const SeriesWrapper = styled.div`
  width: 100;
  height: 100vh;
`
const HeadContainer = styled.div`
  
`
const SeriesTitle = styled.div``

const MainContainer = styled.div`
  
`

export default index