import styled from "styled-components";

interface Props {
  pageNumber: number;
  onClickHandler: (num: number) => void;
  pageOn: boolean;
}

function Pagination(props: Props) {
  const pageNumHandler = () => {
    props.onClickHandler(props.pageNumber);
  };

  return (
    <Wrapper onClick={pageNumHandler} pageOn={props.pageOn}>
      {props.pageNumber}
    </Wrapper>
  );
}

export default Pagination;

const Wrapper = styled.span<{ pageOn: boolean }>`
  margin-top: ${({ pageOn }) => (pageOn ? "1px" : "")};
  margin-left: 10px;
  margin-right: 10px;
  font-size: ${({ pageOn }) => (pageOn ? "15px" : "14px")};
  cursor: pointer;
  font-weight: ${({ pageOn }) => (pageOn ? "800" : "")};
`;
