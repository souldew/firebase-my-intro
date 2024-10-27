// pages/index.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.uid !== null && user.uid !== undefined) {
      router.push("/about");
    } else if (user.uid === null) {
      router.push("/login");
    }
  }, [user, router]);

  return <p>loading...</p>;
}
