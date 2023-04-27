import Image from "next/image";
import nevvel_light from "../../assets/img/nevvel_light.png";
import nevvel_dark from "../../assets/img/nevvel_dark.png";
import nevvel_m_light from "../../assets/img/nevvel_m_light.png";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";
import styled from "styled-components";

function NavigationBottom() {
  return (
    <Wrapper>
      <Image src={nevvel_light} alt="Logo" width={150} height={35} />
      <Genre>장르별 소설</Genre>
      <Completed>완결 소설</Completed>
      <Latest>최신 소설</Latest>
      <AssetStore>에셋 스토어</AssetStore>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Genre = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const Completed = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const Latest = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

const AssetStore = styled.div`
  color: ${({ theme }) => theme.color.text1};
`;

export default NavigationBottom;
