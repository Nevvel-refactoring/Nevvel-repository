import React, { useEffect, useState } from "react";
import { episodeViewer, newEpisodeViewer } from "viewer";
import { episode } from "editor";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineHome,
} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";
import springApi from "@/src/api";
import { Modal } from "../common/Modal";
import { userInfoAtom, loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";

type ViewHeaderProps = {
  id: string | string[] | undefined;
  EpisodeData: episodeViewer;
  headerEpisodeData: newEpisodeViewer | undefined;
  setTotalImage:React.Dispatch<React.SetStateAction<string>>;
  setTotalAudio: React.Dispatch<React.SetStateAction<string>>
};

function ViewHeader({ EpisodeData, id, headerEpisodeData,setTotalImage,setTotalAudio }: ViewHeaderProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<episode>();
  const router = useRouter();
  const userInfo = useAtomValue(userInfoAtom);
  const loginStatus = useAtomValue(loginAtom);
  const putViewerData = async (Id: number) => {
    // console.log(putEpisodeData)
    // // try {
    // //   const res = await springApi.put(`/episodes/${Id}`, {
    // //     coverId:Id,
    // //     statusType: EpisodeData.statusType,
    // //     title: EpisodeData.title,
    // //     point:0,
    // //     contents: EpisodeData.contents
    // //   });
    //   if (res) {
    //     console.log(res);
    router.push({
      pathname: "/editor/[id]/[eid]",
      query: {
        id: EpisodeData.coverId,
        eid: id,
        title: EpisodeData.coverTitle,
      },
    });
    //   }
    // }
    // catch(error){
    //   console.log(error)
    // }
  };

  const clickHandler = () => {
    router.push({
      pathname: "/series/[id]",
      query: { id: EpisodeData.coverId },
    });
  };

  const editHandler = () => {
    if (id) {
      const Id = Number(id);
      putViewerData(Id);
    }
  };
  const deleteModalHandler = () => {
    setDeleteModalOpen(true);
    setDeleteData({
      coverId: EpisodeData.coverId,
      statusType: "DELETED",
      point: 0,
      title: EpisodeData.title,
      contents: EpisodeData.contents,
    });
  };

  const postHandler = async () => {
    console.log(deleteData);
    try {
      const res = await springApi.post("/episodes", deleteData);
      if (res.status === 201) {
        console.log(res);
        alert(`${EpisodeData.title}가 삭제되었습니다`);
      }
    } catch (error) {
      console.log(error);
    }
    // setPostedEpisodeId(320);
  };

  const moveSeries = (e: string) => {
    if (e == "prev") {
      setTotalImage("")
      setTotalAudio("")
      router.push({
        pathname: "/viewer/[id]",
        query: { id: headerEpisodeData?.prevEpisodeId },
      });
    } else if (e == "next") {
      setTotalImage("")
      setTotalAudio("")
      router.push({
        pathname: "/viewer/[id]",
        query: { id: headerEpisodeData?.nextEpisodeId },
      });
    }
  };

  return (
    <>
      <HeaderTopContainer>
        <AiFillCaretLeft
          className="left"
          size={24}
          onClick={() => moveSeries("prev")}
        />
        <EpisodeTitleContainer>
          <AiOutlineHome className="home" onClick={clickHandler} size={24} />
          <EpisodeTitle>{EpisodeData.title}</EpisodeTitle>
          {loginStatus && headerEpisodeData?.wirterId === userInfo?.id && (
            <>
              <Btn onClick={editHandler}>
                <FiEdit size={18} />
              </Btn>
              <Btn onClick={deleteModalHandler}>
                <BsFillTrashFill size={18} />
              </Btn>
            </>
          )}
        </EpisodeTitleContainer>
        <AiFillCaretRight
          className="right"
          size={24}
          onClick={() => moveSeries("next")}
        />
      </HeaderTopContainer>
      <ProgressBar />
      {deleteModalOpen && (
        <Modal
          modal={deleteModalOpen}
          setModal={setDeleteModalOpen}
          width="300"
          height="300"
          element={
            <div>
              글을 정말 삭제하시겠습니까?
              <button onClick={postHandler}>네</button>
              <button onClick={() => setDeleteModalOpen(false)}>아니요</button>
            </div>
          }
        />
      )}
    </>
  );
}
const HeaderTopContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  ${tabletH}{
    .left,.right{
      display: none;
    }
  }
  ${mobile} {
    width: 80%;
    justify-content: center;
  }
`;

const ProgressBar = styled.div``;
const EpisodeTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  ${tabletH} {
    width: 100%;
    .home{
      display: none;
    }
  }
  ${mobile} {
    width: 80%;
  }
`;
const EpisodeTitle = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  ${tabletH} {
    width: 100%;
    
  }
  ${mobile} {
    width: 100%;
  }
`;
const EpisodeHome = styled.button`
  margin-right: 1rem;
  color: ${({ theme }) => theme.color.text1};
  ${mobile} {
    display: none;
  }
`;

const Btn = styled.div`
  margin-left: 1rem;
  ${mobile} {
    display: none;
  }
`;
const MoveBtn = styled.button`
  ${mobile} {
    display: none;
  }
`;

const Space = styled.div`
  width: 24px;
`;

const postModalContainer = styled.div`
  
`
const postModalheader = styled.div`
  
`
export default ViewHeader;
