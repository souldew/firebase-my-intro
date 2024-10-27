"use client";

import useUserDatabase from "@/firebase/useUserDatabase";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserDataComponent2 = () => {
  const { userData } = useUserDatabase();
  const user = useSelector((state: RootState) => state.user);

  if (user.uid === undefined) {
    return <p>Loading...</p>;
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
