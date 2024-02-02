import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const data = [
      {
        id: 1,
        username: "brijesh",
        password: "1234",
      },
      {
        id: 2,
        username: "artin",
        password: "12345",
      },
    ];

    const user = data.find(
      (user) => user.username == username && user.password == password
    );

    if (user) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        "your-secret-key",
        { expiresIn: "1h" }
      );

      return NextResponse.json( {body: { message: "Login successful", token }}, {status: 200});
    } else {
      return NextResponse.json({body: { message: "Login failed" }}, {status: 401});
    }
  } catch (error) {
    return NextResponse.json({body: { message: "Internal server error" }}, {status: 500});
  }
}
