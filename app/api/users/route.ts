import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try{
        await connectToDatabase();

        // Check if this is an admin request (all users)
        const { searchParams } = new URL(req.url);
        const isAdminRequest = searchParams.get('all') === 'true';
        
        if (isAdminRequest) {
            // For admin panel: return all users (no auth required)
            const users = await User.find({}).sort({ createdAt: -1 });
            return NextResponse.json({ users });
        } else {
            // For regular users: return only their own user info (auth required)
        const {userId} = await auth()

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        // When the user sign in for the first time, immidiately we create a new user in the database
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            user = await User.create({ clerkId: userId });
            await user.save();
        }

        return NextResponse.json(user, {status: 200});
        }

    } catch (err){
        console.error("[user_GET]", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}