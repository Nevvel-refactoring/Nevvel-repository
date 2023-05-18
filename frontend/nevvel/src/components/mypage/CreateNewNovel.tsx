import springApi, { NewvelApi } from "@/src/api";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cover } from "series";
import styled from "styled-components";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface CoverEdit {
  title: string;
  description: string;
  genreId: number | undefined;
}

interface Genre {
  id: number;
  name: string;
}

function CreateNewNovel({ setModalOpen }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      if (fileName) {
        const extension = fileName.split(".").pop()?.toLowerCase();
        if (extension && allowedExtensions.includes(extension)) {
          setImage(files[0]);
        } else {
          alert("지원되지 않는 파일 확장자입니다.");
        }
      } else {
        alert("오류가 발생하였습니다");
      }
    } else {
      alert("오류가 발생하였습니다");
    }
    // console.log(image)
  };

  // 이미지 파일 삭제
  const DeleteImg = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // console.log(image)
  };

  // 제목 저장
  const [title, setTitle] = useState<string>("");

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trim());
  };

  // 설명 저장
  const [description, setdecription] = useState<string>("");

  const onChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setdecription(e.currentTarget.value.trim());
  };

  // 장르 목록 가져오기
  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);

  useEffect(() => {
    const getGenres = async () => {
      const res = await NewvelApi.allGenres();
      setGenres(res.data.genres);
      // console.log(res.data.genres);
    };
    getGenres();
  }, []);

  // 장르 아이디 저장
  const [genre, setGenre] = useState<number | undefined>(undefined);

  const genreChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(Number(event.target.value));
  };

  // 전체 JsonData
  const [jsonDatas, setJasonDatas] = useState<CoverEdit>({
    title: "",
    description: "",
    genreId: undefined,
  });

  useEffect(() => {
    // jsonDatas에 json 집어넣기
    setJasonDatas({
      title: title,
      description: description,
      // 장르 선택 모달 추가
      genreId: genre,
    });
  }, [image, title, description, genre]);

  const SubmitEdit = async () => {
    const formData = new FormData();

    try {
      console.log(image, title, description, genre);
      // 제출버튼 누르면 formdata에 데이터 집어넣기
      if (image) {
        formData.append("file", image);
      }
      // formData.append('assetRegistDto', JSON.stringify(jsonDatas))
      formData.append(
        "coverRegisterDto",
        new Blob([JSON.stringify(jsonDatas)], { type: "application/json" })
      );

      await springApi
        .post("/covers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("에러남 error");
          console.log(err);
        });
    } catch (error) {
      alert("업로드 과정에서 문제가 발생하였습니다.");
    }
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <ImgUploadLabel>
        <ImgUploadInput
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        {image ? (
          <ImgUploadBtn src={URL.createObjectURL(image)} alt="Selected image" />
        ) : (
          ""
          //   <ImgUploadBtn src={Info.thumbnail} alt="UnUploadImgBtn" />
        )}
        {!image && <RelativeP>클릭하여 변경</RelativeP>}
      </ImgUploadLabel>
      {image ? <ImgDelBtn onClick={DeleteImg}>변경 표지 삭제</ImgDelBtn> : null}
      <SelectDiv>
        {/* selectBox로 장르 추가 */}
        {/* <RadioDiv
          active={coverStatusType === "SERIALIZED" ? true : false}
          onClick={() => setCoverStatusType("SERIALIZED")}
        > */}
        <label htmlFor="genre">장르 선택</label>
        <SelectGenre
          name="genre"
          id="genre"
          value={genre}
          onChange={genreChangeHandler}
        >
          {genres?.map((genre) => (
            <OptionGenre key={genre.id} value={genre.id}>
              {genre.name}
            </OptionGenre>
          ))}
        </SelectGenre>
        {/* </RadioDiv> */}
      </SelectDiv>
      <DesP>제목</DesP>
      <CoverTitle
        placeholder="시리즈 제목을 입력해주세요."
        onChange={onChangeTitle}
        value={title}
      />
      <DesP>설명</DesP>
      <CoverDescription
        placeholder="시리즈 설명을 입력해주세요."
        onChange={onChangeDescription}
        value={description}
      />
      <ModalSubmitBtn onClick={SubmitEdit}>생성</ModalSubmitBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverTitle = styled.input`
  width: 150px;
  height: 1.5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.point};
  margin: 1rem;
  margin-top: 0rem;
`;

const CoverDescription = styled.textarea`
  width: 150px;
  height: 5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.point};
`;

const DesP = styled.p`
  align-self: flex-start;
  font-size: 6px;
  color: ${({ theme }) => theme.color.hover};
  margin-left: 1rem;
`;

const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalSubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.buttonText};
  width: 8rem;
  height: 2rem;
  font-size: 1rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  &:hover {
    background-color: #8385ff;
    border: 0.1rem solid #8385ff;
  }
`;

const RadioDiv = styled.div<{ active: boolean }>`
  input[type="radio"] {
    display: none;
  }
  background: ${({ active, theme }) => {
    if (active) {
      return theme.color.hover;
    }
  }};
  margin: 0.5rem;
  width: 60px;
  border: 1.5px solid;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.color.hover};
  :hover {
    color: ${({ theme }) => theme.color.point};
  }
  padding: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  span {
    cursor: pointer;
  }
`;

const SelectGenre = styled.select``;

const OptionGenre = styled.option``;

const ImgUploadBtn = styled.img`
  width: 148px;
  height: 222px;
  object-fit: contain;
  &:hover {
    opacity: 80%;
  }
`;

const ImgUploadLabel = styled.label`
  /* border: 0.15rem solid #4D4D4D;
  border-radius: 1.5rem; */
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;

const RelativeP = styled.p`
  position: absolute;
  font-size: 13px;
  font-weight: 800;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  /* mix-blend-mode: difference; */
`;

const ImgUploadInput = styled.input`
  display: none;
  /* float: left; */
`;

const ImgDelBtn = styled.button`
  color: ${({ theme }) => theme.color.point};
  &:hover {
    color: ${({ theme }) => theme.color.hover};
  }
`;

export default CreateNewNovel;
