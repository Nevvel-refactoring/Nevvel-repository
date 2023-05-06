import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function Novel() {
  const router = useRouter();
  useEffect(() => {
    router.push(
      {
        pathname: `/novels/genres`,
        query: { genre: 1, sort: "like", name: "전체" },
      },
      `novels/genres`
    );
  }, []);

  return;
}

export default Novel;
