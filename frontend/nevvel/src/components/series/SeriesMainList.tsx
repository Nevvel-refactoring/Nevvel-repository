import React from 'react'
import SeriesMainListItem from './SeriesMainListItem'
import { cover } from 'series'
import styled from 'styled-components'

type SeriesMainListProps = {
    Info:cover
}

function SeriesMainList({Info}:SeriesMainListProps) {
  return (
    <ListContainer>
        {Info.episodes.map((episode,index)=>(

      <SeriesMainListItem 
      key={index}
      episode={episode}
      />
        ))}
    </ListContainer>
  )
}

const ListContainer = styled.div`
    height: 100%;
`


export default SeriesMainList
