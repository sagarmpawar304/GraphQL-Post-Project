import { UserInputError } from 'apollo-server';

import User from '../../models/userModel';
import { createToken } from '../../services/token';
import { validateRegisterInput, validateLoginInput } from '../../utils/validators';
import { comparePassword } from '../../services/password';

type RegisterArgs = {
  registerInput: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

type LoginArgs = {
  loginInput: {
    username: string;
    password: string;
  };
};

const resolvers = {
  Mutation: {
    async register(_: any, { registerInput: { username, email, password, confirmPassword } }: RegisterArgs) {
      // validate input data
      const { errors, valid } = validateRegisterInput({
        username,
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new UserInputError('Please provide valid data', {
          errors,
        });
      }

      // Check User exist with username or email
      const isUsernameUsed = await User.findOne({ username });
      if (isUsernameUsed) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'Username is taken.',
          },
        });
      }

      const isEmailUsed = await User.findOne({ email });
      if (isEmailUsed) {
        throw new UserInputError('Email already in use', {
          errors: {
            username: 'Email already in use. Please try to sign in.',
          },
        });
      }

      // Create user
      const user = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      await user.save();

      // Create token
      const token = createToken(user.id, user.email);

      // Send Token with user
      const { id, createdAt } = user;
      return {
        id,
        username: user.username,
        email: user.email,
        createdAt,
        token,
      };
    },
    async login(_any: any, { loginInput: { username, password } }: LoginArgs) {
      // Validate data
      const { errors, valid } = validateLoginInput({ username, password });
      if (!valid) {
        throw new UserInputError('Please provide valid data.', {
          errors,
        });
      }

      // Find user using username
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("User doesn't exist.", {
          errors: {
            username: "User doesn't exist with this username.",
          },
        });
      }
      // Match input password with hashed password
      const isPasswordMatched = await comparePassword(password, user.password);
      if (!isPasswordMatched)
        throw new UserInputError("password doesn't match", {
          errors: {
            password: "Password doesn't match",
          },
        });

      // Create token
      const token = createToken(user.id, user.email);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        token,
      };
    },
  },
};

export default resolvers;
