"use client";

import { auth } from "@/firebase/firebase";
import { RootState, signout } from "@/store/store";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(signout());
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <header className="bg-blue-300 flex justify-between">
        <div>Header</div>
        {user.uid && (
          <div className="flex gap-x-1">
            <div>{user.email}</div>
            <button onClick={handleSignOut} className="my-auto">
              SignOut
            </button>
          </div>
        )}
      </header>
    </>
  );
};
