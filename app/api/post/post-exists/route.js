import { connectDB } from "@/app/components/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug } = await req.json();
    const conn = await connectDB();
    console.log("connected");
    const data = await conn.query(`SELECT * FROM post WHERE slug = '${slug}'`);
    console.log(data);
    conn.end();
    console.log("Disconnected");
    return NextResponse.json(data);
  } catch (e) {
    console.log("Error in route: ", e);
  }
}
