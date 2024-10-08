/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import User from "../models/User";
import { connectToDB } from "../mongoose";

interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  provider: string;
}

export async function createUser ({
  firstName,
  lastName,
  email,
  image,
  provider,
}: CreateUserParams): Promise<void> {
  await connectToDB();

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update existing user
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.image = image;
      existingUser.provider = provider;
      await existingUser.save();
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        image,
        provider,
      });
      await newUser.save();
    }

    revalidatePath('/dashboard');
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}