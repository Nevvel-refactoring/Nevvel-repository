import React from "react";
import EditorHead from "@/src/components/editor/EditorHead";
import EditorMain from "@/src/components/editor/EditorMain";
import styled from "styled-components";

function editor() {
  return (
    <Wrapper>
      <EditorHead />
      <EditorMain />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  padding-left: 10%;
  padding-right: 10%;
`;

export default editor;
