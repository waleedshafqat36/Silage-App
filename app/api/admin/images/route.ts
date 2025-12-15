import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/image";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const images = await Image.find()
      .populate("uploadedBy", "name email")
      .sort({ uploadedAt: -1 })
      .lean();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("[Get Images Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Check if user is admin
    const user = await User.findById((session.user as any).id);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { name, data, mimeType, size } = await req.json();

    if (!name || !data || !mimeType || !size) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const image = new Image({
      name,
      data,
      mimeType,
      size,
      uploadedBy: (session.user as any).id,
    });

    await image.save();

    return NextResponse.json(
      { message: "Image uploaded successfully", image },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Upload Image Error]:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
