import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { tabletH } from "../../util/Mixin";
import { mobile } from "../../util/Mixin";

function NavigationTop() {
  return (
    <Wrapper>
      <SearchBar>
        <SearchBarInput placeholder="작품명, 작가명을 입력하세요" />
        <AiOutlineSearch />
      </SearchBar>
      <Profile>
        <SignIn>
          <Link href="/login">회원가입</Link>
        </SignIn>
        <LogIn>
          <Link href="/login">로그인</Link>
        </LogIn>
        {/* <MyPage>마이페이지</MyPage> */}
      </Profile>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  justify-content: space-between;
  padding-left: 30%;

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

const Profile = styled.div`
  color: ${({ theme }) => theme.color.text1};
  display: flex;
  margin-right: 5rem;
  width: 10rem;
  justify-content: space-between;

  ${tabletH} {
    font-size: 14px;
    margin-right: 10%;
  }
`;

const SignIn = styled.div``;

const LogIn = styled.div``;

const MyPage = styled.div``;

export default NavigationTop;
