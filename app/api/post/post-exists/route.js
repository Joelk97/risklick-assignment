import { connectDB } from "@/app/components/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug } = await req.json();
    const conn = await connectDB();
    console.log("connected");
    // Checks if there is a post with the req slug
    const data = await conn.query(`SELECT * FROM post WHERE slug = '${slug}'`);
    console.log(data);
    conn.end();
    console.log("Disconnected");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
