import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, firestore } from "./firebase"; // 上で作成したfirebase.tsからimport
import { collection, CollectionReference } from "firebase/firestore";

const useUserDatabase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dbRef, setDbRef] = useState<CollectionReference | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // ユーザーが存在する場合、特定のデータベースを選択
        const isAdmin = currentUser.email === "admin@example.com";

        if (isAdmin) {
          setDbRef(collection(firestore, "adminData")); // Firestoreのadmin用データ
        } else {
          setDbRef(collection(firestore, "userData")); // Firestoreの通常ユーザーデータ
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
