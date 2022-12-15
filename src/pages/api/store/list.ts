import type { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { StoreMenuList, StoreMenuListItem } from "libs/firebase/store";
import serviceAccount from "../../../../hackU_admin.json";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StoreMenuList | StoreMenuListItem>,
) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  }
  const db = getFirestore();
  try {
    if (req.method === "POST") {
      const {
        query: { uuid },
        body,
      } = req;
      const docRef = db
        .collection("test")
        .doc(uuid as string)
        .collection("List");
      const refId = await docRef.add(body);

      const listRef = db
        .collection("test")
        .doc(uuid as string)
        .collection("List")
        .doc(refId.id);
      await listRef.update({ id: refId.id });

      return res.status(200).json({ id: refId.id, ...body });
    }

    if (req.method === "GET") {
      const list: StoreMenuList = [];
      const {
        query: { uuid },
      } = req;

      const colRef = db
        .collection("test")
        .doc(uuid as string)
        .collection("List");
      await colRef
        .get()
        .then((snapshot) =>
          snapshot.forEach((doc) => list.push(doc.data() as StoreMenuListItem)),
        );

      return res.status(200).json(list);
    }
    return res.status(200);
  } catch (e: any) {
    return res.status(500).json({ erorr: { message: e.message } });
  }
};
