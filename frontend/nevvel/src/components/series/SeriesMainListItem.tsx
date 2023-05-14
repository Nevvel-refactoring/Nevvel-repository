import React, { useState } from "react";
import { episode } from "series";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AiOutlineEye } from "react-icons/ai";

type SeriesMainListItemProps = {
  episode: episode;
};

function SeriesMainListItem({ episode }: SeriesMainListItemProps) {
  const router = useRouter();
  const [purchased, setPurchased] = useState(episode.isPurchased);
  const [IsRead, setIsRead] = useState(episode.isRead);

  const clickHandler = () => {
    router.push({
      pathname: "/viewer/[id]",
      query: { id: episode.id },
    });
  };

  return (
    <ItemContainer onClick={clickHandler} IsRead={IsRead}>
      <div>{episode.title}</div>
      <ItemBottom>
        <Box>
          <AiOutlineEye />
          <BoxText>{episode.viewCount}</BoxText>
        </Box>
        <Box>
          {new Date(episode.uploadedDateTime)
            .toISOString()
            .replace("T", " ")
            .replaceAll("-", ".")
            .slice(2, -8)}
        </Box>
      </ItemBottom>
    </ItemContainer>
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
  border-bottom: 1px solid ${({ theme }) => theme.color.text3};
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
