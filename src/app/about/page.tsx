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
import { RootState, store } from "@/store/store";

const UserDataComponent = () => {
  const { userData } = useUserDatabase();
  const user = useSelector((state: RootState) => state.user);
  // const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       console.log("111", user);
  //       setLoading(false);
  //       console.log("hoho");
  //     }
  //   })();
  // }, [user]);

  if (user.uid === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (user.uid === null) {
    return <p>ユーザーが認証されていません。</p>;
  }

  return (
    <div>
      <h2>{user.email} のデータ</h2>
      {userData ? (
        <div>{JSON.stringify(userData)}</div>
      ) : (
        <p>データが存在しません。</p>
      )}
      <Link href="/about2">About2へ移動</Link>
    </div>
  );
};

export default UserDataComponent;
