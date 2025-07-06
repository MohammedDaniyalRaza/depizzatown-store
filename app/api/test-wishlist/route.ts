import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();

        // Create a test user if it doesn't exist
        const testUser = await User.findOneAndUpdate(
            { clerkId: "test_user_123" },
            {
                clerkId: "test_user_123",
                email: "test@example.com",
                name: "Test User"
            },
            { upsert: true, new: true }
        );

        // Get all users
        const allUsers = await User.find({});

        return NextResponse.json({
            success: true,
            testUser,
            totalUsers: allUsers.length,
            allUsers
        });
    } catch (error) {
        console.error("Test wishlist error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}; 