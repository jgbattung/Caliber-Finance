/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache";
import User from "../models/User";
import { connectToDB } from "../mongoose";

interface CreateUserParams {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  provider: string;
  confirmedName: boolean;
}

export async function createUser ({
  firstName,
  lastName,
  email,
  image,
  provider,
  confirmedName,
}: CreateUserParams): Promise<void> {
  await connectToDB();

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update existing user
      if (firstName) existingUser.firstName = firstName;
      if (lastName) existingUser.lastName = lastName;
      existingUser.image = image;
      existingUser.provider = provider;
      existingUser.confirmedName = confirmedName;
      await existingUser.save();
    } else {
      const newUser = new User({
        email,
        provider,
        confirmedName: false,
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(image && { image }),
      });
      await newUser.save();
    }

    revalidatePath('/dashboard');
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}