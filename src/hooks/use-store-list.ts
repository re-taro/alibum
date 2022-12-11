import { getList, StoreList } from "libs/firebase/store";
import { useState, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useStoreList = (
  uuid: string,
): [StoreList, Dispatch<SetStateAction<StoreList>>, boolean] => {
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
