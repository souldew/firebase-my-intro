"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCookies } from "react-cookie";

const About = () => {
  const [cookie, _setCookie] = useCookies();
  return (
    <>
      <div>test</div>
    </>
  );
};

export default About;
