import React, { useState } from "react";
import styled from "styled-components";
import { useAtom, useAtomValue } from "jotai";
import { content } from "editor";
import {
  assetOpenAtom,
  nowTextBlockAtom,
  ImageAssetAtom,
  AudioAssetAtom,
} from "@/src/store/EditorAssetStore";
import { bigMobile } from "@/src/util/Mixin";

import { BiImageAdd } from "react-icons/bi";
import { AiOutlineSound } from "react-icons/ai";
import { useRouter } from "next/router";

type EditorMainAssetBtnProps = {
  content: content;
};

function EditorMainAssetBtn({ content }: EditorMainAssetBtnProps) {
  const [plus, setPlus] = useState(false);
  const [assetOpen, setAssetOpen] = useAtom(assetOpenAtom);
  // assetStore 열기/닫기
  const [nowTextBlock, setNowTextBlock] = useAtom(nowTextBlockAtom);
  // 현재 텍스트 블록 idx 값 감지 (asset용)
  const IMAGE = useAtomValue(ImageAssetAtom);
  const AUDIO = useAtomValue(AudioAssetAtom);
  const router = useRouter();
  const eid = router.query.eid;

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
  });

  return (
    <div>
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
    </div>
  );
}
const AssetButtonContainer = styled.div`
  width: 10rem;
  display: inline-flex;
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: center;
  ${bigMobile} {
    display: flex;
  }
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
const Img = styled.img`
  width: 3.5rem;
  height: 2.5rem;
  &.check {
    margin-left: 0.3rem;
  }
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

const Space = styled.div`
  width: 3.5rem;
  height: 2.5rem;
`;

export default EditorMainAssetBtn;
