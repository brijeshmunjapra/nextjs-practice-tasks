import { createPost } from "@/controllers/createController";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { post } = await request.json();

  try {
    const newPost = await createPost(post);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to create a new post", { status: 500 });
  }
};
