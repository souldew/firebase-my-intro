"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useUserDatabase from "@/firebase/useUserDatabase";

const UserDataComponent = () => {
  const { userData } = useUserDatabase();
  const user = useSelector((state: RootState) => state.user);

  if (user.uid === undefined) {
    return <p>Loading...</p>;
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
