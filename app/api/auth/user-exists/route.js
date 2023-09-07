import { connectDB } from "@/app/components/connectDB";
import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const conn = await connectDB();
    // Search for user with email from fetch req
    const user = await conn.query(
      `SELECT id, password, email, name FROM users WHERE email = '${email}'`
    );
    /*console.log(user);*/
    conn.end();
    // Return query answer (empty array if there is not the user, array with id, pass, ... if user exists)
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
