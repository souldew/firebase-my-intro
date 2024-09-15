// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export default function Home() {
  const [snapshot, setSnapshot] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(
        collection(firestore, "test-cloud-firestore")
      );
      const snap = await snapshot.docs.map((doc) => {
        return { ...doc.data() };
      });
      setSnapshot(snap);
      console.log(snap);
    })();
  }, []);
  return (
    <>
      {snapshot ? (
        <>
          {snapshot.map((item: any) => {
            return <div>{item.hoge}</div>;
          })}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
