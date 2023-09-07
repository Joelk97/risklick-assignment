"use client";

import logo from "../../public/Risklick-Logo.png";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const signinRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // sign in with next-auth function
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        alert("Invalid credentials or user does not exists");
        return;
      }
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.main}>
      <Link href={`/`}>
        <Image alt="logo" width={64} height={64} src={logo} />
      </Link>
      <h1>Sign in to the blog</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
        ref={signinRef}
      >
        <div className={styles.flexColumn}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={styles.flexColumn}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">Sign in</button>
        <Link href={`/sign-up`}>
          <span>Not yet registered? Then </span>
          <span style={{ textDecoration: "underline" }}>Sign-up</span>
        </Link>
      </form>
    </div>
  );
}
