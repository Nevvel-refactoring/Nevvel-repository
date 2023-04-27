import React from 'react'
import EditorMainAssetImageList from './EditorMainAssetImageList'
import EditorMainAssetSoundList from './EditorMainAssetSoundList'
import styled from 'styled-components'

type EditorMainAssetContainerProps  ={
  assetOpen:number
}

function EditorMainAssetContainer({assetOpen}:EditorMainAssetContainerProps) {
  
  return (<AssetContainer>
    <AssetStoreTitle>에셋</AssetStoreTitle>
  <div>{assetOpen === 1 && <EditorMainAssetImageList/>}</div>
  <div>{assetOpen === 2 && <EditorMainAssetSoundList/>}</div>
  </AssetContainer>
  )
}

const AssetContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.color.hover};

`
const AssetStoreTitle = styled.div`
height: 15%;
padding-left: 1rem;
padding-top:1rem;
  
`

export default EditorMainAssetContainer  