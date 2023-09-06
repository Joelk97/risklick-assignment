import { NextResponse } from "next/server";
import mariadb from "mariadb";
import { connectDB } from "@/app/components/connectDB";

export async function POST(req) {
  try {
    const { comment, date, authorId, post } = await req.json();
    const conn = await connectDB();
    console.log("Connected");
    const response = await conn.query(
      `INSERT INTO comment (commentText, createdAt, authorId, postId) VALUES ('${comment}', '${date}', '${authorId}', '${post}')`
    );
    console.log(response);
    conn.end();
    return NextResponse.json({ message: "Post published" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
