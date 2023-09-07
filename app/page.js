"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "./globals.css";
import logo from "../public/Risklick-Logo.png";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import moment from "moment";

export default function Home() {
  const [risklickPost, setRisklickPost] = useState("");

  return (
    <main className={styles.main}>
      <Image alt="Logo" width={64} height={64} src={logo} />
      <h1>Welcome to the blog of Risklick</h1>

      <div className={styles.authContainer}>
        {/* Container for signin and signout button*/}
        {console.log(risklickPost)}
        <button>
          <Link href={`/dashboard`}>Go to the posts</Link>
        </button>
        <button>
          <Link href={`/sign-in`}>Sign in</Link>
        </button>
        <button>
          <Link href={`/sign-up`}>Sign up</Link>
        </button>
      </div>
    </main>
  );
}
