import { getList, StoreList } from "libs/firebase/store";
import { useState, useCallback, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useStoreList = (
  uuid: string,
): [StoreList, Dispatch<SetStateAction<StoreList>>, boolean] => {
  const [storeList, setListState] = useState<StoreList>([]);
  const [isLoading, setLoadingState] = useState<boolean>(true);

  const getListFn = useCallback(async () => {
    const list = await getList(uuid);
    setListState(list);
    setLoadingState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeList]);

  useEffect(() => {
    getListFn();
  }, [getListFn]);

  return [storeList, setListState, isLoading];
};
