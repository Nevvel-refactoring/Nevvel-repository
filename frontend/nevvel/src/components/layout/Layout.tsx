import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Navigation from "./Navigation";
import Footer from "../common/Footer";

function Layout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (
      router.pathname === "/viewer/[id]" ||
      router.pathname === "/editor/[id]" ||
      router.pathname === "/editor/[id]/[eid]"
    ) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [router]);
  return (
    <Wrapper>
      {hidden ? <Navigation /> : null}
      <div>{props.children}</div>
      {hidden ? <Footer /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: auto;
  width: 100vw;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text1};
`;

export default Layout;
