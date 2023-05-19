import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

interface Details {
  title: string;
  more: string;
}

function BestNovels({ title, more }: Details) {
  const router = useRouter();

  const moreHandler = (params: string) => {
    router.push({ pathname: `${params}` });
  };

  return (
    <BestWrapper>
      <BestTitle>{title}</BestTitle>
      <ViewMore
        onClick={() => {
          moreHandler(`${more}`);
        }}
      >
        전체보기
      </ViewMore>
    </BestWrapper>
  );
}

export default BestNovels;

const BestWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  padding-left: 10%;
  padding-right: 12%;
`;

const BestTitle = styled.div`
  /* font-size: 24px; */
  font-size: 1.5rem;
  font-weight: 800;
  padding-top: 1rem;
`;

const ViewMore = styled.div`
  font-size: 1rem;
  border-bottom: 1px solid;
  cursor: pointer;
`;
