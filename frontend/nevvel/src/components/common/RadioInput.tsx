import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface RadioProps {
  id: number;
  value: number;
  labelText: string;
  name: string;
  current: number;
  setValue: Dispatch<SetStateAction<number>>;
}

function RadioInput({
  id,
  value,
  labelText,
  name,
  current,
  setValue,
}: RadioProps) {
  const onChecked = () => {
    setValue(Number(value));
  };
  return (
    <Wrapper>
      <RadioDiv active={current === value ? true : false} onClick={onChecked}>
        <label htmlFor={labelText}>
          <input
            type="radio"
            value={value}
            id={labelText}
            name={name}
            checked={current === value ? true : false}
          />
          <span>{labelText}</span>
        </label>
      </RadioDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  display: flex;
  justify-content: center;
`;

const RadioDiv = styled.div<{ active: boolean }>`
  input[type="radio"] {
    display: none;
  }
  background: ${({ active, theme }) => {
    if (active) {
      return theme.color.hover;
    }
  }};
  margin: 0.5rem;
  padding: 1rem;
  width: 95%;
  border: 1.5px solid;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
  }
  cursor: pointer;
`;

export default RadioInput;
