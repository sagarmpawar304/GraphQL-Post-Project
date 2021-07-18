import postResolver from './postResolver';
import userResolver from './userResolver';

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

export default resolvers;
