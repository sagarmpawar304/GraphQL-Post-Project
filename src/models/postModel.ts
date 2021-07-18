import { Model, Document, Schema, model } from 'mongoose';

type PostAttr = {
  body: string;
  user: string;
  username: string;
  createdAt: string;
};

export interface PostDoc extends Document {
  body: string;
  username: string;
  createdAt: string;
  comments: {
    body: string;
    username: string;
    createdAt: string;
  }[];
  likes: {
    username: string;
    createdAt: string;
  }[];
  user: {
    type: string;
    ref: string;
  };
}

interface PostModel extends Model<PostDoc> {
  build(attr: PostAttr): PostDoc;
}

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

postSchema.methods.build = (postAttr: PostAttr) => {
  return new Post(postAttr);
};

const Post = model<PostDoc, PostModel>('Post', postSchema);

export default Post;
