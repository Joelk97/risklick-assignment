import { NextResponse } from "next/server";
import mariadb from "mariadb";
import { connectDB } from "@/app/components/connectDB";

export async function POST(req) {
  try {
    const { title, date, content, userId, slug } = await req.json();
    const conn = await connectDB();

    // Create post linked to the logged in user
    const response = await conn.query(
      `INSERT INTO post (title, createdAt, postText, authorId, slug) VALUES ('${title}', '${date}', '${content}', '${userId}', '${slug}')`
    );
    console.log(response);
    conn.end();
    return NextResponse.json({ message: "Post published" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
