import { withRouter, NextRouter } from "next/router";
import { useEffect, ReactNode } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/src/store/Theme";
import { loginAtom, userInfoAtom } from "@/src/store/Login";

interface CustomRouterProps {
  children: ReactNode;
  router: NextRouter;
}

function CustomRouter({ children, router }: CustomRouterProps) {
  useEffect(() => {
    const localChangeTheme = localStorage.getItem("changeTheme");
    const localLoginStatus = localStorage.getItem("loginStatus");
    const localUserInfoStatus = localStorage.getItem("userInfoStatus");
    const [changeTheme, setChangeTheme] = useAtom(themeAtom);
    const [loginStatus, setLoginStatus] = useAtom(loginAtom);
    const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoAtom);
    // setChangeTheme(localChangeTheme);
    // setLoginStatus(localLoginStatus);
    // setUserInfoStatus(localUserInfoStatus);
    // console.log(localChangeTheme);
    // console.log(localLoginStatus);
    // console.log(localUserInfoStatus);
  }, [router.pathname]);

  return <>{children}</>;
}

export default withRouter(CustomRouter);
