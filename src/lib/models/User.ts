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

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;