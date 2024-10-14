import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  password?: string;
  emailVerified?: Date;
  provider?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String },
  emailVerified: { type: Date },
  provider: { type: String },
}, {
  timestamps: true
});

let User: Model<IUser>;

try {
  // Try to get the existing model
  User = mongoose.model<IUser>('User');
} catch {
  // If the model doesn't exist, create it
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User;