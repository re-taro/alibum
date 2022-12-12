import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getMenuList, StoreMenuList } from "../libs/firebase/store";

export const useStoreMenuList = (
  uuid: string,
): [StoreMenuList, Dispatch<SetStateAction<StoreMenuList>>, boolean] => {
  const [storeList, setListState] = useState<StoreMenuList>([]);
  const [isLoading, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!uuid) {
        const list = await getMenuList(uuid);
        setListState(list);
        setLoadingState(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storeList, setListState, isLoading];
};
