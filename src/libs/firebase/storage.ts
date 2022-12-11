import { ref, uploadBytes } from "firebase/storage";
import type { StorageReference, UploadMetadata } from "firebase/storage";
import { storage } from "./init";

export const createStoregeRef = (
  filename: string,
  index: number,
  uuid: string,
): StorageReference => ref(storage, `images/${uuid}/${filename}_${index}`);

export const uploadImage = (
  imageFile: File,
  imageIndex: number,
  uuid: string,
): Promise<StorageReference> => {
  const meta: UploadMetadata = {
    cacheControl: "public,max-age=300",
  };
  const fileRef = uploadBytes(
    createStoregeRef(imageFile.name, imageIndex, uuid),
    imageFile,
    meta,
  ).then((snapshot) => snapshot.ref);
  return fileRef;
};
