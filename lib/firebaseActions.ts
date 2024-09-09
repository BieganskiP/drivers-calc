import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const addEarningsData = async (earningsData: {
  carCost: number;
  fine: number;
  grossEarnings: number;
  lastWeekOfMonth: boolean;
  netEarnings: number;
  partnershipFee: number;
  cashCollected: number;
  result: number;
  total: number;
  totalTransfer: number;
  vat: number;
  vatRefund: number;
}) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is signed in");

    const earnings = {
      ...earningsData,
      createdAt: serverTimestamp(),
      userId: user.uid,
    };

    const docRef = await addDoc(
      collection(db as Firestore, "calculations"),
      earnings
    );

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const fetchUserEarnings = async (): Promise<Calculation[]> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is signed in");

    const earningsCollection = collection(db, "calculations");
    const q = query(earningsCollection, where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    const earnings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Calculation;
    });

    return earnings;
  } catch (e) {
    console.error("Error fetching earnings: ", e);
    return [];
  }
};

const deleteEarningsData = async (docId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is signed in");

    const docRef = doc(db, "calculations", docId);
    await deleteDoc(docRef);

    console.log(`Document with ID ${docId} deleted successfully`);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { addEarningsData, fetchUserEarnings, deleteEarningsData };
