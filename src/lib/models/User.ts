import mongoose, { Document, Model } from 'mongoose';

interface IUserMethods {
  addProvider: (providerName: AuthProvider, accountId?: string) => void;
  updateLastLogin: () => void;
}

interface IProvider {
  name: string;
  accoundId?: string;
  lastUsed: Date;
}

export type AuthProvider = 'google' | 'facebook' | 'email'

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  providers: IProvider[];
  primaryProvider: AuthProvider;
  emailVerified?: Date;
  confirmedName: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

type UserModel = Model<IUser, object, IUserMethods>;

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'email']
  },
  accountId: { type: String },
  lastUsed: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: { type: String },
  providers: [ProviderSchema],
  primaryProvider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'email'],
  },
  emailVerified: { type: Date },
  confirmedName: { type: Boolean, default: false },
  lastLogin: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Add indexes for frequent queries
UserSchema.index({ email: 1 });
UserSchema.index({ 'providers.name': 1 });

UserSchema.methods.addProvider = function(providerName: AuthProvider, accountId?: string) {
  const existingProvider = this.providers.find((p: IProvider) => p.name === providerName);
  
  if (existingProvider) {
    existingProvider.lastUsed = new Date();
    if (accountId) existingProvider.accountId = accountId;
  } else {
    this.providers.push({
      name: providerName,
      accountId,
      lastUsed: new Date()
    });
  }
};

UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
};

let User: UserModel;

try {
  // Try to get the existing model
  User = mongoose.model<IUser, UserModel>('User');
} catch {
  // If the model doesn't exist, create it
  User = mongoose.model<IUser, UserModel>('User', UserSchema);
}

export default User;