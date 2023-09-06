import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectDB();
    const response = await conn.query(
      "select comment.commentID, comment.commentText, comment.createdAt, users.name, comment.postId from comment JOIN users ON comment.authorId = users.id"
    );
    conn.end();
    return NextResponse.json(response);
  } catch (e) {
    console.log("Error: ", e);
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
