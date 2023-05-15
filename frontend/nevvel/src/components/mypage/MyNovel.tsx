import SemiTitle from "./SemiTitle";
import styled from "styled-components";

function MyNovel() {
  return (
    <NovelWrapper>
      <TitleWrapper>웹소설</TitleWrapper>
      <SemiTitle title="작성한 소설" more="" />
      <SemiTitle title="구매한 소설" more="" />
      <SemiTitle title="좋아요한 소설" more="" />
    </NovelWrapper>
  );
}

export default MyNovel;

const NovelWrapper = styled.div``;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
