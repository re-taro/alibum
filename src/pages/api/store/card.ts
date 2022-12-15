import type { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import type {
  StoreCardListItem,
  StoreCardList,
} from "../../../libs/firebase/types";

type Error = {
  message: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StoreCardList | StoreCardListItem | Error>,
) => {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert({
          projectId: process.env.TYPE,
          privateKey: process.env.PRIVATE_KEY,
          clientEmail: process.env.CLIENT_EMAIL,
        }),
      });
    }
    const db = getFirestore();

    // 一応残す
    // if (req.method === "POST") {
    //   const {
    //     query: { uuid, listid },
    //     body,
    //   } = req;

    //   if (!uuid) {
    //     throw new Error("クエリがない");
    //   }

    //   const colRef = db
    //     .collection("Users")
    //     .doc(uuid as string)
    //     .collection("List")
    //     .doc(listid as string)
    //     .collection("Cards");

    //   await colRef.add(body);

    //   return res.status(200).json(body);
    // }
    if (req.method === "GET") {
      const list: StoreCardList = [];
      const {
        query: { uuid, listid },
      } = req;

      if (!(uuid && listid)) {
        throw new Error("クエリがない");
      }

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

      list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

      return res.status(200).json(list);
    }

    return res.status(200);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
