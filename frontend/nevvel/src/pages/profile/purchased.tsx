import { useRouter } from "next/router";
import React, { useEffect } from "react";

function purchased() {
  const { query } = useRouter();

  const router = useRouter();
  useEffect(() => {
    if (query.imp_success === "true") {
      const impNum = query.imp_uid;
      const midNum = query.merchant_uid;
      console.log(impNum, midNum);
    } else {
      router.push("/profile/purchase");
    }
  }, []);
  return <div>purchased</div>;
}

export default purchased;
