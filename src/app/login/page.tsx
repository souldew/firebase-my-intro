"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useEffect } from "react";
import Link from "next/link";
import { RootState, signin } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Payload } from "@/types/types";
import useUserDatabase from "@/firebase/useUserDatabase";
import { FirebaseError } from "firebase/app";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { addNewData } = useUserDatabase();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
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
      return;
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      addNewData();
    }
  }, [user, addNewData]);
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
