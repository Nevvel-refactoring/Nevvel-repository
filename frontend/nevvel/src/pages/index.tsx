import styled from "styled-components";


export default function Home() {

  return (
    <HomeWrapper>
      <span>Home</span>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  /* background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1}; */
`;