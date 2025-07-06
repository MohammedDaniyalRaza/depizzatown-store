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

    // Check if user already exists in our database
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create new user in our database
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
    } else {
      // Update existing user with latest data from Clerk
      user.email = clerkUser.emailAddresses[0]?.emailAddress || user.email;
      user.name = clerkUser.fullName || user.name;
      user.firstName = clerkUser.firstName || user.firstName;
      user.lastName = clerkUser.lastName || user.lastName;
      user.imageUrl = clerkUser.imageUrl || user.imageUrl;
      user.phoneNumber = clerkUser.phoneNumbers[0]?.phoneNumber || user.phoneNumber;
      await user.save();
    }

    return NextResponse.json({
      success: true,
      user,
      message: "User synced successfully"
    });

  } catch (err) {
    console.error("[user_sync_POST]", err);
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
      // Create new user in our database
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
      message: "User data retrieved successfully"
    });

  } catch (err) {
    console.error("[user_sync_GET]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}; 