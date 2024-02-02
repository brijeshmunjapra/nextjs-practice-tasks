import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  post: {
    type: String,
    required: [true, 'post is required.'],
  }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;