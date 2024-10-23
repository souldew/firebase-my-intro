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

const UserDataComponent2 = () => {
  const { user, dbRef } = useUserDatabase();
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (dbRef) {
        try {
          setLoading(true);
          const docSnapshot = await getDoc(dbRef); // Firestoreから個別データを取得
          if (docSnapshot.exists()) {
            setData(docSnapshot.data()); // 取得したデータを状態に保存
          } else {
            setData(null); // ドキュメントが存在しない場合
          }
        } catch (err) {
          console.log(err);
          setError("データの取得中にエラーが発生しました");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [dbRef]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>ユーザーが認証されていません。</p>;
  }

  return (
    <div>
      <h1>about2</h1>
      <h2>{user.email} のデータ</h2>
      {data ? <div>{JSON.stringify(data)}</div> : <p>データが存在しません。</p>}
    </div>
  );
};

export default UserDataComponent2;
