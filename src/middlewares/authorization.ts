import { AuthenticationError } from 'apollo-server';

import { verifyToken } from '../services/token';

export const checkAuth = (context: any) => {
  // check headers include authorization token
  const headers = context.req.headers.authorization;

  if (headers) {
    const token = headers.split('Bearer ')[1];

    // token exist then verify with jwt
    if (token) {
      try {
        const user = verifyToken(token);
        return user;
      } catch (err) {
        throw new AuthenticationError(`Invalid/Expired token`);
      }
    } else {
      throw new AuthenticationError(`Authentication token must be "Bearer [token]"`);
    }
  } else {
    throw new AuthenticationError('Authorization header must be provided.');
  }
};

export default checkAuth;
