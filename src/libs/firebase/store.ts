import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { db } from "./init";
import { uploadImage } from "./storage";
import type {
  CreateStoreCardListItem,
  CreateStoreMenuListItem,
  StoreCardList,
  StoreCardListItem,
  StoreMenuList,
  StoreMenuListItem,
} from "./types";

export const getMenuListRef = (uuid: string): CollectionReference =>
  collection(db, "Users", uuid, "List");

export const getCardListRef = (
  uuid: string,
  listId: string,
): CollectionReference => collection(db, "Users", uuid, "List", listId, "Card");

export const createMenuListItem = async (
  uuid: string,
  data: CreateStoreMenuListItem,
): Promise<StoreMenuListItem> => {
  const res = await addDoc(getMenuListRef(uuid), data);

  await updateDoc(doc(db, "Users", uuid, "List", res.id), { id: res.id });

  return {
    name: data.name,
    date: data.date,
    id: res.id,
  };
};

// List全取得
export const getMenuList = async (uuid: string): Promise<StoreMenuList> => {
  const ref = query(getMenuListRef(uuid));
  const list: StoreMenuList = [];
  // TODO:pushの計算量的に変えるかもしれない
  const docsRef = await getDocs(ref);
  docsRef.forEach((docs) =>
    list.push({
      name: docs.data().name,
      date: docs.data().date,
      id: docs.data().id,
    }),
  );

  return list;
};

export const createCardListItem = async (
  uuid: string,
  listId: string,
  data: CreateStoreCardListItem,
): Promise<StoreCardListItem> => {
  const { text, imageFile } = data;
  const storeData: StoreCardListItem = { text, createdAt: new Date() };

  if (imageFile) {
    const ref = await uploadImage(imageFile, uuid);
    const imageRef = await getDownloadURL(ref);
    storeData.imageRef = imageRef;
  }

  await addDoc(getCardListRef(uuid, listId), storeData);

  return storeData;
};

export const getCardList = async (
  uuid: string,
  listId: string,
): Promise<StoreCardList> => {
  const ref = query(getCardListRef(uuid, listId));
  const list: StoreCardList = [];
  // TODO:pushの計算量的に変えるかもしれない
  const docRef = await getDocs(ref);

  docRef.forEach((docs) =>
    list.push({
      text: docs.data().text,
      imageRef: docs.data().imageRef,
      createdAt: docs.data().createdAt.toDate(),
    }),
  );

  list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return list;
};

export const getInfo = async (uuid: string, listid: string) => {
  const ref = doc(db, "Users", uuid, "List", listid);
  const docRef: DocumentData = await getDoc(ref);

  return docRef.data();
};
