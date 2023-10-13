"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "../globals.css";
import logo from "../../public/Risklick-Logo.png";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import moment from "moment";
import Search from "../components/search";

export default function Dashboard({ searchParams }) {
  const search = searchParams.q ?? "";
  const { status, data: session } = useSession();
  const commentRef = useRef();
  const searchRef = useRef();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [posts, setPosts] = useState("");
  const [date, setDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState("");
  const [risklickPost, setRisklickPost] = useState("");
  useEffect(() => {
    // get actual date for comments
    setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  });
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3000/api/post/get-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    });
    const gettedData = await response.json();
    setPosts(gettedData);
    setLoaded(true);
  };
  useEffect(() => {
    // fetch all posts and set the to a state adn check if loaded
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/post/get-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      });
      const gettedData = await response.json();
      setPosts(gettedData);
      setLoaded(true);
    };
    // fetch all comment and set the to a state
    const fetchComments = async () => {
      const commentResponse = await fetch(
        "http://localhost:3000/api/post/get-comments"
      );
      const gettedComments = await commentResponse.json();
      setComments(gettedComments);
    };
    // call functions
    fetchPosts();
    fetchComments();

    // if comment is modified call this use effect to fetch data
  }, [commentRef]);
  // call api route to update risklick api blog
  const fetchRisklick = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/post/update-risklick",
        {
          method: "GET",
        }
      );
      const risklickData = await res.json();
      // set to a stato to console log and debug
      setRisklickPost(risklickData);
    } catch (e) {
      console.log(e);
    }
  };
  // fetch comment to database
  const publishComment = async (e) => {
    e.preventDefault();
    const authorId = session?.user.image;
    if (!comment || !date || !authorId || !post) {
      return alert("Missing information for publishing the comment");
    }
    try {
      const res = await fetch("http://localhost:3000/api/post/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          date,
          authorId,
          post,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        // after publishind the comment refetch posts and comments
        const fetchPosts = async () => {
          const response = await fetch(
            "http://localhost:3000/api/post/get-posts"
          );
          const gettedData = await response.json();
          setPosts(gettedData);
          setLoaded(true);
        };
        const fetchComments = async () => {
          const commentResponse = await fetch("/api/post/get-comments");
          const gettedComments = await commentResponse.json();
          setComments(gettedComments);
        };
        fetchPosts();
        fetchComments();
      } else {
        console.log(res);
        alert("Publishing failed");
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };
  return (
    <main className={styles.main}>
      <Image alt="Logo" width={64} height={64} src={logo} />
      {console.log(risklickPost)}
      <h1>Welcome to the blog of Risklick</h1>
      <div className={styles.authContainer}>
        {/* Container for signin and signout button*/}
        {status === "authenticated" ? (
          <button onClick={() => signOut()}>Logout {session?.user.name}</button>
        ) : (
          <button>
            <Link href={`/sign-in`}>Sign in</Link>
          </button>
        )}
        {status === "authenticated" && (
          <button>
            <Link href={`/create-post`}>Create new post</Link>
          </button>
        )}
        {status === "authenticated" && (
          <button onClick={fetchRisklick}>Update Risklick post</button>
        )}
      </div>
      {/* Check if user is authenticated, if not do not show the blog */}
      {status === "authenticated" ? (
        <div className={styles.postsContainer}>
          <h1 style={{ paddingLeft: "2rem" }}>Blog posts</h1>
          <Search ref={searchRef} />
          <button onClick={() => fetchPosts()}>Search</button>
          {loaded &&
            posts?.map((post) => {
              return (
                <div key={post.postId} id={post.postId} className={styles.post}>
                  <h2 title={post.slug}>{post.title}</h2>
                  <div className={styles.flexRow}>
                    <span>{post.createdAt}</span>
                    <span>Written by {post.name}</span>
                  </div>
                  <p>{post.postText}</p>
                  <div className={styles.comments}>
                    <div className={styles.flexColumn}>
                      {/* Get all comments and filter by post id, to show only the comments of the actual post */}
                      {loaded &&
                        comments.length > 0 &&
                        comments
                          .filter((e) => e.postId == post.postId)
                          .map((filtComment, i) => {
                            return (
                              <div key={i} className={styles.comment}>
                                <div className={styles.flexRow}>
                                  <span>{filtComment.name} commented on</span>
                                  <span>{filtComment.createdAt}</span>
                                </div>
                                <p>{filtComment.commentText}</p>
                              </div>
                            );
                          })}
                      <form
                        ref={commentRef}
                        onSubmit={publishComment}
                        className={styles.commentForm}
                      >
                        <div className={styles.flexColumn}>
                          <textarea
                            id="comment"
                            name="comment"
                            placeholder="Comment.."
                            onChange={(el) => {
                              setComment(el.target.value);
                              setPost(post.postId);
                            }}
                          ></textarea>
                          <button
                            type="submit"
                            className={styles.commentButton}
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <h1>You first have to sign in!</h1>
      )}
    </main>
  );
}
