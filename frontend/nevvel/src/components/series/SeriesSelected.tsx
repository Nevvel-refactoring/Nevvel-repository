import React,{useState} from "react";
import { cover } from "series";
import styled from "styled-components";

type SeriesSelectedProps = {
  Info: cover;
};

function SeriesSelected({ Info }: SeriesSelectedProps) {
  const episodes = Info.episodes;
  const [selected, setSelected] =useState([])
  return (
    <div>
      {episodes.map((episode, index) => (
        <div key={index}>
          <Item isPurchased={episode.isPurchased} isRead={episode.isRead}>
            {episode.title}
          </Item>
        </div>
      ))}
    </div>
  );
}

const Item = styled.div<{ isPurchased: boolean; isRead: boolean }>`
  color: ${(props) =>
    props.isPurchased || props.isRead
      ? ({ theme }) => theme.color.text3
      : ({ theme }) => theme.color.text1};
  padding-top: 0.5rem;
`;

export default SeriesSelected;
