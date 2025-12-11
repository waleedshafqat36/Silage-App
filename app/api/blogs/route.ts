import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("[Get Blogs Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
