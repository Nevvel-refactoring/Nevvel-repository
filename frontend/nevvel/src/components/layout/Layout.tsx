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

const Wrapper = styled.div``;

export default Layout;
