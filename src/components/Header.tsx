"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <header className="bg-blue-300 flex justify-between">
        <div>Header</div>
        {user.uid && <div>{user.email}</div>}
      </header>
    </>
  );
};
