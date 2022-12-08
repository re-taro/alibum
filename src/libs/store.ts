import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db, StoreList } from "./firebase";

export const getListRef = (uuid: string) =>
  collection(db, "Users", uuid, "List");

export const createList = async (uuid: string, name: string) => {
  await addDoc(getListRef(uuid), {
    name,
  });
};

export const getList = async (uuid: string) => {
  const ref = query(getListRef(uuid));

  const listSnapShot = await getDocs(ref);

  const list: StoreList = [];
  listSnapShot.forEach((doc) => list.push({ name: doc.data().name }));

  return list;
};
