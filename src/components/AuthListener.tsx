"use client";

import { signin, signout } from "@/store/store";
import { auth } from "@/firebase/firebase";
import { setDefaultResultOrder } from "dns";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Payload } from "@/types/types";

export function AuthListener({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
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
