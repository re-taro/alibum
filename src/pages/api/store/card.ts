import type { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { StoreCardList, StoreCardListItem } from "libs/firebase/store";
import serviceAccount from "../../../../hackU_admin.json";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StoreCardList | StoreCardListItem>,
) => {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });
    }
    const db = getFirestore();

    if (req.method === "POST") {
      const {
        query: { uuid, listid },
        body,
      } = req;

      const colRef = db
        .collection("Users")
        .doc(uuid as string)
        .collection("List")
        .doc(listid as string)
        .collection("Cards");

      await colRef.add(body);

      return res.status(200).json(body);
    }
    if (req.method === "GET") {
      const list: StoreCardList = [];
      const {
        query: { uuid, listid },
      } = req;

      const colRef = db
        .collection("Users")
        .doc(uuid as string)
        .collection("List")
        .doc(listid as string)
        .collection("Cards");

      await colRef
        .get()
        .then((snapshot) =>
          snapshot.forEach((doc) => list.push(doc.data() as StoreCardListItem)),
        );

      return res.status(200).json(list);
    }

    return res.status(200);
  } catch (e: any) {
    return res.status(500).json({ erorr: { message: e.message } });
  }
};
