import { NextPageContext } from "next";
import { loginAtom, userInfoAtom } from "../store/Login";
import { useAtom } from "jotai";
import { useEffect } from "react";
import NovelSwiper from "../components/main/NovelSwiper";
import BestDetails from "../components/main/BestDetails";
import AssetSwiper from "../components/main/AssetSwiper";
import axios from "axios";
import styled from "styled-components";
import springApi from "@/src/api";
import DummyAssetData_audio from "@/src/components/assetstore/DummyAssetData_Audio.json";
import DummyAssetData_image from "@/src/components/assetstore/DummyAssetData_Image.json";
import { ImageAssetAtom,AudioAssetAtom } from "@/src/store/EditorAssetStore";

interface Novel {
  content: {
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
  }[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export default function Home(props: { userDTO: string; content: Novel }) {
  // console.log(props.userDTO);
  const userDTO = props.userDTO === "" ? "" : JSON.parse(props.userDTO);
  const newUserInfo =
    userDTO === ""
      ? undefined
      : {
          id: userDTO.id,
          nickname: userDTO.nickname,
          profileImage: userDTO.profileImage,
          // description: userDTO.description,
          point: userDTO.point,
        };
  // console.log(userDTO);
  // console.log(userDTO.id);
  // console.log(userDTO.nickname);
  // console.log(userDTO.profileImage);
  // console.log(userDTO.description);
  // console.log(userDTO.point);

  // 쿠키 상태 관리
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
  useEffect(() => {
    setLoginStatus(userDTO === "" ? false : true);
    setUserInfoStatus(newUserInfo);
    return (()=>{
      // if (loginStatus){
        getAssetImgData();
        getAssetAudioData();
      // }
    })
  }, []);
  const [assetImageData, setAssetImageData] = useAtom(ImageAssetAtom);
  const [assetAudioData, setAssetAudioData] = useAtom(AudioAssetAtom);
  useEffect(()=>{
    console.log("assetImageData",assetImageData)
    console.log("assetAudioData",assetAudioData)
  },[assetImageData,assetAudioData])


  
  // 이미지 get 요청 
  const getAssetImgData = async () => {
    try{
      const res = await springApi.get(
        "assets/purchased-on?assettype=IMAGE&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetImageData(res.data.content);
    }}catch(error){
      console.log(error)
      setAssetImageData(DummyAssetData_image.content)
    }
  };
  // 오디오 get 요청 
  const getAssetAudioData = async () => {
    try{
      const res = await springApi.get(
        "assets/purchased-on?assettype=AUDIO&page=1&size=10&sort=createdDateTime"
      );
      if (res) {
        console.log(res);
        setAssetAudioData(res.data.content);
      }
    }catch(error){
      console.log(error)
      setAssetAudioData(DummyAssetData_audio.content)
    }
  };
  

  
  // console.log(loginStatus);
  // console.log(userInfoStatus);

  return (
    <HomeWrapper>
      <DetailWrapper>
        <BestDetails title="베스트 콘텐츠" more="/novels" />
        <NovelSwiper content={props.content} />
      </DetailWrapper>
      <Line />
      <DetailWrapper>
        <BestDetails title="베스트 에셋" more="/assetstore/assetstore" />
        <AssetSwiper />
      </DetailWrapper>
    </HomeWrapper>
  );
}

// 쿠키 확인
export async function getServerSideProps({ req }: NextPageContext) {
  const cookies =
    req && req.headers && req.headers.cookie ? req.headers.cookie : "";
  const cookie = decodeURIComponent(cookies);
  // 쿠키를 ; 기준으로 나누어 그 중 userDto가 존재하는지 확인
  const parts = cookie.split("; ");
  let userDTOcookie = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("userDto=")) {
      userDTOcookie = parts[i].substring("userDto=".length);
      break;
    }
  }

  let novels = undefined;
  try {
    const res = await axios.get("http://k8d1061.p.ssafy.io/api/covers");
    novels = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      userDTO: userDTOcookie,
      content: novels,
    },
  };
}

const HomeWrapper = styled.div`
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

const DetailWrapper = styled.div``;

const Line = styled.hr`
  width: 82%;
`;
