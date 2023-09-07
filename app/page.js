"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "./globals.css";
import logo from "../public/Risklick-Logo.png";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image alt="Logo" width={64} height={64} src={logo} />
      <h1>Welcome to the blog of Risklick</h1>

      <div className={styles.authContainer}>
        {/* Container for signin and signout button*/}

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
