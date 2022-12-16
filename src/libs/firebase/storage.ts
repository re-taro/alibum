import type { StorageReference, UploadMetadata } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./init";

export const createStorageRef = (
  fileName: string,
  uuid: string,
): StorageReference =>
  ref(storage, `images/${uuid}/${fileName}_${crypto.randomUUID()}`);

export const uploadImage = (
  imageFile: File,
  uuid: string,
): Promise<StorageReference> => {
  const meta: UploadMetadata = {
    cacheControl: "public,max-age=86400",
  };
  return uploadBytes(
    createStorageRef(imageFile.name, uuid),
    imageFile,
    meta,
  ).then((snapshot) => snapshot.ref);
};
