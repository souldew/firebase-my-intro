// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import Login from "./login/page";

export default function Home() {
  return <Login />;
  // return <Login />;
  // const [snapshot, setSnapshot] = useState<DocumentData[] | undefined>(
  //   undefined
  // );
  // useEffect(() => {
  //   (async () => {
  //     const snapshot = await getDocs(
  //       collection(firestore, "test-cloud-firestore")
  //     );
  //     const snap = await snapshot.docs.map((doc) => {
  //       return { ...doc.data() };
  //     });
  //     setSnapshot(snap);
  //     console.log(snap);
  //   })();
  // }, []);
  // return (
  //   <>
  //     {snapshot ? (
  //       <>
  //         {snapshot.map((item: DocumentData, i: number) => {
  //           return <div key={i}>{item.hoge}</div>;
  //         })}
  //       </>
  //     ) : (
  //       <div>Loading...</div>
  //     )}
  //   </>
  // );
}
