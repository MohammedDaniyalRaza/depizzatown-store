import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongoDB";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get current user data from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response("User not found", { status: 404 });
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create new user
      user = await User.create({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.fullName || clerkUser.firstName || 'Guest',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        imageUrl: clerkUser.imageUrl || '',
        phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || ''
      });
      await user.save();

      return NextResponse.json({
        success: true,
        user,
        message: "User created successfully"
      });
    } else {
      return NextResponse.json({
        success: true,
        user,
        message: "User already exists"
      });
    }

  } catch (err) {
    console.error("[user_create_POST]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get current user data from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response("User not found", { status: 404 });
    }

    // Check if user exists in our database
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create new user
      user = await User.create({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.fullName || clerkUser.firstName || 'Guest',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        imageUrl: clerkUser.imageUrl || '',
        phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || ''
      });
      await user.save();
    }

    return NextResponse.json({
      success: true,
      user,
      message: "User data retrieved/created successfully"
    });

  } catch (err) {
    console.error("[user_create_GET]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}; 