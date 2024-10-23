import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, firestore } from "./firebase"; // 上で作成したfirebase.tsからimport
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from "firebase/firestore";

const useUserDatabase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dbRef, setDbRef] = useState<DocumentReference | null>(null);

  useEffect(() => {
    console.log("called useUserDatabase");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // ユーザーが存在する場合、特定のデータベースを選択
        const isAdmin = currentUser.email === "admin@example.com";

        if (isAdmin) {
          // setDbRef(collection(firestore, "adminData")); // Firestoreのadmin用データ
        } else {
          setDbRef(doc(firestore, "test-cloud-firestore", currentUser.uid)); // Firestoreの通常ユーザーデータ
        }
      } else {
        setDbRef(null); // 認証されていない場合
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, dbRef };
};

export default useUserDatabase;
