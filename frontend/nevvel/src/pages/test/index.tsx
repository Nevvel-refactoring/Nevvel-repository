import { getAssets } from "@/src/api/assets";
import { useState } from "react";

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
      <input type="text" value={assetType} onChange={assetTypeHandler} />
      <input type="text" value={tags} onChange={tagsHandler} />
      <input type="text" value={page} onChange={pageHandler} />
      <input type="text" value={size} onChange={sizeHandler} />
      <input type="text" value={searchType} onChange={searchTypeypeHandler} />
      <input type="text" value={sort} onChange={sortHandler} />
      <button value="테스트" onClick={onClickHandler} />
    </div>
  );
}
