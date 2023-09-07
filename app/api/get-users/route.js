import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // get all users in table users
    const conn = await connectDB();
    const response = await conn.query("SELECT id, name, email FROM users");

    conn.end();
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
