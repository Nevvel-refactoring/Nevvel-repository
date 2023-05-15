import { mobile } from "@/src/util/Mixin";
import React, { useEffect, useState } from "react";
import { cover, shoppingList } from "series";
import styled from "styled-components";

type SeriesSelectedProps = {
  Info: cover;
};

function SeriesSelected({ Info }: SeriesSelectedProps) {
  const episodes = Info.episodes;
  const [checkAllEp, setCheckAllEp] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
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
    if (checkAllEp) {
      const newEpList: number[] = [];
      episodes.map((episode) => {
        if (!episode.isPurchased && episode.point !== 0) {
          newEpList.push(episode.id);
        }
      });
      console.log(newEpList);
      setEpisodeList(newEpList);
    } else {
      setEpisodeList([]);
    }
  }, [checkAllEp]);

  useEffect(() => {
    console.log(shoppingList);
  }, [shoppingList]);
  const buyHandler = async () => {
    SetShoppingList({ ...shoppingList, episodes: episodeList });
  };

  useEffect(() => {
    let pointCount = 0;
    episodes.map((episode) => {
      if (episodeList.includes(episode.id)) {
        pointCount += episode.point;
      }
    });
    setPoint(pointCount);
  }, [episodeList]);

  return (
    <Wrapper>
      <AllSelect>
        <p>총 {point}p</p>
        <span
          onClick={() => {
            setCheckAllEp(!checkAllEp);
          }}
        >
          전체 선택
        </span>
      </AllSelect>
      <ListWrapper>
        {episodes.map((episode) => (
          <div key={episode.id}>
            {episode.isPurchased || episode.point === 0 ? (
              <Container>
                <Item
                  isPurchased={episode.isPurchased}
                  isRead={episode.point === 0 ? true : false}
                >
                  <PurchaseTitle>{episode.title}</PurchaseTitle>
                  {episode.isPurchased && (
                    <PurchasePoint>구매 완료</PurchasePoint>
                  )}
                  {episode.point === 0 && <PurchasePoint>무료</PurchasePoint>}
                </Item>
              </Container>
            ) : (
              <ItemContainer
                active={
                  episodeList.some((el) => el == episode.id) ? true : false
                }
                onClick={() => checkHandler(episode.id)}
              >
                <Item
                  isPurchased={episode.isPurchased}
                  isRead={episode.point === 0 ? true : false}
                >
                  <PurchaseTitle>{episode.title}</PurchaseTitle>
                  {episode.isPurchased && (
                    <PurchasePoint>구매 완료</PurchasePoint>
                  )}
                  {!episode.isPurchased && (
                    <PurchasePoint>{episode.point}p</PurchasePoint>
                  )}
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

const AllSelect = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  > span {
    cursor: pointer;
    font-weight: 600;
    color: ${({ theme }) => theme.color.point};
  }
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 50vh;
  align-items: center;
  ${mobile} {
    padding-top: 10%;
    padding-bottom: 10%;
  }
`;
const ListWrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 330px;
`;

const ItemContainer = styled.div<{ active: boolean }>`
  background: ${({ active, theme }) => {
    if (active) {
      return theme.color.hover;
    }
  }};
  margin-top: 0.5rem;
  border: 1.5px solid;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
  }
  cursor: pointer;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.wrongButton};
  margin-top: 0.5rem;
  border: 1.5px solid;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.color.wrongButton};
`;

const Item = styled.div<{ isPurchased: boolean; isRead: boolean }>`
  color: ${(props) =>
    props.isPurchased || props.isRead
      ? ({ theme }) => theme.color.text3
      : ({ theme }) => theme.color.text1};
  padding: 0.5rem;
  width: 180px;
  display: flex;
  justify-content: space-between;
`;

const SeriesBtn = styled.button`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
  width: 10rem;
  height: 2rem;
  border-radius: 10px;
  margin: 0.5rem;
  background-color: ${({ theme }) => theme.color.text1};
  color: ${({ theme }) => theme.color.text2};
`;

const PurchaseTitle = styled.span`
  color: ${({ theme }) => theme.color.text1};
  align-self: flex-end;
  margin: 5px;
  font-size: 1rem;
  text-overflow: ellipsis;
`;

const PurchasePoint = styled.span`
  color: ${({ theme }) => theme.color.text1};
  font-size: 0.8rem;
  align-self: flex-end;
  margin: 5px;
`;

export default SeriesSelected;
