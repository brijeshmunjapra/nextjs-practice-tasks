import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/users";
import { connectToDB } from "@/utils/database";

async function findUserByUsernameAndPassword(username, password) {
  try {
    await connectToDB();
    const user = await User.findOne({ username, password });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const user = await findUserByUsernameAndPassword(username, password);

    if (user) {
      const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      return NextResponse.json(
        { message: "Login successful", user: user.username, token, userId: user?._id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Check username and password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
