// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import Login from "./login/page";
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
// }
