"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

interface Info {
  email: string;
  id: string;
}

export default function signUp() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [info, setInfo] = useState<Info | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log(data);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await signInWithEmailAndPassword(auth, data.email, data.password);
      // console.log(foo.user.uid);
      // alert(`ログイン成功\n${foo.user.uid}`);
      // setCookie("uid", foo.user.uid);
      router.push("/about");
      return;
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    }
  };
  return (
    <>
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
                <button>register</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-green-100">footer</footer>
    </>
  );
}
