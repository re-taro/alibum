import { ref, StorageReference, uploadBytes } from "firebase/storage";
import { storage } from "./init";

export const createStoregeRef = (filename: string, uuid: string) : StorageReference=>
  ref(storage, `images/${uuid}/${filename}`);

export const uploadImage = (image: File, uuid: string) : Promise<StorageReference> => {
  const fileRef = uploadBytes(
    createStoregeRef(image.name, uuid),
    image,
  ).then((snapshot) => snapshot.ref);

  return fileRef;
};