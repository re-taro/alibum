import { getList, StoreList } from "libs/firebase/store";
import { useState, useCallback, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useStoreList = (
  uuid: string,
): [StoreList, Dispatch<SetStateAction<StoreList>>, boolean] => {
  const [storeList, setListState] = useState<StoreList>([]);
  const [isLoading, setLodingState] = useState<boolean>(true);

  const getListFn = useCallback(async () => {
    const list = await getList(uuid);
    setListState(list);
    setLoadingState(false);
  }, [uuid]);

  useEffect(() => {
    getListFn();
  }, [getListFn]);

  return [storeList, setListState, isLoading];
};
