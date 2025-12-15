import { NextResponse } from "next/server";
import { mockUserDb } from "@/lib/mockDb";

export async function GET() {
  try {
    const users = mockUserDb.findAll();
    
    // Return users without passwords
    const safeUsers = users.map((user: any) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({
      message: "All registered users",
      count: safeUsers.length,
      users: safeUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
