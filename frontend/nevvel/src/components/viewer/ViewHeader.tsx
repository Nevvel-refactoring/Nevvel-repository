import React, { useEffect, useState } from "react";
import { episode } from "editor";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";
import springApi from "@/src/api";
import { Modal } from "../common/Modal";

type ViewHeaderProps = {
  id: string | string[] | undefined
  EpisodeData:episode
};

function ViewHeader({ EpisodeData,id }: ViewHeaderProps) {
  const [deleteModalOpen , setDeleteModalOpen] =useState(false)
  const [deleteData, setDeleteData] = useState<episode>()
  const router = useRouter();
  const putEpisodeData = {
    coverId:EpisodeData.coverId,
    statusType: EpisodeData.statusType,
    point:0,
    title: EpisodeData.title,
    contents: EpisodeData.contents
  }
  console.log(putEpisodeData)
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
          pathname:'/editor/[id]/[eid]',
          query:{id:EpisodeData.coverId, eid:426}
        })
  //   }
  // }
  // catch(error){
  //   console.log(error)
  // }
  };

  const clickHandler = () => {
    router.push({
      pathname:'/series/[id]',
      query:{id:1}
    })
  }

  const editHandler = () => {
    if(id){
      const Id = Number(id)
      putViewerData(Id)
    }
  }
  const deleteModalHandler = () => {
    setDeleteModalOpen(true)
    setDeleteData({
      coverId:EpisodeData.coverId,
      statusType: "DELETED",
      point: 0,
      title: EpisodeData.title,
      contents: EpisodeData.contents
    })
  }


  const postHandler = async () => {
    console.log(deleteData)
    try {
      const res = await springApi.post("/episodes", deleteData);
      if (res.status === 201) {
        console.log(res);
        alert(`${EpisodeData.title}가 삭제되었습니다`)
      }
    } catch (error) {
      console.log(error);
    }
    // setPostedEpisodeId(320);
  };


  return (
    <>
      <HeaderTopContainer>
        <AiFillCaretLeft  size={24}/>
          <EpisodeTitleContainer>
            <EpisodeHome>
              <AiOutlineHome onClick={clickHandler} size={24} />
            </EpisodeHome>
            <EpisodeTitle>{EpisodeData.title}</EpisodeTitle>
            <button onClick={editHandler}>수정</button>
            <button onClick={deleteModalHandler}>삭제</button>
          </EpisodeTitleContainer>
        <AiFillCaretRight size={24} />
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
              <button onClick={() =>setDeleteModalOpen(false)}>아니요</button>
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
  ${mobile}{
    width: auto;
  }
`;

const ProgressBar = styled.div``;
const EpisodeTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const EpisodeTitle = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  ${tabletH}{
    width: 80%;
  }
  ${mobile}{
    width: 50%;
  }
`
const EpisodeHome = styled.button`
  margin-right: 1rem;
  color: ${({ theme })=> theme.color.text1};
`;

export default ViewHeader;

