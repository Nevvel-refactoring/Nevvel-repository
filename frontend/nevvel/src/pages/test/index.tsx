import { getAssets } from "@/src/api/assets";
import { useState } from "react";
import styled from "styled-components";

export default function Test() {
  const [assetType, setAssetType] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);

  const assetTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetType(event.target.value);
    console.log(event.target.value);
  };
  const tagsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
    console.log(event.target.value);
  };
  const pageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number(event.target.value));
    console.log(Number(event.target.value));
  };
  const sizeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
    console.log(Number(event.target.value));
  };
  const searchTypeypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
    console.log(event.target.value);
  };
  const sortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    console.log(event.target.value);
  };
  const onClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const res = await getAssets({
      assetType,
      tags,
      page,
      size,
      searchType,
      sort,
    });
    console.log(res);
  };

  return (
    <div>
      <Div>
        <label htmlFor="assetType">assetType</label>
        <input
          type="text"
          value={assetType}
          id="assetType"
          onChange={assetTypeHandler}
        />
        <label htmlFor="tags">tags</label>
        <input type="text" value={tags} id="tags" onChange={tagsHandler} />
        <label htmlFor="page">page</label>
        <input type="text" value={page} id="page" onChange={pageHandler} />
        <label htmlFor="size">size</label>
        <input type="text" value={size} id="size" onChange={sizeHandler} />
        <label htmlFor="searchType">searchType</label>
        <input
          type="text"
          value={searchType}
          id="searchType"
          onChange={searchTypeypeHandler}
        />
        <label htmlFor="sort">sort</label>
        <input type="text" value={sort} id="sort" onChange={sortHandler} />
      </Div>
      <button onClick={onClickHandler}>테스트</button>
    </div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
