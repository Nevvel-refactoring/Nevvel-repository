import React from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface ModalonModalProps {
  modal: any;
  width: string;
  height: string;
  element: JSX.Element;
  setModalonModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalonModal = ({ width, height, element, setModalonModalOpen }: ModalonModalProps) => {
  const disableModalonModal = () => {
    setModalonModalOpen(false);
  };

  return (
    <>
      <Container width={width} height={height}>
        {/* <ExitWrapper onClick={disableModalonModal}>Close</ExitWrapper> */}
        <Wrapper>{element}</Wrapper>
      </Container>
      <Canvas onClick={disableModalonModal} />
    </>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: calc(50vw - ${(props) => props.width}px / 2);
  top: calc(50vh - ${(props) => props.height}px / 2);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 8px;
  z-index: 2000;
  color: ${( { theme }) => theme.color.text1};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
`;

const ExitWrapper = styled.button`
  position: absolute;
  bottom: 20px;
  font-size: 24px;
  width: 120px;
  border-radius: 5px;
  background-color: white;
  transition: color 0.2s, border-color 1s, transform 0.5s;

  cursor: pointer;
  &:hover {
    border-color: black;
    color: black;
    box-shadow: 0 0.5em 0.5em -0.4em;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 53;
`;

const Wrapper = styled.div`
  background-color: transparent;
  transition: all 0.5s;
  height: 85vh;
`;
