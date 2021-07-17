import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Post from './models/postModel';

// For access environmental variables in .env files
dotenv.config();

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) throw new Error('Please provide mongo url.');

// type defination were all query's are included
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

// Resolver ar those who resolves the query
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connected to database succefully.`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server is running at ${res.url}`);
  })
  .catch((err) => console.log(err));
