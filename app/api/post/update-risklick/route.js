import { connectDB } from "@/app/components/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const risklickPost = await fetch("https://www.risklick.ch/api/v2/posts");
    const res = await risklickPost.json();
    const slug = res?.data?.[0].slug;
    const title = res?.data?.[0].title;
    const content = res?.data?.[0].body;
    const date = res?.data?.[0].date;
    const userId = 3;

    console.log("Slug: ", slug);
    const slugExists = await fetch(
      "http://localhost:3000/api/post/post-exists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }
    );
    const resSlug = await slugExists.json();
    if (resSlug.length > 0) {
      return NextResponse.json(resSlug);
    }
    const createPost = await fetch(
      "http://localhost:3000/api/post/create-post",
      {
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
      }
    );
    const resCreatePost = await createPost.json();
    return NextResponse.json(resCreatePost);
  } catch (e) {
    return e;
  }
}
