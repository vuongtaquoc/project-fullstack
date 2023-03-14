import { Schema, Model, model } from 'mongoose';
import * as PromiseBluebird from 'bluebird';
import * as Bcrypt from 'bcrypt';
import { jsonTransform } from './../utils/model-helper';

const bcrypt = PromiseBluebird.promisifyAll(Bcrypt);

export interface IUser {
  username? :string;
  password_hash?: string;
}

export interface IUserMethods {
  verifyPassword(password: string): boolean;
  hashPassword(password: string): string;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  verifyPassword(password: string): boolean;
  hashPassword(password: string): string;
}

const schema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    username: { type: String, index: true },
    password_hash: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: jsonTransform(['password_hash']),
    },
  }
);

schema.static('hashPassword', function hashPassword(password: string) {
  return bcrypt.hashAsync(password, 14);
});

schema.method('verifyPassword', function verifyPassword(password: string): boolean {
  return bcrypt.compareAsync(password, this.password_hash);
});

export const User = model<IUser, IUserModel>('User', schema);
export default User;
