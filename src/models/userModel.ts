import mongoose from 'mongoose';

import { hashPassword } from '../services/password';

type UserAttr = {
  username: string;
  email: string;
  password: string;
  createdAt: string;
};

export interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    createdAt: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.methods.build = (userAttr: UserAttr) => {
  return new User(userAttr);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const encryptedPassword = await hashPassword(this.get('password'));
  this.set('password', encryptedPassword);
  next();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
