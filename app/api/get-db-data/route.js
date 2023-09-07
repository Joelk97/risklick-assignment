import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectDB();
    const users = await conn.query("SELECT * FROM users");
    const posts = await conn.query("SELECT * FROM post");
    const comments = await conn.query("SELECT * FROM comment");
    const testUsers = await conn.query("SELECT * FROM testUsers");
    conn.end();
    const data = {
      users: users,
      posts: posts,
      comments: comments,
      testUsers: testUsers,
    };
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
