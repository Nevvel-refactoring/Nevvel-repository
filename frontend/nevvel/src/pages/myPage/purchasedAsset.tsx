import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { NextPageContext } from "next";
import Image from "next/image";
import styled from "styled-components";

import { loginAtom, userInfoAtom } from "@/src/store/Login";
import { NewvelApi } from "@/src/api";

import AssetCard from "@/src/components/common/AssetCard";
import { Modal } from "../../components/common/Modal";
import AssetDetailModal from "../../components/assetstore/AssetDetailModal";
import { NewvelApi } from "@/src/api";
import Image from "next/image";
import nevvel_m_dark from "../../assets/img/nevvel_m_dark.png";

interface Content {
  id: number;
  title: string;
  type: string;
  uploader: {
    id: number;
    nickname: string;
    profileImage: string;
  };
  thumbnail: string;
  url: string;
  price: number;
  downloadCount: number;
  isAvailable: boolean;
  tags: {
    id: number;
    tagName: string;
    useCount: number;
  }[];
}

interface Asset {
  content: Content[];
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

function purchasedAsset(props: { userDTO: string }) {
  const userDTO = props.userDTO === "" ? "" : JSON.parse(props.userDTO);
  const newUserInfo =
    userDTO === ""
      ? undefined
      : {
          id: userDTO.id,
          nickname: userDTO.nickname,
          profileImage: userDTO.profileImage,
          point: userDTO.point,
        };

  // 쿠키 상태 관리
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
  useEffect(() => {
    setLoginStatus(userDTO === "" ? false : true);
    setUserInfoStatus(newUserInfo);
  }, []);

  // 로그아웃 상태인 경우 메인페이지로 리다이렉트
  // 로그인 상태인 경우 axios 요청
  const router = useRouter();
  const [purchasedAsset, setPurchasedAsset] = useState<Asset | undefined>(
    undefined
  );
  useEffect(() => {
    const getPurchasedAssets = async () => {
      const res = await NewvelApi.purchasedAssets();
      // console.log(res.data);
      setPurchasedAsset(res.data);
    };
    // if (!loginStatus) {
    //   router.push({ pathname: "/" });
    // } else {
    getPurchasedAssets();
    // }
  }, []);

  // 에셋 디테일 모달 오픈 트리거
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 에셋 디테일로 열리는 에셋의 key값
  const [openModalData, setOpenModalData] = useState<Content>({
    id: 0,
    title: "",
    type: "",
    thumbnail: "",
    url: "",
    price: 0,
    downloadCount: 0,
    isAvailable: false,
    tags: [
      {
        id: 0,
        tagName: "",
        useCount: 0,
      },
    ],
    uploader: {
      id: 0,
      nickname: "",
      profileImage: "",
    },
  });

  // 모달의 모달이 어떻게 나올지 결정해주는 인자
  const [modalStarter, setModalStarter] = useState<boolean>(true);

  const [axiosReloader, setAxiosReloaer] = useState<boolean>(false);

  return (
    <Wrapper>
      <AssetTop>구매한 에셋</AssetTop>
      {purchasedAsset?.empty ? (
        <AssetEmptyWrapper>
          <ImageWrapper>
            <Image
              src={nevvel_m_dark}
              alt="구매한 에셋이 존재하지 않습니다."
              width={300}
              height={300}
            />
          </ImageWrapper>
          <AssetEmpty>구매한 에셋이 존재하지 않습니다.</AssetEmpty>
        </AssetEmptyWrapper>
      ) : (
        <AssetExists>
          {purchasedAsset?.content.map((asset, index: number) => {
            return (
              <AssetCard
                key={index}
                AssetData={asset}
                id={asset.id}
                title={asset.title}
                type={asset.type}
                thumbnail={asset.thumbnail}
                url={asset.url}
                tags={asset.tags}
                setModalOpen={setModalOpen}
                setOpenModalData={setOpenModalData}
              />
            );
          })}
        </AssetExists>
      )}
      {/* 모달 */}
      {modalOpen ? (
        <Modal
          modal={modalOpen}
          setModal={setModalOpen}
          width="800"
          height="710"
          element={
            <AssetDetailModal
              openModalData={openModalData}
              setModalOpen={setModalOpen}
              modalStarter={modalStarter}
              setAxiosReloaer={setAxiosReloaer}
            />
          }
        />
      ) : null}
    </Wrapper>
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
  return {
    props: {
      userDTO: userDTOcookie,
    },
  };
}

export default purchasedAsset;

const Wrapper = styled.div``;

const AssetTop = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 800;
`;

const AssetEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AssetEmpty = styled.div`
  position: absolute;
  margin-top: 5rem;
`;

const ImageWrapper = styled.div`
  margin-top: 2rem;
  opacity: 0.3;
`;

const AssetExists = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10%;
  margin-right: 10%;
`;
