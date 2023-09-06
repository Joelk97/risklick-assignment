import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectDB();
    const response = await conn.query("SELECT id, name, email FROM users");

    conn.end();
    return NextResponse.json(response);
  } catch (e) {
    console.log("Error: ", e);
  }
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
