import springApi from "@/src/api";
import { mobile } from "@/src/util/Mixin";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cover, shoppingList } from "series";
import styled from "styled-components";
import { userInfoAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";

type SeriesSelectedProps = {
  Info: cover;
  isPurchased: number;
  setIsPurchase: Dispatch<SetStateAction<number>>;
};

function SeriesSelected({
  Info,
  setIsPurchase,
  isPurchased,
}: SeriesSelectedProps) {
  const episodes = Info.episodes;
  const [checkAllEp, setCheckAllEp] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  const [episodeList, setEpisodeList] = useState<number[]>([]);
  const userInfo = useAtomValue(userInfoAtom);
  const router = useRouter();

  const checkHandler = (e: number) => {
    if (episodeList.some((el) => el == e)) {
      setEpisodeList(episodeList.filter((el) => el !== e));
    } else {
      setEpisodeList([...episodeList, e]);
    }
  };

  const episodePurchase = async () => {
    try {
      const res = await springApi.post("episodes/purchasing", {
        coverId: Number(router.query.id),
        episodes: episodeList,
      });
      if (res.status === 201) {
        console.log(res);
        setTimeout(function () {
          setIsPurchase(isPurchased + 1);
          console.log("결제함");
        }, 1500);
      } else if (res.status === 200) {
        if (confirm("포인트가 부족합니다. 충전하러 가시겠습니까?")) {
          router.push("/myPage/purchase");
        }
      }
    } catch (error) {
      console.log(error);
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
      <SeriesBtn onClick={episodePurchase}>구매하기</SeriesBtn>
      <p>잔여 포인트 {userInfo?.point}p</p>
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
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 400px;
  align-items: center;
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
