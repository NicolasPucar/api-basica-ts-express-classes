import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  estado: boolean;
  google: boolean;
}

const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;