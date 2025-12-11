import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function POST(req: Request) {
  try {
    const { title, content, author, authorId, excerpt, status } =
      await req.json();

    // Validation
    if (!title || !content || !author || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (title.trim().length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: "Content must be at least 10 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.create({
      title,
      content,
      author,
      authorId,
      excerpt: excerpt || content.substring(0, 150),
      status: status || "draft",
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Blog Create Error]:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
