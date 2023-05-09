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

  return <Wrapper onClick={pageNumHandler}>{props.pageNumber}</Wrapper>;
}

export default Pagination;

const Wrapper = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 13.5px;
  cursor: pointer;
`;
