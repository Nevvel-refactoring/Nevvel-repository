import React,{useEffect, useState} from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { useRouter } from 'next/router';

function Layout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const [hidden, setHidden] =useState(true);

  useEffect(()=>{
    if(router.pathname ==='/viewer'||router.pathname ==='/editor'){
      setHidden(false)
    }
  },[router])
  return (
    <Wrapper>
      {hidden ? (
        <Navigation />
      ):(null)}
      <div>{props.children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100wh;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

export default Layout;
