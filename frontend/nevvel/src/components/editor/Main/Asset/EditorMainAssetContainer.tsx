import React from 'react'
import EditorMainAssetImageList from './EditorMainAssetImageList'
import EditorMainAssetSoundList from './EditorMainAssetSoundList'
import styled from 'styled-components'
import { mobile } from '@/src/util/Mixin'
import { assetOpenAtom} from "@/src/store/EditorAssetStore";
import { useAtom,useAtomValue } from 'jotai'
import {IoIosArrowBack} from 'react-icons/io'
import { content } from 'editor'

type EditorMainAssetContainerProps = {
  setContents: React.Dispatch<React.SetStateAction<content[]>>
  contents:content[]
}

function EditorMainAssetContainer( {setContents,contents}:EditorMainAssetContainerProps) {
  const [assetOpen, setAssetOpen] =useAtom(assetOpenAtom)



  return (<AssetContainer>
    <AssetHeaderContainer>
    <AssetStoreTitle>에셋스토어</AssetStoreTitle>
    <CloseBtn onClick={
      ()=>  setAssetOpen(0)
    }><IoIosArrowBack /></CloseBtn>
    </AssetHeaderContainer>
  <div>{assetOpen === 1 && <EditorMainAssetImageList contents={contents} setContents={setContents} />}</div>
  <div>{assetOpen === 2 && <EditorMainAssetSoundList contents={contents} setContents={setContents}/>}</div>
  </AssetContainer>
  )
}

const AssetContainer = styled.div`
  position: absolute;
  box-shadow: 0px 0px 2px gray;
  background-color: ${({ theme })=> theme.color.background};
  height: 100vh;
  width:20vw;
  padding: 1rem;
  ${mobile}{
    position: relative;
  }

`
const AssetStoreTitle = styled.div`
color: ${({ theme})=> theme.color.point};
  
`
const AssetHeaderContainer =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`
const CloseBtn = styled.div`
  color:${({theme})=>theme.color.text1};
`

export default EditorMainAssetContainer  