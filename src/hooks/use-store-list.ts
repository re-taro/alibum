import { useState, useCallback, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getMenuList, StoreMenuList } from "../libs/firebase/store";

export const useStoreMenuList = (
  uuid: string,
): [StoreMenuList, Dispatch<SetStateAction<StoreMenuList>>, boolean] => {
  const [storeList, setListState] = useState<StoreMenuList>([]);
  const [isLoading, setLoadingState] = useState<boolean>(true);

  const getListFn = useCallback(async () => {
    const list = await getMenuList(uuid);
    setListState(list);
    setLoadingState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeList]);

  useEffect(() => {
    getListFn();
  }, [getListFn]);

  return [storeList, setListState, isLoading];
};
