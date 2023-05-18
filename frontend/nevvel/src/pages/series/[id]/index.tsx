import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SeriesHeader from "@/src/components/series/SeriesHeader";
import SeriesMain from "@/src/components/series/SeriesMain";
import SeriesData from "@/src/components/series/DummySeriesData.json";
import springApi from "@/src/api";
import { cover } from "series";
import { useRouter } from "next/dist/client/router";
import { mobile, tabletH } from "@/src/util/Mixin";
import { GetStaticPropsContext } from "next";
import axios from "axios";

interface Content {
  id: number;
  title: string;
  status: string;
  thumbnail: string;
  genre: string;
  writer: {
    id: number;
    nickname: string;
  };
  isUploaded: boolean;
  isNew: boolean;
}

function index(props: { seriesData: cover }) {
  // const [seriesData, setSeriesData] = useState<cover>();
  const [isPurchased, setIsPurchase] = useState<number>(0);
  // const router = useRouter();
  // const id = router.query.id;

  const seriesData = props.seriesData;

  // cover 정보 받아오기
  // const getSeriesData = async (Id: number) => {
  //   const res = await springApi.get(`/covers/${Id}`);
  //   if (res) {
  //     console.log(res);
  //     setSeriesData(res.data);
  //   }
  // };

  // useEffect(() => {
  //   console.log(id);
  //   if (id) {
  //     const Id = Number(id);
  //     getSeriesData(Id);
  //   } else {
  //     // setEpisodeData(Dummy_Episode); // merge 하기 전에 주석처리! 위에꺼는 해제
  //   }
  // }, [id, isPurchased]);

  return (
    <Wrapper>
      {seriesData && (
        <SeriesWrapper>
          <SeriesHeader
            SeriesData={seriesData}
            coverId={seriesData.coverId}
            setIsPurchase={setIsPurchase}
            isPurchased={isPurchased}
          />
          <SeriesMain SeriesData={seriesData} />
        </SeriesWrapper>
      )}
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("https://k8d1061.p.ssafy.io/api/covers");
  const series = await res.data;

  const paths = series.content.map((serie: Content) => ({
    params: { id: serie.id.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const seriesId = context.params?.id ?? "";

  const res = await axios.get(
    `https://k8d1061.p.ssafy.io/api/covers/${seriesId}`
  );
  const seriesData = res.data;

  return {
    props: {
      seriesData,
    },
    revalidate: 1,
  };
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
