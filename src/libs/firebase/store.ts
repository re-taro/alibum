import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { db } from "./init";
import { uploadImage } from "./storage";

export type CreateStoreMenuListItem = {
  name: string;
  date: string;
  title: string;
};

export type StoreMenuListItem = {
  name: string;
  date: string;
  id: string;
};

export type StoreMenuList = StoreMenuListItem[];

export type StoreCardListItem = {
  text: string;
  imageRef?: string;
  createdAt: Date;
};

export type CreateStoreCardListItem = {
  text: string;
  imageFile?: File;
};

export type StoreCardList = StoreCardListItem[];

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
  getDocs(ref).then((snapshot) =>
    snapshot.forEach((docs) =>
      list.push({
        name: docs.data().name,
        date: docs.data().date,
        id: docs.data().id,
      }),
    ),
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
  await getDocs(ref).then((snapshot) =>
    snapshot.forEach((docs) =>
      list.push({
        text: docs.data().text,
        imageRef: docs.data().date,
        createdAt: docs.data().createdAt.toDate(),
      }),
    ),
  );

  list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return list;
};
