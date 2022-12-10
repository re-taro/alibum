import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./init";

export const createStoregeRef = (filename: string, uuid: string) =>
  ref(storage, `images/${uuid}/${filename}`);

export const uploadImage = async (image: File, uuid: string) => {
  const fileRef = await uploadBytes(
    createStoregeRef(image.name, uuid),
    image,
  ).then((snapshot) => snapshot.ref);

  return fileRef;
};
