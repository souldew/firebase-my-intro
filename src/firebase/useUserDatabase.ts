import { useEffect, useState } from "react";
import { firestore } from "./firebase"; // 上で作成したfirebase.tsからimport
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useUserDatabase = () => {
  // const [user, setUser] = useState<User | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<DocumentData | undefined | null>(
    undefined
  );

  const addNewData = async () => {
    try {
      const newData = {
        hoge: "test-data-hogehoge2024:10-27T21",
      };
      console.log("user.uid test", user.uid);
      const docRef = doc(firestore, "test-cloud-firestore", user.uid!);
      await setDoc(docRef, newData, { merge: true });
      console.log("addNewData successfully");
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.uid) {
        return;
      }
      try {
        const docRef = doc(firestore, "test-cloud-firestore", user.uid!);
        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.log("userUserDatabase fetchUserData Error");
      }
    };
    fetchUserData();
  }, [user]);

  return { userData, addNewData };
};

export default useUserDatabase;
