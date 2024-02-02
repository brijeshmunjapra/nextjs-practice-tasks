import Post from "@/models/posts";
import { DbConnection } from "@/utils/DbConnection";

export const deletePost = async (id: string) => {
  try {
    await DbConnection();
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  } catch (error) {
    throw error;
  }
};
