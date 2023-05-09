import { useState } from "react";
import Pagination from "./Pagination";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import backward from "../../assets/img/backward.png";
import forward from "../../assets/img/forward.png";
import styled from "styled-components";

interface Novel {
  nav: string;
  name: string;
  genre: number | string;
  sort: string;
  pageNum: number | string;
}

function NovelPagination({ nav, name, genre, sort, pageNum }: Novel) {
  const router = useRouter();

  const [pagination, setPagination] = useState(1);
  const [divPagination, setDivPagiNation] = useState(1);

  // 페이지 마지막번호
  // const lastPageNumber = noveldata.totalPages;
  const lastPageNumber = 18;
  // console.log(lastPageNumber);

  // 페이지 번호를 담은 배열
  let pageArray = new Array();
  for (let i = 0; i < lastPageNumber; i++) {
    pageArray.push(i + 1);
  }

  // 페이지네이션의 마지막 번호
  // 페이지네이션 갯수 변경은 여기서
  const lastDivPageNumber = Math.ceil(lastPageNumber / 5);

  // 페이지 버튼을 클릭 시 페이지네이션을 업데이트하는 함수
  const onClickHandler = (num: number) => {
    setPagination(num);
    console.log(num)
    router.push({
      pathname: `/novels/${nav}`,
      query: { genre: genre, sort: sort, name: name, pageNum: num },
    });
  };

  // 페이지네이션 뒤로 가기
  const prevPagination = () => {
    if (divPagination > 1) {
      setDivPagiNation((prevState) => {
        return prevState - 1;
      });
    }
  };

  // 페이지네이션 앞으로 가기
  const nextPagination = () => {
    if (divPagination < lastDivPageNumber) {
      setDivPagiNation((prevState) => {
        return prevState + 1;
      });
    }
  };

  return (
    <Wrapper>
      <SpanPagination>
        <Image
          src={backward}
          alt="backward"
          width={10}
          height={15}
          onClick={prevPagination}
        />
      </SpanPagination>
      <DivPagination>
        {pageArray.map((pageNumber, idx) => {
          return 5 * (divPagination - 1) <= idx &&
            5 * (divPagination - 1) + 5 > idx ? (
            <Pagination
              key={pageNumber}
              pageNumber={pageNumber}
              onClickHandler={onClickHandler}
              pageOn={pagination === idx + 1 ? true : false}
            />
          ) : (
            ""
          );
        })}
      </DivPagination>
      <SpanPagination>
        <Image
          src={forward}
          alt="forward"
          width={10}
          height={15}
          onClick={nextPagination}
        />
      </SpanPagination>
    </Wrapper>
  );
}

export default NovelPagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
`;

const SpanPagination = styled.span`
  cursor: pointer;
`;

const DivPagination = styled.div`
  display: flex;
  align-items: center;
`;
