import { useEffect } from "react";
import { useRouter } from "next/router";

function Logout() {
  const router = useRouter();
  useEffect(() => {
    router.push({ pathname: "/" });
  }, []);
}

export default Logout;
