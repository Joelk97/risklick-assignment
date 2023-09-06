import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectDB();
    const response = await conn.query(
      "SELECT post.postId, post.title, post.createdAt, post.postText, users.name FROM post JOIN users ON post.authorId = users.id ORDER BY post.postId DESC"
    );
    conn.end();
    return NextResponse.json(response);
  } catch (e) {
    console.log("Error: ", e);
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
