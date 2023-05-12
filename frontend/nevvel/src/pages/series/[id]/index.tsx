import React from "react";
import styled from "styled-components";
import SeriesHeader from "@/src/components/series/SeriesHeader";
import SeriesMain from "@/src/components/series/SeriesMain";
import SeriesData from "@/src/components/series/DummySeriesData.json";

function index() {
  return (
    <Wrapper>
      <SeriesWrapper>
        <SeriesHeader SeriesData={SeriesData} />
        <SeriesMain SeriesData={SeriesData} />
      </SeriesWrapper>
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

`;

export default index;
