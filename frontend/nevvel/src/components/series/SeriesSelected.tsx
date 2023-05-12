import { mobile } from "@/src/util/Mixin";
import React, { useEffect, useState } from "react";
import { cover, shoppingList } from "series";
import styled from "styled-components";

type SeriesSelectedProps = {
  Info: cover;
};

function SeriesSelected({ Info }: SeriesSelectedProps) {
  const episodes = Info.episodes;
  const [shoppingList, SetShoppingList] = useState<shoppingList>({
    coverId: Info.coverId,
    episodes: [],
  });
  const [episodeList, setEpisodeList] = useState<number[]>([]);
  const checkHandler = (e: number) => {
    if (episodeList.some((el) => el == e)) {
      console.log();
      setEpisodeList(episodeList.filter((el) => el !== e));
    } else {
      setEpisodeList([...episodeList, e]);
    }
  };
  useEffect(() => {
    console.log(shoppingList);
  }, [shoppingList]);
  const buyHandler = async () => {
    SetShoppingList({ ...shoppingList, episodes: episodeList });
  };

  return (
    <Wrapper>
      <ListWrapper>
        {episodes.map((episode, index) => (
          <div key={index}>
            {episode.isPurchased || episode.isRead ? (
              <Container>
                <Item isPurchased={episode.isPurchased} isRead={episode.isRead}>
                  {episode.title}
                </Item>
              </Container>
            ) : (
              <ItemContainer
                active={
                  episodeList.some((el) => el == episode.id) ? true : false
                }
                onClick={() => checkHandler(episode.id)}
              >
                <Item isPurchased={episode.isPurchased} isRead={episode.isRead}>
                  {episode.title}
                </Item>
              </ItemContainer>
            )}
          </div>
        ))}
      </ListWrapper>
      <SeriesBtn onClick={buyHandler}>구매하기</SeriesBtn>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 10%;
  padding-bottom:10%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 50vh;
  align-items: center;
  ${mobile}{
    padding-top: 20%;
  padding-bottom:20%;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ItemContainer = styled.div<{ active: boolean }>`
  background: ${({ active, theme }) => {
    if (active) {
      return theme.color.hover;
    }
  }};
`;
const Container = styled.div`
  background-color: ${({ theme }) => theme.color.wrongButton};
`;

const Item = styled.div<{ isPurchased: boolean; isRead: boolean }>`
  color: ${(props) =>
    props.isPurchased || props.isRead
      ? ({ theme }) => theme.color.text3
      : ({ theme }) => theme.color.text1};
  padding-top: 0.5rem;
`;

const SeriesBtn = styled.button`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
  width: 10rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => theme.color.text1};
  color: ${({ theme }) => theme.color.text2};
`;

export default SeriesSelected;
