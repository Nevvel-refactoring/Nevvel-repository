import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { useAtomValue } from "jotai";

import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { tabletH } from "../../util/Mixin";
import { mobile } from "../../util/Mixin";

import { MyPageModal } from "./MyPageModal";

interface Props {
  onClickTop: () => void;
}

function NavigationTop(props: Props) {
  const [word, setWord] = useState<string>("");

  const searchWordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const loginStatus = useAtomValue(loginAtom);
  const userInfoStatus = useAtomValue(userInfoAtom);

  const router = useRouter();
  // 검색창에 키보드 입력 시
  const keyboardResultHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Enter 키를 입력한 경우
    if (event.key === "Enter") {
      router.push({
        pathname: `/novels/search`,
        query: {
          word: word,
        },
      });
      setWord("");
      props.onClickTop();
    }
  };
  // 돋보기 클릭 시
  const clickResultHandler = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    router.push({
      pathname: `/novels/search`,
      query: {
        word: word,
      },
    });
    setWord("");
    props.onClickTop();
  };

  // 프로필 클릭 시 모달
  const [modalStatus, setModalStatus] = useState(false);
  const modalOpenHandler = () => {
    setModalStatus(true);
  };

  // 로그인 시 소설 배경색 없애기
  const loginHandler = () => {
    props.onClickTop();
  };

  // 프로필 클릭 시 소설 배경색 없애기
  const clickProfileHandler = () => {
    props.onClickTop();
  };

  return (
    <Wrapper>
      <SearchBar>
        <SearchBarInput
          value={word}
          onChange={searchWordHandler}
          onKeyDown={keyboardResultHandler}
          placeholder="작품명, 작가명을 입력하세요"
        />
        <SearchIcon>
          <AiOutlineSearch onClick={clickResultHandler} color="#666666" />
        </SearchIcon>
      </SearchBar>
      {loginStatus ? (
        <Profile loginStatus={loginStatus}>
          <MyPage>
            <ImageDiv onClick={modalOpenHandler}>
              <Img src={userInfoStatus?.profileImage} alt="profileImage" />
            </ImageDiv>
            {modalStatus ? (
              <MyPageModal
                modal={modalStatus}
                setModal={setModalStatus}
                width="100"
                height="70"
                onClickProfile={clickProfileHandler}
              />
            ) : (
              ""
            )}
          </MyPage>
        </Profile>
      ) : (
        <Profile loginStatus={loginStatus}>
          <LogIn>
            <Link href="/login" onClick={loginHandler}>
              로그인
            </Link>
          </LogIn>
        </Profile>
      )}
    </Wrapper>
  );
}

export default NavigationTop;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  justify-content: space-between;
  padding-left: 30%;
  padding-top: 10px;

  ${tabletH} {
    padding-left: 15%;
  }
`;

const SearchBar = styled.div`
  background-color: ${({ theme }) => theme.color.searchBar};
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 24rem;
  height: 1.7rem;

  ${tabletH} {
    width: 16rem;
  }
  ${mobile} {
    width: 12rem;
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const SearchBarInput = styled.input`
  background-color: ${({ theme }) => theme.color.searchBar};
  border: none;
  width: 23rem;
  ${tabletH} {
    width: 12rem;
  }
  ${mobile} {
    width: 8rem;
    font-size: 12px;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
`;

const Profile = styled.div<{ loginStatus: boolean }>`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  margin-right: 5rem;
  width: 10rem;
  justify-content: center;

  ${tabletH} {
    font-size: 14px;
    margin-right: 10%;
  }
`;

const LogIn = styled.div`
  font-size: 13.5px;
`;

const MyPage = styled.div`
  z-index: 3;
`;

const ImageDiv = styled.div`
  border-radius: 100rem;
  object-fit: cover;
  margin-top: 2rem;
  cursor: pointer;
  z-index: 3;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  z-index: -1;
`;
