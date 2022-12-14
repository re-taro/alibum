import type { StorageReference, UploadMetadata } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./init";

export const createStoregeRef = (
  fileName: string,
  uuid: string,
): StorageReference =>
  ref(storage, `images/${uuid}/${fileName}_${crypto.randomUUID()}`);

export const uploadImage = (
  imageFile: File,
  uuid: string,
): Promise<StorageReference> => {
  const meta: UploadMetadata = {
    cacheControl: "public,max-age=300",
  };
  return uploadBytes(
    createStoregeRef(imageFile.name, uuid),
    imageFile,
    meta,
  ).then((snapshot) => snapshot.ref);
};
