import { getPost } from "@/controllers/getController";
import { DbConnection } from "@/utils/DbConnection";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await DbConnection();
    const posts = await getPost();

    return NextResponse.json(posts, { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to create a new post", { status: 500 });
  }
};
