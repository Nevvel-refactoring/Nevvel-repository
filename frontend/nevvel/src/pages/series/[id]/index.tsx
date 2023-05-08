import React from 'react'
import styled from 'styled-components'
import SeriesHeader from '@/src/components/series/SeriesHeader'
import SeriesMain from '@/src/components/series/SeriesMain'
import SeriesData from '@/src/components/series/DummySeriesData.json';

function index() {
  return (
    <SeriesWrapper>
      <SeriesHeader
       SeriesData={SeriesData}
      />
      <SeriesMain
      SeriesData={SeriesData} />
    </SeriesWrapper>
  )
}
const SeriesWrapper = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  background-color: ${({ theme })=> theme.color.background};
  height: 100%;
`

export default index