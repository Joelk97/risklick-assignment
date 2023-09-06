"use client";

import logo from "../../public/Risklick-Logo.png";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import bcrypt from "bcryptjs";
import { useRouter, redirect } from "next/navigation";

export default function Signup() {
  const signinRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const getUser = async () => {
    try {
      const resUserExists = await fetch("/api/auth/user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const user = await resUserExists.json();
      if (user.length < 1) {
        console.log(user?.[0].password);
        return;
      }
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return console.log("All fields are required");
    }
    try {
      const resUserExists = await fetch("/api/auth/user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const user = await resUserExists.json();
      if (user.length > 0) {
        console.error("User already exists");
        alert("User already registered");
        return;
      }
      const res = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/sign-in");
      } else {
        console.log("User registration failed", res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.main}>
      <Link href={`/`}>
        <Image alt="logo" width={64} height={64} src={logo} />
      </Link>
      <h1>Sign up to the blog</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
        ref={signinRef}
      >
        <div className={styles.flexColumn}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="name"
            id="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
        <button type="submit">Sign up</button>
        <Link href={`/sign-in`}>
          <span>Already registered? Then </span>
          <span style={{ textDecoration: "underline" }}>Sign-in</span>
        </Link>
      </form>
      <button onClick={() => getUser()}>GET USER</button>
    </div>
  );
}
