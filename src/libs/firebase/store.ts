import { addDoc, collection, getDocs, query } from "firebase/firestore";
import type { DocumentData, CollectionReference } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { db } from "./init";
import { uploadImage } from "./storage";

export type ImageInfo = {
  imageFile: File;
  imageIndex: number;
};

export type CreateStoreMenuListItem = {
  name: string;
  date: string;
  title: string;
};
export type StoreMenuListItem = {
  name: string;
  date: string;
  title: string;
};

export type StoreMenuList = StoreMenuListItem[];

export type StoreCardListItem = {
  text: string;
  imageref?: string;
};

export type CreateStoreCardListItem = {
  text: string;
  imageData?: ImageInfo;
};

export type StoreCardList = StoreCardListItem[];

// Listへの参照を返す
export const getMenuListRef = (
  uuid: string,
): CollectionReference<DocumentData> => collection(db, "Users", uuid, "List");

export const getCardListRef = (
  uuid: string,
  listId: string,
): CollectionReference<DocumentData> =>
  collection(db, "Users", uuid, "List", listId, "Cards");

// Listに要素を追加する
export const createMenuListItem = async (
  uuid: string,
  data: CreateStoreMenuListItem,
): Promise<StoreMenuListItem> => {
  const { name, date, title } = data;
  const storeData: StoreMenuListItem = { name, date, title };

  addDoc(getMenuListRef(uuid), {
    storeData,
  });

  return storeData;
};

// List全取得
export const getMenuList = async (uuid: string): Promise<StoreMenuList> => {
  const ref = query(getMenuListRef(uuid));
  const list: StoreMenuList = [];
  // TODO:pushの計算量的に変えるかもしれない
  getDocs(ref).then((snapshot) =>
    snapshot.forEach((doc) => list.push(doc.data() as StoreMenuListItem)),
  );

  return list;
};

export const createCardListItem = async (
  uuid: string,
  listId: string,
  data: CreateStoreCardListItem,
): Promise<StoreCardListItem> => {
  const { text, imageData } = data;
  const storeData: StoreCardListItem = { text };

  if (imageData?.imageFile && imageData.imageIndex) {
    uploadImage(imageData.imageFile, imageData.imageIndex, uuid)
      .then((ref) => getDownloadURL(ref))
      .then((imageref) => {
        storeData.imageref = imageref;
      });
  }

  addDoc(getCardListRef(uuid, listId), storeData);

  return storeData;
};

export const getCardList = async (uuid: string): Promise<StoreCardList> => {
  const ref = query(getMenuListRef(uuid));
  const list: StoreCardList = [];
  // TODO:pushの計算量的に変えるかもしれない
  getDocs(ref).then((snapshot) =>
    snapshot.forEach((doc) => list.push(doc.data() as StoreCardListItem)),
  );

  return list;
};
