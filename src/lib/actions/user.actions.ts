/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache";
import User, { AuthProvider } from "../models/User";
import { connectToDB } from "../mongoose";

interface CreateUserParams {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  provider: AuthProvider;
  providerAccountId?: string;
  confirmedName: boolean;
}

export async function createUser ({
  firstName,
  lastName,
  email,
  image,
  provider,
  providerAccountId,
  confirmedName,
}: CreateUserParams): Promise<void> {
  await connectToDB();

  try {
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (firstName && !existingUser.confirmedName) {
        existingUser.firstName = firstName;
      }
      if (lastName && !existingUser.confirmedName) {
        existingUser.lastName = lastName;
      }
      if (image) {
        existingUser.image = image;
      }

      // Add or update provider
      existingUser.addProvider(provider, providerAccountId);

      // Update last login
      existingUser.updateLastLogin();

      if (confirmedName && !existingUser.confirmedName) {
        existingUser.confirmedName = true;
      }

      await existingUser.save();
    } else {
      // Create new user
      const newUser = new User({
        email: normalizedEmail,
        primaryProvider: provider,
        providers: [{
          name: provider,
          accoundId: providerAccountId,
          lastUsed: Date.now()
        }],
        confirmedName: false,
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(image && { image }),
      });

      await newUser.save();
    }

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getUserById(userId: string) {
  await connectToDB();
  try {
    const user = await User.findById(userId).lean();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}