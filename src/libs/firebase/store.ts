import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { db } from "./init";
import { uploadImage } from "./storage";
import type { CreateStoreCardListItem, CreateStoreMenuListItem, StoreCardListItem, StoreMenuListItem } from "./types";


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

