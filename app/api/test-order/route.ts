import Order from "@/lib/models/Order";
import { connectToDatabase } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();

        // Create a test order
        const testOrder = await Order.create({
            customerClerkId: "test_user_123",
            customerEmail: "test@example.com",
            customerName: "Test User",
            products: [
                {
                    product: {
                        _id: "test_product_1",
                        title: "Test Pizza",
                        price: 999,
                        image: "test_image.jpg"
                    },
                    color: "Red",
                    size: "Medium",
                    quantity: 2
                }
            ],
            totalAmount: 1998,
            shippingAddress: {
                street: "123 Test St",
                city: "Karachi",
                state: "Sindh",
                country: "Pakistan",
                zipCode: "75000"
            },
            phoneNumber: "+92-300-1234567",
            paymentMethod: "COD",
            status: "pending"
        });

        // Get all orders
        const allOrders = await Order.find({});

        return NextResponse.json({
            success: true,
            testOrder,
            totalOrders: allOrders.length,
            allOrders
        });
    } catch (error) {
        console.error("Test order error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}; 