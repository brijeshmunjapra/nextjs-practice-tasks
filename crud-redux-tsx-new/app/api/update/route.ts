import { updatePost } from "@/controllers/updateController";
import { DbConnection } from "@/utils/DbConnection";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const { id, data } = await request.json();

  try {
    await DbConnection();
    await updatePost(id, data);

    return NextResponse.json("Post updated", { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to uppdate a post", { status: 500 });
  }
};
