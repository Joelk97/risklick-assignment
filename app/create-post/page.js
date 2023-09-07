"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import moment from "moment";
import slugify from "../components/slugify";

export default function CreatePost() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setUserEmail(session?.user.email);
    setUserId(session?.user.image);
    setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !userId || !date) {
      return alert("Fill all fields please");
    }
    const slug = slugify(title, "-");
    try {
      const res = await fetch("/api/post/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          content,
          userId,
          slug,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/dashboard");
      } else {
        console.log(res);
        alert("Publishing failed");
      }
    } catch (e) {
      console.log("Catch error on page:", e);
    }
  };
  return (
    <div className={styles.main}>
      <h1>Create new post</h1>
      {console.log(userId)}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
          name="title"
        ></input>
        {console.log(userId, userEmail)}
        <label htmlFor="content">Content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          id="content"
          name="content"
        ></textarea>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
