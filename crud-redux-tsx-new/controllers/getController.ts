import Post from "@/models/posts";
import { DbConnection } from "@/utils/DbConnection";

export const getPost = async () => {

  try {
    await DbConnection()
    const posts = await Post.find({})

    return posts;
  } catch (error) {
    return error;
  }
};
