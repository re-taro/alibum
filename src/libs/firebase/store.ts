import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import type { DocumentData, CollectionReference } from "firebase/firestore";
import { db } from "./init";
import { uploadImage } from "./storage";

export type ImageInfo = {
  imageFile: File;
  imageIndex: number;
};

export type CreateStoreListItem = {
  name: string;
  date: string;
  title: string;
  imageInfo?: ImageInfo;
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
  const { name, date, title, imageInfo } = data;
  const storeData: StoreListItem = { name, date, title };

  if (imageInfo?.imageFile && imageInfo.imageIndex) {
    uploadImage(imageInfo.imageFile, imageInfo.imageIndex, uuid)
      .then((ref) => getDownloadURL(ref))
      .then((imageref) => {
        storeData.imageref = imageref;
      });
  }

  addDoc(getListRef(uuid), {
    data,
  });
};

// List全取得
export const getList = async (uuid: string): Promise<StoreList> => {
  const ref = query(getListRef(uuid));
  const list: StoreList = [];
  // TODO:pushの計算量的に変えるかもしれない
  getDocs(ref).then((snapshot) =>
    snapshot.forEach((doc) => list.push(doc.data() as StoreListItem)),
  );

  return list;
};
