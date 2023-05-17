import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { cover } from "series";
import Image from "next/image";
import unupload from "../../../public/UnUploadImgBtn.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { mobile, tabletH } from "@/src/util/Mixin";
import { useRouter } from "next/router";
import { Modal } from "../common/Modal";
import SeriesSelected from "./SeriesSelected";
import springApi from "@/src/api";
import { userInfoAtom, loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";

type SeriesHeaderProps = {
  SeriesData: cover;
  coverId: string | string[] | undefined;
  isPurchased: number;
  setIsPurchase: Dispatch<SetStateAction<number>>;
};

function SeriesHeader({
  SeriesData,
  coverId,
  setIsPurchase,
  isPurchased,
}: SeriesHeaderProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const readId = SeriesData.lastReadEpisodeId;
  const thumnail = SeriesData.thumbnail;
  const userInfo = useAtomValue(userInfoAtom);
  const loginStatus = useAtomValue(loginAtom);

  // cover 좋아요하기
  const postSeriesLike = async (Id: number) => {
    if (loginStatus) {
      const res = await springApi.post(`/covers/likes/${Id}`);
      if (res) {
        console.log(res);
        setIsPurchase(isPurchased + 1);
      }
    } else {
      alert("로그인 하세요");
    }
  };

  const clickHandler = (e: string) => {
    if (loginStatus) {
      if (e === "first") {
        router.push({
          pathname: "/viewer/[id]",
          query: { id: SeriesData.episodes[0].id },
        });
      } else if (e === "continue") {
        router.push({
          pathname: "/viewer/[id]",
          query: { id: readId },
        });
      }
    } else {
      alert("로그인 하세요");
    }
  };

  return (
    <HeaderContainer>
      <HeaderTitle>시리즈 상세보기 </HeaderTitle>
      <SeriesInfo>
        <SeriesCover>
          <Image
            src={thumnail ? thumnail : unupload}
            alt="thumbnail"
            width={148}
            height={222}
            draggable="false"
          />
          <SeriesInfoContainer>
            <SeriesText>
              <AiOutlineEye />
              {SeriesData.viewCount}
            </SeriesText>
            <SeriesText>
              <AiOutlineHeart />
              {SeriesData.likes}
            </SeriesText>
          </SeriesInfoContainer>
        </SeriesCover>
        <SeriesEx>
          <SeriesText className="title">
            <span>{SeriesData.title}</span>
            {loginStatus && SeriesData.writer.id === userInfo?.id ? (
              <span>
                <TbEdit
                  onClick={() => {
                    router.push({
                      pathname: `/editor/${coverId}`,
                      query: {
                        title: SeriesData.title,
                      },
                    });
                  }}
                />
              </span>
            ) : (
              <LikeBtn
                onClick={() => {
                  postSeriesLike(Number(coverId));
                }}
              >
                {SeriesData.isLiked && <AiFillHeart size={25} />}
                {!SeriesData.isLiked && <AiOutlineHeart size={25} />}
              </LikeBtn>
            )}
          </SeriesText>
          <SeriesText className="writter">
            {SeriesData.writer.nickname}
          </SeriesText>
          <SeriesText className="description">
            {SeriesData.description}
          </SeriesText>
          <SeriesText className="genre">{SeriesData.genre}</SeriesText>
          <SeriesBtnContainer>
            <SeriesBtn
              className="first"
              onClick={() => {
                if (readId) {
                  clickHandler("continue");
                } else {
                  clickHandler("first");
                }
              }}
            >
              {readId ? "이어보기" : "첫화보기"}
            </SeriesBtn>
            <SeriesBtn
              className="choice"
              onClick={() =>
                loginStatus && userInfo?.id !== SeriesData.writer.id
                  ? setModalOpen(true)
                  : loginStatus
                  ? alert("작성자입니다.")
                  : alert("로그인 하세요")
              }
            >
              선택구매
            </SeriesBtn>
          </SeriesBtnContainer>
        </SeriesEx>
      </SeriesInfo>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="300"
          height="400"
          element={
            <SeriesSelected
              Info={SeriesData}
              setIsPurchase={setIsPurchase}
              isPurchased={isPurchased}
            />
          }
        />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
  padding-bottom: 2rem;
  padding-top: 2rem;
  font-weight: 700;
`;
const SeriesInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
  ${tabletH} {
    flex-direction: column;
    align-items: center;
  }
  height: auto;
`;
const SeriesEx = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0rem;
  width: 70%;
  div {
    padding: 0.5rem;
  }
  ${mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;
const SeriesCover = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SeriesBtnContainer = styled.div`
  display: flex;
  align-items: center;
  ${mobile} {
    flex-direction: column;
    align-items: center;
  }
`;
const SeriesBtn = styled.button`
  /* border: 1px solid ${({ theme }) => theme.color.text1}; */
  box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
  width: 10rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 0.5rem;
  &.first {
    background-color: ${({ theme }) => theme.color.text1};
    color: ${({ theme }) => theme.color.text2};
  }
  &.choice {
    background-color: ${({ theme }) => theme.color.text2};
    color: ${({ theme }) => theme.color.text1};
  }
  ${mobile} {
    margin-top: 0.5rem;
    width: 100%;
  }
`;
const SeriesText = styled.div`
  margin-left: 0.5rem;
  display: flex;
  text-align: center;
  align-items: center;
  &.title {
    font-weight: 600;
    font-size: 22px;
    color: ${({ theme }) => theme.color.text1};
    justify-content: space-between;
  }

  &.writter {
    font-weight: 500;
    font-size: 13px;
    color: ${({ theme }) => theme.color.text1};
  }

  &.description {
    font-size: 12px;
    color: ${({ theme }) => theme.color.text3};
  }

  &.genre {
    background-color: ${({ theme }) => theme.color.searchBar};
    opacity: 70%;
    /* box-shadow: 0px 0px 2px ${({ theme }) => theme.color.text3}; */
    color: ${({ theme }) => theme.color.text3};
    max-width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    margin-left: 1rem;
    font-size: 10px;
    height: 1.5rem;
  }
  > span > svg {
    cursor: pointer;
  }
`;

const SeriesInfoContainer = styled.div`
  display: flex;
  font-weight: 200;
  opacity: 50%;
  margin-top: 3px;
  svg {
    opacity: 50%;
  }
`;

const LikeBtn = styled.button`
  color: ${({ theme }) => theme.color.point};
  padding-left: 1rem;
`;

export default SeriesHeader;
