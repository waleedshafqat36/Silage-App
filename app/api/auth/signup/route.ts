import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    console.log("[Signup] Connecting to MongoDB...");
    // Connect to MongoDB
    await connectDB();
    console.log("[Signup] MongoDB connected, creating user:", normalizedEmail);

    // Check if user already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      console.log("[Signup] User already exists:", normalizedEmail);
      return NextResponse.json(
        { error: "Email already registered. Please log in instead." },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const hashed = await bcrypt.hash(password, 10);

    // Create new user in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
      role: "user",
    });

    console.log(`[Signup] ✅ User created successfully in MongoDB:`, {
      id: user._id,
      email: normalizedEmail,
    });

    // Return success response (without password)
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup] ❌ Error:", error);

    if (error instanceof Error) {
      // Handle MongoDB duplicate key error
      if (
        error.message.includes("duplicate key") ||
        error.message.includes("E11000")
      ) {
        return NextResponse.json(
          { error: "Email already registered. Please log in instead." },
          { status: 409 }
        );
      }

      // Handle connection errors with clear messages
      if (error.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          { error: "Cannot connect to MongoDB. Please check your MONGO_URI in .env.local and ensure your cluster is running." },
          { status: 503 }
        );
      }

      if (error.message.includes("querySrv") || error.message.includes("ENOTFOUND")) {
        return NextResponse.json(
          { error: "MongoDB cluster not found. Please verify your MONGO_URI is correct. Follow the MONGODB_ATLAS_SETUP.md guide." },
          { status: 503 }
        );
      }

      if (error.message.includes("authentication failed") || error.message.includes("unauthorized")) {
        return NextResponse.json(
          { error: "MongoDB authentication failed. Check your username and password in MONGO_URI." },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: `Database error: ${error.message.substring(0, 100)}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
