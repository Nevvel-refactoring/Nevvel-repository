import React, { useState } from "react";
import styled from "styled-components";
import EditorMainButton from "./Main/Text/EditorMainButton";
import EditorMainList from "./Main/Text/EditorMainList";
import EditorMainInput from "./Main/Text/EditorMainInput";

interface TextBlock {
  id: number;
  text: string;
  image: string;
  sound: string; 
}

function EditorMain() {
  const [currentText, setCurrentText] = useState("");
	const [textBlocks, setTextBlocks] =useState<TextBlock[]>([]);


	return (
    <Wrapper>
      <EditorMainButton />
      <EditorMainList
			textBlocks={textBlocks}
			setTextBlocks={setTextBlocks}
			
			/>
      <EditorMainInput
			currentText={currentText}
			setCurrentText={setCurrentText}
			textBlocks={textBlocks}
			setTextBlocks={setTextBlocks}
			/>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default EditorMain;
