"use client";

// import { SubmitHandler, useForm } from "react-hook-form";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useCookies } from "react-cookie";
// import { redirect, useRouter } from "next/navigation";

// const About = () => {
//   const router = useRouter();
//   const [cookie, _setCookie] = useCookies();
//   // 認証情報がなければloginページへ
//   if (!cookie?.uid) {
//     redirect("login");
//   }
//   return (
//     <>
//       <div>{cookie.uid}</div>
//     </>
//   );
// };

// export default About;

import { useEffect, useState } from "react";
import { getDoc, DocumentData } from "firebase/firestore";
import useUserDatabase from "../../firebase/useUserDatabase";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserDataComponent2 = () => {
  const { userData } = useUserDatabase();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (dbRef) {
  //       try {
  //         setLoading(true);
  //         const docSnapshot = await getDoc(dbRef); // Firestoreから個別データを取得
  //         if (docSnapshot.exists()) {
  //           setData(docSnapshot.data()); // 取得したデータを状態に保存
  //         } else {
  //           setData(null); // ドキュメントが存在しない場合
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         setError("データの取得中にエラーが発生しました");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [dbRef]);

  if (user.uid === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (user === null) {
    return (
      <>
        <p>ユーザーが認証されていません。</p>
        <Link href="/about">about</Link>
      </>
    );
  }

  return (
    <div>
      <h1>about2</h1>
      <h2>{user.email} のデータ</h2>
      {userData ? (
        <div>{JSON.stringify(userData)}</div>
      ) : (
        <p>データが存在しません。</p>
      )}
    </div>
  );
};

export default UserDataComponent2;
