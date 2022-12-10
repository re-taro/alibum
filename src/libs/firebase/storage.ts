import {
  ref,
  StorageReference,
  uploadBytes,
  UploadMetadata,
} from "firebase/storage";
import { storage } from "./init";

export const createStoregeRef = (
  filename: string,
  uuid: string,
): StorageReference => ref(storage, `images/${uuid}/${filename}`);

export const uploadImage = (
  image: File,
  uuid: string,
  meta: UploadMetadata,
): Promise<StorageReference> => {
  const fileRef = uploadBytes(
    createStoregeRef(image.name, uuid),
    image,
    meta
  ).then((snapshot) => snapshot.ref);

  return fileRef;
};
