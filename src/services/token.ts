import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;

export const createToken = (id: string, username: string) => {
  return jwt.sign({ id, username }, secret!, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret!);
};
