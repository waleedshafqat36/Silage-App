import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    await connectDB();
    const user = await User.findById((session.user as any).id);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { title, content, excerpt, thumbnail, status } = await req.json();

    // Validation
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.substring(0, 150),
      thumbnail: thumbnail || "",
      author: user.name || user.email,
      authorId: user._id.toString(),
      status: status || "draft",
      views: 0,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Blog Create]", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
