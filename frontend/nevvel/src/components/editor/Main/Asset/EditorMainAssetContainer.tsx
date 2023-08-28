import React, { useState, useEffect } from "react";
import EditorMainAssetImageList from "./EditorMainAssetImageList";
import EditorMainAssetSoundList from "./EditorMainAssetSoundList";
import styled from "styled-components";
import { mobile } from "@/src/util/Mixin";
import { assetOpenAtom } from "@/src/store/EditorAssetStore";
import { useAtom, useAtomValue } from "jotai";
import { IoIosArrowBack } from "react-icons/io";
import { content } from "editor";
import EditorMainAssetTotalList from "./EditorMainAssetTotalList";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineSound } from "react-icons/ai";
import { MdStorefront } from "react-icons/md"
import springApi from "@/src/api/instance";
import { Asset } from "editor";


type EditorMainAssetContainerProps = {
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  contents: content[];
};

function EditorMainAssetContainer({
  setContents,
  contents,
}: EditorMainAssetContainerProps) {
  const [assetOpen, setAssetOpen] = useAtom(assetOpenAtom);
  const [assetStore, setAssetStore] = useState<Asset[]>([])
  const [assetType, setAssetType] = useState<"IMAGE"|"AUDIO">("IMAGE")
  useEffect(()=>{
    getAssetStoreData();
  },[])
  useEffect(()=>{
    getAssetStoreData();
  },[assetType])

  const getAssetStoreData = async () => {
    try{
      const res = await springApi.get(
        `assets?assettype=${assetType}&pageNum=1&searchtype=NOT_PURCHASED&sort=createdDateTime`
      );
      if (res) {
        // console.log(res);
        setAssetStore(res.data.content);
        setAxiosReloaer(false)
    }}catch(error){
      console.log(error)
    }
  };

  // axios reloaer
  const[axiosReloader, setAxiosReloaer] = useState<boolean>(false)

  useEffect(() => {
    if (axiosReloader === true){
      getAssetStoreData();
    }
  },[axiosReloader])



  return (
    <AssetContainer>
      <AssetSection>
        <AssetHeaderContainer>
          <AssetStoreTitle>에셋스토어</AssetStoreTitle>
          <CloseBtn onClick={() => setAssetOpen(0)}>
            <IoIosArrowBack />
          </CloseBtn>
        </AssetHeaderContainer>
        <AssetBottomContainer>
          <AssetStoreBtn className="image" assetOpen={assetOpen} onClick={() => setAssetOpen(1)}><BiImageAdd size={16}/></AssetStoreBtn>
          <AssetStoreBtn className="audio" assetOpen={assetOpen} onClick={() => setAssetOpen(2)}><AiOutlineSound size={16} /></AssetStoreBtn>
          <AssetStoreBtn className="store" assetOpen={assetOpen} onClick={() => setAssetOpen(3)} ><MdStorefront size={16} /></AssetStoreBtn>
        </AssetBottomContainer>
      </AssetSection>
      <AssetStoreContainer>
        {assetOpen === 1 && (
          <EditorMainAssetImageList
            contents={contents}
            setContents={setContents}
          />
        )}
      </AssetStoreContainer>
      <AssetStoreContainer>
        {assetOpen === 2 && (
          <EditorMainAssetSoundList
            contents={contents}
            setContents={setContents}
          />
        )}
      </AssetStoreContainer>
      <AssetStoreContainer>{assetOpen === 3 && <EditorMainAssetTotalList assetType={assetType} setAssetType={setAssetType} assetStore={assetStore} setAxiosReloaer={setAxiosReloaer} />}</AssetStoreContainer>
    </AssetContainer>
  );
}

const AssetContainer = styled.div`
  box-shadow: 0px 0px 2px gray;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.background};
  height: 100vh;
  width: 20vw;
  position: fixed;
  ${mobile} {
    top:70vh;
    position: relative;
    width: 100vw;
    height: 30vh;
  }
  z-index: 100;
`;
const AssetStoreTitle = styled.div`
  color: ${({ theme }) => theme.color.point};
`;
const AssetSection = styled.div`
  display: flex;
  flex-direction: column;
`

const AssetHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10vh;
  padding: 1rem;
`;

const AssetBottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around; 
  align-items: flex-end;

`;

const AssetStoreBtn = styled.div<{assetOpen:number}>`
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  border: 0.5px solid gray;
  border-bottom: none;
  color: ${({ theme }) => theme.color.text1};
  &.image{
    color:${(props)=>(props.assetOpen == 1 ? (({ theme }) => theme.color.point):(({ theme }) => theme.color.text1))};
    height:${(props)=>(props.assetOpen == 1? (2):(1.5))}rem;
    border-left:none;
  }
  &.audio{
    color:${(props)=>(props.assetOpen == 2 ? (({ theme }) => theme.color.point):(({ theme }) => theme.color.text1))};
    height:${(props)=>(props.assetOpen == 2? (2):(1.5))}rem;
    border-left:none;
  }
  &.store{
    color:${(props)=>(props.assetOpen == 3 ? (({ theme }) => theme.color.point):(({ theme }) => theme.color.text1))};
    height:${(props)=>(props.assetOpen == 3 ? (2):(1.5))}rem;
    border-right:none;
    border-left:none;
  }


`;
const CloseBtn = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const AssetStoreContainer = styled.div`
  padding-left: 1rem;
`
export default EditorMainAssetContainer;
