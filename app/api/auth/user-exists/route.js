import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const conn = await connectDB();
    const user = await conn.query(
      `SELECT id, password, email, name FROM users WHERE email = '${email}'`
    );
    /*console.log(user);*/
    conn.end();
    return NextResponse.json(user);
  } catch (e) {
    console.log("Error: ", e);
  }
}
