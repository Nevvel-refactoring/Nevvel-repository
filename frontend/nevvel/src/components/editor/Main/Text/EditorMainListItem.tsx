import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { AiOutlineSound } from "react-icons/ai";
import EditorMainMenu from "./EditorMainMenu";
import { mobile } from "@/src/util/Mixin";
import { content } from "editor";
import { atom, useAtom, useAtomValue } from "jotai";
import { assetOpenAtom, nowTextBlockAtom } from "@/src/store/EditorAssetStore";
import { ImageAssetAtom } from "@/src/store/EditorAssetStore";
import { AudioAssetAtom } from "@/src/store/EditorAssetStore";
import { useRouter } from "next/router";

type EditorMainListItemProps = {
  content: content;
  contents: content[];
  setContents: React.Dispatch<React.SetStateAction<content[]>>;
  deleted:boolean;
  setDeleted:React.Dispatch<React.SetStateAction<boolean>>;
};

function EditorMainListItem({
  content,
  contents,
  setContents,
  deleted,
  setDeleted
}: EditorMainListItemProps) {
  const [plus, setPlus] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [text, setText] = useState(content.context);
  const [menuBlock, setMenuBlock] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [style, setStyle] = useState(false);
  const [assetOpen, setAssetOpen] = useAtom(assetOpenAtom);
  const [nowTextBlock, setNowTextBlock] = useAtom(nowTextBlockAtom);
  // const [reLocation, setRelocation] = useState<content[]>([]);
  // const [remove, setRemove] = useState(false);
  // const [deleted, setDeleted] = useState(false)
  const idx = content.idx;
  const IMAGE = useAtomValue(ImageAssetAtom);
  const AUDIO = useAtomValue(AudioAssetAtom);
  const router = useRouter();
  const eid = router.query.eid;
  // const relocation:content[] = []

  useEffect(() => {
    // console.log(text);
    // 텍스트에 style 적용한 경우
  }, [style]);

  // useEffect(() => {
  //   console.log(IMAGE, "최초값");
  //   console.log(AUDIO, "최초값");
  // }, []);

  // useEffect(() => {
  //   console.log(IMAGE, "에셋 버튼 클릭 후");
  //   console.log(AUDIO, "에셋 버튼 클릭 후");
  // }, [IMAGE, AUDIO]);

  // useEffect(() => {
  //   // if (reLocation.length == contents.length) {
  //   //   setContents(reLocation);
  //   // }
  //   console.log("reLocation", reLocation);
  // }, [reLocation]);

  // useEffect(() => {
  //   return () => {

  //     if (contents[contents.length - 1].idx != contents.length) {
  //       contents.map((content, index) => {
  //         console.log()
  //         reLocation.push({
  //           idx: index + 1,
  //           context: content.context,
  //           event: content.event,
  //         });
  //       });
  //     }
      // setRemove(true);
      // console.log(reLocation.length, "삭제 후 reLocation.length")
      // console.log(contents.length,"contents.length")
      // setContents(reLocation);
  //   };
  // }, [deleted]);

  // useEffect(()=>{
  //   console.log(reLocation, "삭제 후 reLocation");
  // },[reLocation])

  
  // useEffect(() => {
  //   if (remove) {
  //     console.log("true");
  //     setContents(reLocation);
  //   }
  //   return () => {
  //     setRemove(false);
  //     setRelocation([]);
  //     console.log(contents)
  //   };
  // }, [remove]);

  // useEffect(()=>{
  //   if(contents.length-1 == reLocation.length){
  //     setContents(reLocation)
  //   }
  //   return(()=>{
  //     setRelocation([])
  //   })
  // },[reLocation])
  // useEffect(() => {
  //   return () => {
  //     console.log(contents);
  //   };
  // }, [contents]);

  // block삭제
  const RemoveHandler = (content: content) => {
    setContents(contents.filter((el) => el.idx !== idx));
    setDeleted(true)
    // 삭제 후 idx 재 배치 해줘야 하기 때문에..
    // contents.map((content, index) => {
    //   setRelocation([
    //     ...reLocation,
    //     {
    //       idx: index + 1,
    //       context: content.context,
    //       event: content.event,
    //     },
    //   ]);
    // });
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    if (isComposing) {
      return;
    }
    const newBlocks = [...contents];
    const index = newBlocks.findIndex((el) => el.idx === content.idx);
    newBlocks[index].context = event.currentTarget.textContent ?? "";
    setContents(newBlocks);

    if (textRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setText(event.currentTarget.innerHTML);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event: React.FormEvent<HTMLDivElement>) => {
    setIsComposing(false);
    handleChange(event);
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setTooltipPos({ x: event.clientX, y: event.clientY });
    setMenuBlock(true);
  };

  const AssetHandler = (e: number) => {
    if (e === 1) {
      setAssetOpen(1);
      setNowTextBlock(content.idx);
    } else {
      setAssetOpen(2);
      setNowTextBlock(content.idx);
    }
  };

  const ImageEvent = content.event.map((asset, index) => {
    if (content.event.length == 1 && index == 0 && asset.type === "IMAGE") {
      const assetImageFindIndex = IMAGE.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <AssetContainer key={index}>
          <Img src={IMAGE[assetImageFindIndex]?.thumbnail} alt="썸네일" />
          <AssetButton onClick={() => AssetHandler(2)}>
            <AiOutlineSound className="sound" size="24" />
          </AssetButton>
        </AssetContainer>
      );
    } else if (
      content.event.length == 1 &&
      index == 0 &&
      asset.type === "AUDIO"
    ) {
      const assetAudioFindIndex = AUDIO.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <AssetContainer key={index}>
          <AssetButton onClick={() => AssetHandler(1)}>
            <BiImageAdd className="image" size="24" />
          </AssetButton>
          <Img src={AUDIO[assetAudioFindIndex]?.thumbnail} alt="썸네일" />
        </AssetContainer>
      );
    } else {
      const assetImageFindIndex = IMAGE.findIndex(
        (el) => el.id == asset.assetId
      );
      const assetAudioFindIndex = AUDIO.findIndex(
        (el) => el.id == asset.assetId
      );
      return (
        <div key={index}>
          {asset.type === "IMAGE" && (
            <Img
              className="check"
              src={IMAGE[assetImageFindIndex]?.thumbnail}
              alt="썸네일"
            />
          )}
          {asset.type === "AUDIO" && (
            <Img
              className="check"
              src={AUDIO[assetAudioFindIndex]?.thumbnail}
              alt="썸네일"
            />
          )}
        </div>
      );
    }

    // if (index == 0 && asset.type === "IMAGE" || index == 1 && asset.type === "IMAGE") {
    //   return (<>{asset.assetId}</>)
    // } else {
    //   return (<AssetButton onClick={() => AssetHandler(1)}>
    //               <BiImageAdd className="image" size="24" />
    //             </AssetButton>)
    // }
  });

  return (
    <div onMouseLeave={() => setMenuBlock(false)}>
      {menuBlock ? (
        <EditorMainMenu
          x={tooltipPos.x}
          y={tooltipPos.y}
          setText={setText}
          style={style}
          setStyle={setStyle}
        />
      ) : null}
      <BlockContainer>
        {plus ? (
          <>
            <AssetButtonContainer>
              {content.event.length == 0 ? (
                <>
                  <AssetButton onClick={() => AssetHandler(1)}>
                    <BiImageAdd className="image" size="24" />
                  </AssetButton>
                  <AssetButton onClick={() => AssetHandler(2)}>
                    <AiOutlineSound className="sound" size="24" />
                  </AssetButton>
                  <PlusButton onClick={() => setPlus(!plus)}>-</PlusButton>
                </>
              ) : (
                <>{eid ? null : ImageEvent}</>
              )}
            </AssetButtonContainer>
          </>
        ) : (
          <>
            <AssetButtonContainer>
              <Space>&nbsp;</Space>
              <Space>&nbsp;</Space>
              <PlusButton onClick={() => setPlus(!plus)}>+</PlusButton>
            </AssetButtonContainer>
          </>
        )}
        <TextBlock
          key={content.idx}
          contentEditable="true"
          suppressContentEditableWarning
          onInput={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={textRef}
          dangerouslySetInnerHTML={{ __html: content.context }}
          onContextMenu={handleContextMenu}
        />
        <RemoveButton onClick={() => RemoveHandler(content)}>
          <TiDelete size="24" />
        </RemoveButton>
      </BlockContainer>
    </div>
  );
}

const BlockContainer = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;
const AssetButtonContainer = styled.div`
  width: 10rem;
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
`;

const AssetContainer = styled.div`
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
`;

const AssetButton = styled.button`
  width: 3.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 0.3rem;
  border: 2px solid ${({ theme }) => theme.color.hover};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
    border: 2px solid ${({ theme }) => theme.color.point};
  }
`;
const Space = styled.div`
  width: 3.5rem;
  height: 2.5rem;
`;

const PlusButton = styled.button`
  width: 2rem;
  color: ${({ theme }) => theme.color.point};
  font-size: 2rem;
  margin-left: 1rem;
  display: flex;
  text-align: center;
  align-items: center;
`;

const TextBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.editor};
  padding: 1rem;
  height: auto;

  display: flex;
  align-items: center;
  white-space: normal;
`;

const RemoveButton = styled.button`
  display: flex;
  width: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.hover};
  :hover {
    ${({ theme }) => theme.color.point};
  }
`;

const Img = styled.img`
  width: 3.5rem;
  height: 2.5rem;
  &.check {
    margin-left: 0.3rem;
  }
`;

export default EditorMainListItem;
