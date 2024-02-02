import Post from "@/models/posts";
import { DbConnection } from "@/utils/DbConnection";

export const createPost = async (post: string) => {
  try {
    await DbConnection();
    const newPost = new Post({ post });
    await newPost.save();
    return newPost;
  } catch (error) {
    throw error;
  }
};
