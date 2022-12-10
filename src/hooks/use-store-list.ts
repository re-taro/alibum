import { getList, StoreList } from "libs/firebase/store";
import { useState, useMemo } from "react";

export const useStoreList = (uuid: string) => {
  const [storeList, setListState] = useState<StoreList>([]);
  const [isLoading, setLodingState] = useState<boolean>(true);
  useMemo(() => {
    getList(uuid).then((res) => {
      setListState(res);
      setLodingState(false);
    });
  }, [uuid]);

  return [storeList, setListState, isLoading];
};