import React from "react";
import styled from "styled-components";

function EditorHead() {
  return (
    <Wrapper>
      <ButtonWrapper>
        <NovelButtonContainer>
          <NovelButton>소설선택</NovelButton>
          <NovelButton>새 소설 생성</NovelButton>
        </NovelButtonContainer>
        <WriteButtonContainer>
          <WriteButton>미리보기</WriteButton>
          <WriteButton>임시저장</WriteButton>
          <WriteButton>발행하기</WriteButton>
        </WriteButtonContainer>
      </ButtonWrapper>
      <InputWrapper>
        <TitleInput placeholder="에피소드 명" />
        <TagInput placeholder="태그를 입력하세요" />
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NovelButtonContainer = styled.div``;
const NovelButton = styled.button`
  color: ${({ theme }) => theme.color.text1};
  border: 1px solid ${({ theme }) => theme.color.button};
  margin: 1px;
  border-radius: 1rem;
  height: 2.75rem;
  width: 6.25rem;
`;
const WriteButtonContainer = styled.div``;

const WriteButton = styled.button`
  color: ${({ theme }) => theme.color.text1};
  border: 1px solid ${({ theme }) => theme.color.point};
  margin: 1px;
  border-radius: 10px;
  height: 2.75rem;
  width: 6.25rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const TagInput = styled.input`
  margin-bottom: 10px;
`;

export default EditorHead;
