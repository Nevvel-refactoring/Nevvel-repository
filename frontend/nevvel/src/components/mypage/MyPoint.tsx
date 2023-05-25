import { useAtomValue } from "jotai";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

import { userInfoAtom } from "@/src/store/Login";

function MyPoint() {
  const userInfoStatus = useAtomValue(userInfoAtom);

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
          <TextTitle>보유 포인트:</TextTitle>
          <TextTitle>{userInfoStatus?.point.toLocaleString()}원</TextTitle>
        </TextWrapper>
      </PointContent>
    </PointWrapper>
  );
}

export default MyPoint;

const PointWrapper = styled.div`
  margin-top: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PointTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ChargePoint = styled.div`
  margin-left: 2rem;
  cursor: pointer;
  &:hover {
    color: #8385ff;
  }
`;

const PointContent = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.hover};
`;

const TextWrapper = styled.div`
  display: flex;
`;

const TextTitle = styled.div`
  margin-left: 1rem;
`;
