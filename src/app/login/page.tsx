"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { RootState, signin } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Payload } from "@/types/types";
import useUserDatabase from "@/firebase/useUserDatabase";

interface User {
  email: string;
  password: string;
}

interface Info {
  email: string;
  id: string;
}

export default function Login() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { dbRef, addNewData } = useUserDatabase();
  const [cookie, setCookie] = useCookies();
  const [info, setInfo] = useState<Info | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log("email password", data);
    try {
      const foo = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const payload: Payload = {
        uid: foo.user.uid,
        email: foo.user.email,
        name: foo.user.displayName,
      };
      dispatch(signin(payload));
      // console.log(foo.user.displayName);
      // alert(`ログイン成功\n${foo.user.uid}`);
      // setCookie("uid", foo.user.uid);
      console.log(user.uid);
      // addNewData();
      // router.push("/about");
      return;
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      addNewData();
    }
  }, [user]);
  return (
    <>
      <Link href="/about">About</Link>
      <main className="flex flex-col">
        <div className="mt-auto mb-auto  bg-green-200 justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-1 justify-center items-center">
              <label>
                メールアドレス
                <input type="email" {...register("email")} />
              </label>
              <label>
                パスワード
                <input type="password" {...register("password")} />
              </label>
              <div className="flex gap-x-4">
                <button>Submit</button>
                <Link href="/sign-up">新規登録</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-green-100">footer</footer>
    </>
  );
}
