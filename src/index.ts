import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

// For access env variables in .env files
dotenv.config();

// env variables
const mongoUrl = process.env.MONGO_URL;
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const expires_in = process.env.EXPIRES_IN;

if (!mongoUrl) throw new Error('Please provide mongo url.');
if (!jwt_secret_key) throw new Error('Please provide secret key.');
if (!expires_in) throw new Error('Please provide expires in duration for token.');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  cors: true,
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
