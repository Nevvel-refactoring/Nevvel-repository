import React, { useEffect, useState } from "react";
import SeriesMainListItem from "./SeriesMainListItem";
import { cover } from "series";
import styled from "styled-components";

type SeriesMainListProps = {
  Info: cover;
  isLatest: boolean;
};

function SeriesMainList({ Info, isLatest }: SeriesMainListProps) {
  const firstEpisodes = Info.episodes;
  const lastEpisodes = [...firstEpisodes].reverse();
  const [episodes, setEpisodes] = useState(lastEpisodes);
  // console.log(firstEpisodes);
  // console.log(lastEpisodes);
  useEffect(() => {
    if (isLatest) {
      setEpisodes(lastEpisodes);
    } else {
      setEpisodes(firstEpisodes);
    }
  }, [isLatest]);
  return (
    <ListContainer>
      {episodes.map((episode) => (
        <SeriesMainListItem
          key={episode.id}
          episode={episode}
          writer={Info.writer}
        />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  height: 100%;
`;

export default SeriesMainList;
