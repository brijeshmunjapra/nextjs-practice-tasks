import { deletePost } from "@/controllers/deleteController";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();

  try {
    const deletedPost = await deletePost(id);
    if (!deletedPost) {
      return NextResponse.json("Post not found", { status: 404 });
    }
    return NextResponse.json("Post deleted", { status: 201 });
  } catch (error) {
    console.log(error, "error occured");
    return NextResponse.json("Failed to delete a post", { status: 500 });
  }
};
