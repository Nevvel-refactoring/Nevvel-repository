import React, { useEffect, useState } from "react";
import { episode } from "editor";
import { newEpisodeViewer } from "viewer";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineHome,
  AiFillSetting,
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

type ViewerMobileBottomProps = {
  id: string | string[] | undefined;
  EpisodeData: episode;
  setSettingBox: React.Dispatch<React.SetStateAction<boolean>>;
  settingBox: boolean;
  headerEpisodeData: newEpisodeViewer | undefined;
};

function ViewerMobileBottom({
  headerEpisodeData,
  EpisodeData,
  id,
  setSettingBox,
  settingBox,
}: ViewerMobileBottomProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<episode>();
  const userInfo = useAtomValue(userInfoAtom);
  const loginStatus = useAtomValue(loginAtom);
  const router = useRouter();
  const putEpisodeData = {
    coverId: EpisodeData.coverId,
    statusType: EpisodeData.statusType,
    point: 0,
    title: EpisodeData.title,
    contents: EpisodeData.contents,
  };
  console.log(putEpisodeData);
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
      query: { id: EpisodeData.coverId, eid: id },
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
      router.push({
        pathname: "/viewer/[id]",
        query: { id: headerEpisodeData?.prevEpisodeId },
      });
    } else if (e == "next") {
      router.push({
        pathname: "/viewer/[id]",
        query: { id: headerEpisodeData?.nextEpisodeId },
      });
    }
  };

  return (
    <>
      <HeaderTopContainer>
        <Btn>
          <AiFillCaretLeft
            className="left"
            size={24}
            onClick={() => moveSeries("prev")}
          />
        </Btn>
        <Btn>
          <AiFillCaretRight
            className="right"
            size={24}
            onClick={() => moveSeries("next")}
          />
        </Btn>
        <AiOutlineHome onClick={clickHandler} size={24} />
        {loginStatus && headerEpisodeData?.writerId === userInfo?.id && (
          <>
            <Btn onClick={editHandler}>
              <FiEdit size={18} />
            </Btn>
            <Btn onClick={deleteModalHandler}>
              <BsFillTrashFill size={18} />
            </Btn>
          </>
        )}
            <Btn onClick={() => setSettingBox(!settingBox)}>
              <AiFillSetting size={18} />
            </Btn>
      </HeaderTopContainer>
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
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  ${tabletH} {
  }
  ${mobile} {
    width: 80%;
    justify-content: space-between;
  }
`;

const Btn = styled.div`
  margin-left: 1rem;
  ${mobile} {
  }
`;

export default ViewerMobileBottom;
