import React, { useState } from "react";
import { episode } from "series";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AiOutlineEye } from "react-icons/ai";
import SeriesEpOnePurchase from "./SeriesEpOnePurchase";
import { Modal } from "../common/Modal";

type SeriesMainListItemProps = {
  episode: episode;
};

function SeriesMainListItem({ episode }: SeriesMainListItemProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [purchased, setPurchased] = useState(episode.isPurchased);
  const [IsRead, setIsRead] = useState(episode.isRead);

  const clickHandler = () => {
    if (!episode.isPurchased && episode.point !== 0) {
      setModalOpen(true);
    } else {
      router.push({
        pathname: "/viewer/[id]",
        query: { id: episode.id },
      });
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="500"
          height="100"
          element={<SeriesEpOnePurchase Info={episode} />}
        />
      )}
      <ItemContainer onClick={clickHandler} IsRead={IsRead}>
        <div>{episode.title}</div>
        <ItemBottom>
          {episode.point > 0 && !purchased && (
            <Box>
              <BoxText>{episode.point}p</BoxText>
            </Box>
          )}
          {episode.point > 0 && purchased && (
            <Box>
              <BoxText>구매 완료</BoxText>
            </Box>
          )}
          <Box>
            <AiOutlineEye />
            <BoxText>{episode.viewCount}</BoxText>
          </Box>
          <Box>
            {episode.uploadedDateTime &&
              new Date(episode.uploadedDateTime)
                .toISOString()
                .replace("T", " ")
                .replaceAll("-", ".")
                .slice(2, -8)}
            {!episode.uploadedDateTime && <span>임시저장 글</span>}
          </Box>
        </ItemBottom>
      </ItemContainer>
    </>
  );
}

const ItemContainer = styled.div<{ IsRead: boolean }>`
  color: ${(props) =>
    props.IsRead
      ? ({ theme }) => theme.color.text3
      : ({ theme }) => theme.color.text1};
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 1rem;
  /* padding-bottom: 0.5rem; */
  border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
`;
const ItemBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: end;
  align-items: flex-end;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: small;
  opacity: 60%;
`;
const BoxText = styled.div`
  margin-left: 0.3rem;
`;

export default SeriesMainListItem;
