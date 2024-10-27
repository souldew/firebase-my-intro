"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

interface User {
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log(data);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password); // 自動ログイン

      router.push("/about");
      return;
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
        alert(err.message);
      }
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
