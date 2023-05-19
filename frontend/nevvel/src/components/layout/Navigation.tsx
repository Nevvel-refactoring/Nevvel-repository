import { useState } from "react";
import NavigationTop from "./NavigationTop";
import NavigationBottom from "./NavigationBottom";
import styled from "styled-components";

function Navigation() {
  const [clickNull, setClickNull] = useState(false);

  // NavTop 요소 클릭한 경우
  const clickTopHandler = () => {
    setClickNull(true);
  };

  const clickBottomHandler = () => {
    setClickNull(false);
  };

  return (
    <Wrapper>
      <NavigationTop onClickTop={clickTopHandler} />
      <NavigationBottom
        clickNull={clickNull}
        onClickBottom={clickBottomHandler}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  border-top: 0.5px solid #e6e6e6;
  /* border-bottom: 0.5px solid #e6e6e6; */
`;

export default Navigation;
