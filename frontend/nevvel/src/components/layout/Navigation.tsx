import NavigationTop from "./NavigationTop";
import NavigationBottom from "./NavigationBottom";
import styled from "styled-components";

function Navigation() {
  return (
    <Wrapper>
      <NavigationTop />
      <NavigationBottom />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
`;

export default Navigation;
