import styled from "styled-components";

export const Btn = styled.div`
  display: flex;
  text-align: center;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
`;

export const ModalListItemData = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

export const ModalContainer = styled.div`
padding: 2rem;
padding-top: 1rem;
`;

export const ModalPostHeader = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
padding-bottom: 1rem;
border-bottom: 1px solid ${({ theme }) => theme.color.opacityText3};
`;

export const ModalPostForm = styled.div`
display: flex;
margin-top: 2rem;
flex-direction: column;
width: 100%;
height: 65vh;
justify-content: space-between;
`;

export const ModalListItem = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;

&.now {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
`;

export const ToggleBtnContainer = styled.div`
  width: 4.5rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleBtn = styled.div<{ toggle: boolean }>`
  background-color: ${(props) =>
    props.toggle
      ? ({ theme }) => theme.color.hover
      : ({ theme }) => theme.color.background};
  &.reserve {
    background-color: ${(props) =>
      props.toggle
        ? ({ theme }) => theme.color.hover
        : ({ theme }) => theme.color.background};
  }
  &.now {
    background-color: ${(props) =>
      props.toggle
        ? ({ theme }) => theme.color.background
        : ({ theme }) => theme.color.hover};
  }
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  padding: 0.2rem;
  border: 1px solid gray;
  cursor: pointer;
`;

export const ToggleBtnText = styled.div``;

export const BottomBtn = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const PostBtn = styled.button`
/* border: 1px solid ${({ theme }) => theme.color.text1}; */
box-shadow: 0px 0px 1px ${({ theme }) => theme.color.text1};
width: 10rem;
height: 2rem;
border-radius: 10px;
margin-left: 0.5rem;
&.first {
  background-color: ${({ theme }) => theme.color.text1};
  color: ${({ theme }) => theme.color.text2};
}
&.choice {
  background-color: ${({ theme }) => theme.color.text2};
  color: ${({ theme }) => theme.color.text1};
}
`;
