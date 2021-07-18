import Post from '../../models/postModel';
import { AuthenticationError } from 'apollo-server';

import { checkAuth } from '../../middlewares/authorization';

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_: any, { postId }: { postId: string }) {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error('Post not found.');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_: any, { body }: { body: string }, context: any) {
      const user: any = checkAuth(context);

      const post = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await post.save();

      return post;
    },
    async deletePost(_: any, { postId }: { postId: string }, context: any) {
      const user: any = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.username === user.username) {
            await post.delete();
            return 'Post successfully deleted';
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolvers;
