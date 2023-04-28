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
  border-top: 0.5px solid #e6e6e6;
  border-bottom: 0.5px solid #e6e6e6;
`;

export default Navigation;
