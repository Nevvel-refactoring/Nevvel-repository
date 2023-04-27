import styled from "styled-components";

function NavigationTop() {
  return (
    <Wrapper>
      <SearchBar>검색</SearchBar>
      <SignIn>회원가입</SignIn>
      <LogIn>로그인</LogIn>
      <MyPage>마이페이지</MyPage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const SearchBar = styled.div`
  background-color: ${({ theme }) => theme.color.searchBar};
`;

const SignIn = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const LogIn = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const MyPage = styled.div``;

export default NavigationTop;
