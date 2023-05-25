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
    <SemiTitleWrapper>
      <SemiTitle>{title}</SemiTitle>
      {more === "" ? (
        ""
      ) : (
        <ViewMore
          onClick={() => {
            moreHandler(`${more}`);
          }}
        >
          전체보기
        </ViewMore>
      )}
    </SemiTitleWrapper>
  );
}

export default BestNovels;

const SemiTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  padding-left: 2%;
  padding-right: 5%;
`;

const SemiTitle = styled.div`
  font-size: 1.125rem;
`;

const ViewMore = styled.button`
  font-size: 0.8rem;
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
`;
