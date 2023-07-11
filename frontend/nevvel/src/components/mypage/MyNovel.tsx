import { useState, useEffect } from "react";
import springApi from "@/src/api";
import { NewvelApi } from "@/src/api";
import { userInfoAtom } from "@/src/store/Login";
import { Novel, Content } from "novel";

import SemiTitle from "./SemiTitle";
import { Modal } from "../common/Modal";
import CreateNewNovel from "../mypage/CreateNewNovel";
import NovelCard from "../common/NovelCard";

function MyNovel() {
  // 작성한 소설
  const userInfoStatus = useAtomValue(userInfoAtom);
  const [uploadedNovel, setUploadedNovel] = useState<Novel | undefined>(
    undefined
  );
  const [uploadedNovel5, setUploadedNovel5] = useState<Content[] | undefined>(
    undefined
  );
  const [uploadedMore, setUploadedMore] = useState("");
  useEffect(() => {
    const getUploadedCovers = async () => {
      const res = await springApi.get(`/covers/uploader/${userInfoStatus?.id}`);
      // console.log(res.data);
      setUploadedNovel(res.data);
      // console.log(res.data.empty);
      if (res.data.empty) {
        setUploadedMore("");
      } else {
        setUploadedMore("/myPage/uploadedNovel");
      }
    };
    getUploadedCovers();
  }, []);
  // 작성한 소설 5개 받아오기
  useEffect(() => {
    setUploadedNovel5(uploadedNovel?.content?.slice(0, 5));
    // console.log(uploadedNovel?.content?.slice(0, 5));
  }, [uploadedNovel]);

  // 구매한 소설
  const [purchasedNovel, setPurchasedNovel] = useState<Novel | undefined>(
    undefined
  );
  const [purchasedNovel5, setPurchasedNovel5] = useState<Content[] | undefined>(
    undefined
  );
  const [purchasedMore, setPurchasedMore] = useState("");
  useEffect(() => {
    const getPurchasedCovers = async () => {
      const res = await NewvelApi.purchasedCovers();
      // console.log(res.data);
      setPurchasedNovel(res.data);
      if (res.data.empty) {
        setPurchasedMore("");
      } else {
        setPurchasedMore("/myPage/purchasedNovel");
      }
    };
    getPurchasedCovers();
  }, []);
  // 구매한 소설 5개 받아오기
  useEffect(() => {
    setPurchasedNovel5(purchasedNovel?.content?.slice(0, 5));
  }, [purchasedNovel]);

  // 좋아요한 소설
  const [likedNovel, setLikedNovel] = useState<Novel | undefined>(undefined);
  const [likedNovel5, setLikedNovel5] = useState<Content[] | undefined>(
    undefined
  );
  const [likedMore, setLikedMore] = useState("");
  useEffect(() => {
    const getLikedCovers = async () => {
      const res = await NewvelApi.likesCovers();
      // console.log(res.data);
      setLikedNovel(res.data);
      if (res.data.empty) {
        setLikedMore("");
      } else {
        setLikedMore("/myPage/likedNovel");
      }
    };
    getLikedCovers();
  }, []);
  // 좋아요한 소설 5개 받아오기
  useEffect(() => {
    setLikedNovel5(likedNovel?.content?.slice(0, 5));
  }, [likedNovel]);

  // 새 소설 생성하기
  const [modalOpen, setModalOpen] = useState(false);
  const newNovelHandler = () => {
    setModalOpen(true);
  };

  return (
    <NovelWrapper>
      <TitleWrapper>
        <NovelTitle>웹소설</NovelTitle>
        <NewNovel onClick={newNovelHandler}>새 소설 생성하기</NewNovel>
      </TitleWrapper>
      <NovelContent>
        <SemiTitle title="작성한 소설" more={uploadedMore} />
        <UploadedNovelDiv>
          {uploadedNovel?.empty ? (
            <EmptyDiv>작성한 소설이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <NovelDiv>
              {uploadedNovel5?.map((novel, index: number) => {
                return (
                  <NovelCard
                    key={index}
                    id={novel.id}
                    title={novel.title}
                    writer={novel.writer.nickname}
                    writerId={novel.writer.id}
                    genre={novel.genre}
                    thumbnail={novel.thumbnail}
                    isUploaded={novel.isUploaded}
                    isNew={novel.isNew}
                  />
                );
              })}
            </NovelDiv>
          )}
        </UploadedNovelDiv>
      </NovelContent>
      <NovelContent>
        <SemiTitle title="구매한 소설" more={purchasedMore} />
        <PurchasedNovelDiv>
          {purchasedNovel?.empty ? (
            <EmptyDiv>구매한 소설이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <NovelDiv>
              {purchasedNovel5?.map((novel, index: number) => {
                return (
                  <NovelCard
                    key={index}
                    id={novel.id}
                    title={novel.title}
                    writer={novel.writer.nickname}
                    writerId={novel.writer.id}
                    genre={novel.genre}
                    thumbnail={novel.thumbnail}
                    isUploaded={novel.isUploaded}
                    isNew={novel.isNew}
                  />
                );
              })}
            </NovelDiv>
          )}
        </PurchasedNovelDiv>
      </NovelContent>
      <NovelContent>
        <SemiTitle title="좋아요한 소설" more={likedMore} />
        <LikedNovelDiv>
          {likedNovel?.empty ? (
            <EmptyDiv>좋아요한 소설이 존재하지 않습니다.</EmptyDiv>
          ) : (
            <NovelDiv>
              {likedNovel5?.map((novel, index: number) => {
                return (
                  <NovelCard
                    key={index}
                    id={novel.id}
                    title={novel.title}
                    writer={novel.writer.nickname}
                    writerId={novel.writer.id}
                    genre={novel.genre}
                    thumbnail={novel.thumbnail}
                    isUploaded={novel.isUploaded}
                    isNew={novel.isNew}
                  />
                );
              })}
            </NovelDiv>
          )}
        </LikedNovelDiv>
      </NovelContent>
      {modalOpen && (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="300"
          height="500"
          element={<CreateNewNovel setModalOpen={setModalOpen} />}
        />
      )}
    </NovelWrapper>
  );
}

export default MyNovel;

const NovelWrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NovelTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const NewNovel = styled.div`
  margin-left: 2rem;
  cursor: pointer;
  &:hover {
    color: #8385ff;
  }
`;

const NovelContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyDiv = styled.div`
  padding-left: 8%;
  margin-top: 1rem;
  text-align: center;
`;

const NovelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UploadedNovelDiv = styled.div``;

const PurchasedNovelDiv = styled.div``;

const LikedNovelDiv = styled.div``;
