import Image from "next/image";
import styled from "styled-components";
import unupload from "../../../public/UnUploadImgBtn.png";

interface Novel {
  id: number;
  title: string;
  writer: string;
  writerId: number;
  genre: string;
  thumbnail: string;
}

function NovelCard(props: Novel) {
  // console.log(props);

  return (
    <Wrapper>
      {/* <Image src={props.thumbnail} alt="thumbnail" width={25} height={25} /> */}
      <Image src={unupload} alt="thumbnail" width={208} height={295} />
      <div>{props.title}</div>
      <div>{props.writer}</div>
      <div>{props.genre}</div>
    </Wrapper>
  );
}

export default NovelCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 13rem;
  height: 21rem;
`;
