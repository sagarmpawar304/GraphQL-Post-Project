import postResolver from './postResolver';
import userResolver from './userResolver';

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

export default resolvers;
