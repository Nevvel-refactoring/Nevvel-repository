import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { NovelCardType } from "novel";

function NovelCard(props: NovelCardType) {
  console.log(props);
  // const isUploaded = props.isUploaded;

  const router = useRouter();
  const novelDetailHandler = () => {
    router.push({ pathname: `/series/${props.id}` });
  };

  return (
    <Wrapper onClick={novelDetailHandler}>
      {/* <Image src={props.thumbnail} alt="thumbnail" width={25} height={25} /> */}
      <ImgDiv>
        <StatusSpan>
          {props.isUploaded && <UpdateNovel id="up">UP</UpdateNovel>}
          {props.isNew && <NewNovel id="new">신작</NewNovel>}
        </StatusSpan>
        <Image src={props.thumbnail} alt="thumbnail" width={148} height={222} />
      </ImgDiv>
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
  font-size: 17px;
  font-weight: 700;
  line-height: 180%;
  text-align: center;
  overflow: hidden;
  width: 13rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NovelWriter = styled.div`
  font-size: 12px;
  text-align: center;
`;

const NovelGenre = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  text-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.searchBar};
  opacity: 70%;
  color: ${({ theme }) => theme.color.text3};
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 10px;
  height: 1.5rem;
`;

const ImgDiv = styled.div`
  position: relative;
  display: flex;
`;

const NewNovel = styled.span`
  color: white;
  font-size: 8px;
  font-weight: 700;
  /* background-color: ${({ theme }) => theme.color.point}; */
  padding: 2px;
  margin: 2px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.newSpan};
`;

const UpdateNovel = styled.span`
  color: white;
  font-size: 8px;
  font-weight: 700;
  /* background-color: ${({ theme }) => theme.color.point}; */
  padding: 2px;
  margin: 2px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.upSpan};
`;

const StatusSpan = styled.span`
  position: absolute;
  margin: 3px;
`;
