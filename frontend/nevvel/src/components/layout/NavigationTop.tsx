import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { loginAtom } from "@/src/store/Login";
import { useAtomValue } from "jotai";
import { tabletH } from "../../util/Mixin";
import { mobile } from "../../util/Mixin";

function NavigationTop() {
  const loginStatus = useAtomValue(loginAtom);
  // console.log(loginStatus);

  const [word, setWord] = useState<string>("");

  const searchWordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const router = useRouter();
  // 검색창에 키보드 입력 시
  const keyboardResultHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // 빈 값인 경우 return
    // 네이버 시리즈는 따로 처리하지 않아 처리하지 않음
    // if (word.trim().length === 0) {
    //   return;
    // }
    // Enter 키를 입력한 경우
    if (event.key === "Enter") {
      router.push({
        pathname: `/novels/search`,
        query: {
          word: word,
        },
      });
      setWord("");
    }
    // 아닌 경우 (실시간 요청 보내는 경우 사용)
    // else {}
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
          <AiOutlineSearch onClick={clickResultHandler} />
        </SearchIcon>
      </SearchBar>
      {loginStatus ? (
        <Profile loginStatus={loginStatus}>
          <MyPage>
            <Link href="/myPage">마이페이지</Link>
          </MyPage>
        </Profile>
      ) : (
        <Profile loginStatus={loginStatus}>
          {/* <SignIn>
            <Link href="/login">회원가입</Link>
          </SignIn> */}
          <LogIn>
            <Link href="/login">로그인</Link>
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
    width: 18rem;
  }
`;

const SearchBarInput = styled.input`
  background-color: ${({ theme }) => theme.color.searchBar};
  border: none;
  width: 23rem;
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

const SignIn = styled.div`
  font-size: 13.5px;
`;

const LogIn = styled.div`
  font-size: 13.5px;
`;

const MyPage = styled.div`
  font-size: 13.5px;
`;
