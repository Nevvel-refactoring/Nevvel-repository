import SemiTitle from "./SemiTitle";
import styled from "styled-components";

function MyNovel() {
  // 작성한 소설

  // 구매한 소설

  // 좋아요한 소설
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

const NovelWrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
