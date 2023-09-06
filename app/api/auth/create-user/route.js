import mariadb from "mariadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/components/connectDB";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await connectDB();
    console.log("connected");
    const response = await conn.query(
      `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`
    );
    console.log(response);
    conn.end();
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// 172.24.0.1
