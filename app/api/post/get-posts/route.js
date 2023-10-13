import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { search } = await req.json();
    const conn = await connectDB();
    // Get all posts and linked user
    const response = await conn.query(
      `SELECT post.slug, post.postId, post.title, post.createdAt, post.postText, users.name FROM post JOIN users ON post.authorId = users.id WHERE title LIKE '%${search}%' ORDER BY post.postId DESC`
    );
    conn.end();
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
