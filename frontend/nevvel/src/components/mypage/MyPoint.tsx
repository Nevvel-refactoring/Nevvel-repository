import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

function MyPoint() {
  const router = useRouter();

  const pointChargeHandler = () => {
    router.push({ pathname: "/myPage/purchase" });
  };

  return (
    <PointWrapper>
      <TitleWrapper>
        <PointTitle>포인트</PointTitle>
        <ChargePoint onClick={pointChargeHandler}>포인트 충전하기</ChargePoint>
      </TitleWrapper>
      <PointContent>
        <TextWrapper>
          <TextTitle>현재 포인트</TextTitle>
          <TextTitle>포인트 사용내역</TextTitle>
        </TextWrapper>
        <TextWrapper>
          <TextTitle>700</TextTitle>
          <TextTitle>300</TextTitle>
        </TextWrapper>
      </PointContent>
    </PointWrapper>
  );
}

export default MyPoint;

const PointWrapper = styled.div`
  width: 30%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PointTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ChargePoint = styled.div`
  font-size: 0.8rem;
  border-bottom: 1px solid;
  cursor: pointer;
`;

const PointContent = styled.div`
  display: flex;
  background-color: #e6e6e6;
  border-radius: 1rem;
`;

const TextWrapper = styled.div`
  width: 80%;
`;

const TextTitle = styled.div``;
