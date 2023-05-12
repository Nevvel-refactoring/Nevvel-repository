import { loginAtom, isUserAtom } from "@/src/store/Login";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";


// 받아올 때 string으로 받아와지기 때문에
// getServerSideProps에서 true인 경우 "true"
// false인 경우 ""의 형태로 받아와 실제 적용할 때 Boolean 적용
function LoginRedirect(props: { loginStatus: string; isUserStatus: string }) {
  const [loginStatus, setLoginStatus] = useAtom(loginAtom);
  const [isUserStatus, setIsUserStatus] = useAtom(isUserAtom);
  useEffect(() => {
    // console.log("store 변경");
    setLoginStatus(Boolean(props.loginStatus));
    setIsUserStatus(Boolean(props.isUserStatus));
  }, []);

  const router = useRouter();
  useEffect(() => {
    // console.log("router 변경");
    if (props.loginStatus && props.isUserStatus) {
      // console.log("TT");
      router.push({ pathname: `/` });
    } else if (props.loginStatus && !props.isUserStatus) {
      // console.log("TF");
      router.push({ pathname: `/profile` });
    } else {
      // console.log("FF");
      router.push({ pathname: `/` });
    }
  }, [loginStatus, isUserStatus]);

  return (
    <Wrapper>
      <Wrapper>props.loginStatus : {props.loginStatus}</Wrapper>
      <Wrapper>loginStatus : {loginStatus}</Wrapper>
      <Wrapper>---------</Wrapper>
      <Wrapper>props.isUserStatus : {props.isUserStatus}</Wrapper>
      <Wrapper>isUserStatus : {isUserStatus}</Wrapper>
    </Wrapper>
  );
}

export async function getServerSideProps(context: {
  query: { login: string; isuser: string };
}) {
  // login 상태 받아오기
  let login = "";
  if (context.query.login == "true") {
    login = "true";
  }
  // user 상태 받아오기
  let isUser = "";
  if (context.query.isuser == "true") {
    isUser = "true";
  }
  return {
    props: {
      loginStatus: login,
      isUserStatus: isUser,
    },
  };
}

export default LoginRedirect;

const Wrapper = styled.div``;
