import Post from "@/models/posts";
import { DbConnection } from "@/utils/DbConnection";

type dataType = {
  post: string;
};

export const updatePost = async (id: string, data: dataType) => {
  try {
    await DbConnection();
    const updetedPost = await Post.findByIdAndUpdate(id, data);

    return updetedPost;
  } catch (error) {
    return error;
  }
};
