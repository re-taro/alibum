import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  query,
} from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { db } from "./init";
import { uploadImage } from "./storage";

export type CreateStoreListItem = {
  name: string;
  date: string;
  title: string;
  imageFile: File;
};
export type StoreListItem = {
  name: string;
  date: string;
  title: string;
  imageref?: string;
};
export type StoreList = StoreListItem[];

// Listへの参照を返す
export const getListRef = (uuid: string): CollectionReference<DocumentData> =>
  collection(db, "Users", uuid, "List");

// Listに要素を追加する
export const createList = async (
  uuid: string,
  data: CreateStoreListItem,
): Promise<void> => {
  const storeData: StoreListItem = { ...data };

  if (data.imageFile) {
    storeData.imageref = await uploadImage(data.imageFile, uuid).then((ref) =>
      getDownloadURL(ref),
    );
  }

  addDoc(getListRef(uuid), {
    data,
  });
};

// List全取得
export const getList = async (uuid: string): Promise<StoreList> => {
  const ref = query(getListRef(uuid));
  const list: StoreList = [];
  getDocs(ref).then((snapshot) =>
    snapshot.forEach((doc) => list.push(doc.data() as StoreListItem)),
  );

  return list;
};
