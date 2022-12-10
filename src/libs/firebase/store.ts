import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { CreateStoreListItem, db, StoreList, StoreListItem } from "./init";
import { uploadImage } from "./storage";

// Listへの参照を返す
export const getListRef = (uuid: string) =>
  collection(db, "Users", uuid, "List");

// Listに要素を追加する
export const createList = async (uuid: string, data: CreateStoreListItem) => {
  const storeData: StoreListItem = { ...data };

  if (data.imageFile) {
    storeData.imageref = await uploadImage(data.imageFile, uuid).then((ref) =>
      getDownloadURL(ref),
    );
  }

  await addDoc(getListRef(uuid), {
    data,
  });
};

// List全取得
export const getList = async (uuid: string) => {
  const ref = query(getListRef(uuid));

  const listSnapShot = await getDocs(ref);

  const list: StoreList = [];
  listSnapShot.forEach((doc) => list.push(doc.data() as StoreListItem));

  return list;
};
