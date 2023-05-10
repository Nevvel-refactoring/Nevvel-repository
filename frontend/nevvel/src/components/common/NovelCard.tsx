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
      <Image src={unupload} alt="thumbnail" width={148} height={222} />
      <NovelDesc>
        <NovelTitleDiv>
          <NovelTitle>{props.title}</NovelTitle>
        </NovelTitleDiv>
        <NovelWriter>{props.writer}</NovelWriter>
        <NovelGenre>{props.genre}</NovelGenre>
      </NovelDesc>
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
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const NovelDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NovelTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NovelTitle = styled.div`
  padding-top: 1rem;
  font-size: 18px;
  text-align: center;
  height: 3.25rem;
  overflow: hidden;
`;

const NovelWriter = styled.div`
  padding-top: 1rem;
  font-size: 14px;
  text-align: center;
`;

const NovelGenre = styled.div`
  padding-top: 1rem;
  text-align: center;
`;
