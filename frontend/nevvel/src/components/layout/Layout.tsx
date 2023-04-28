import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

function Layout(props: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Navigation />
      <div>{props.children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100wh;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

export default Layout;
