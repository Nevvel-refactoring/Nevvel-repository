import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SeriesHeader from "@/src/components/series/SeriesHeader";
import SeriesMain from "@/src/components/series/SeriesMain";
import SeriesData from "@/src/components/series/DummySeriesData.json";
import springApi from "@/src/api";
import { cover } from "series";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";

function index() {
  const [seriesData, setSeriesData] = useState<cover>();
  const [isPurchased, setIsPurchase] = useState<number>(0);
  const router = useRouter();
  const id = router.query.id;

  // cover 정보 받아오기
  const getSeriesData = async (Id: number) => {
    const res = await springApi.get(`/covers/${Id}`);
    if (res) {
      console.log(res);
      setSeriesData(res.data);
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      const Id = Number(id);
      getSeriesData(Id);
    } else {
      // setEpisodeData(Dummy_Episode); // merge 하기 전에 주석처리! 위에꺼는 해제
    }
  }, [id, isPurchased]);

  return (
    <Wrapper>
      {seriesData && (
        <SeriesWrapper>
          <SeriesHeader
            SeriesData={seriesData}
            coverId={id}
            setIsPurchase={setIsPurchase}
            isPurchased={isPurchased}
          />
          <SeriesMain SeriesData={seriesData} />
        </SeriesWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding: 0;
  margin: 0;
`;
const SeriesWrapper = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  position: relative;
  ${tabletH} {
    margin-left: 10%;
    margin-right: 10%;
  }
  ${mobile} {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export default index;
