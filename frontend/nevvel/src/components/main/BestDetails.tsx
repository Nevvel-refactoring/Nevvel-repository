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
    <BestNovelsWrapper>
      <BestNovelsTitle>{title}</BestNovelsTitle>
      <MoreNovels
        onClick={() => {
          moreHandler(`${more}`);
        }}
      >
        전체보기
      </MoreNovels>
    </BestNovelsWrapper>
  );
}

export default BestNovels;

const BestNovelsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  padding-left: 5%;
  padding-right: 7%;
`;

const BestNovelsTitle = styled.div`
  /* font-size: 24px; */
  font-size: 1.5rem;
  font-weight: 800;
`;

const MoreNovels = styled.div`
  font-size: 1rem;
  border-bottom: 1px solid;
`;
