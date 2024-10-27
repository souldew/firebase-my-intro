"use client";

import { signin, signout } from "@/store/store";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Payload } from "@/types/types";

export function AuthListener({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload: Payload = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        };
        dispatch(signin(payload));
      } else {
        dispatch(signout());
      }
    });
    return () => unsubsribe();
  }, [dispatch]);

  return <>{children}</>;
}
