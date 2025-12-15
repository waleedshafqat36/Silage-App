import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("[Get All Blogs Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
