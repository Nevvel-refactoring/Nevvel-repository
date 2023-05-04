import Image from "next/image";
import styled from "styled-components";
import unupload from "../../../public/UnUploadImgBtn.png";

interface Novel {
  id: number;
  title: string;
  thumbnail: string;
}

function NovelCard(props: Novel) {
  // console.log(props);

  return (
    <Wrapper>
      <div>{props.id}</div>
      <div>{props.title}</div>
      {/* <Image src={props.thumbnail} alt="thumbnail" width={25} height={25} /> */}
      <Image src={unupload} alt="thumbnail" width={150} height={150} />
    </Wrapper>
  );
}

export default NovelCard;

const Wrapper = styled.div`
  width: 13rem;
  height: 17rem;
`;
