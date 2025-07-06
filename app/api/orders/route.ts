import Order from "@/lib/models/Order";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all orders for the logged-in user
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        
        // Check if this is an admin request (all orders)
        const { searchParams } = new URL(req.url);
        const isAdminRequest = searchParams.get('all') === 'true';
        
        if (isAdminRequest) {
            // For admin panel: return all orders (no auth required)
            const orders = await Order.find({}).sort({ createdAt: -1 });
            return NextResponse.json({ orders });
        } else {
            // For regular users: return only their orders (auth required)
            const { userId } = await auth();
            if (!userId) {
                return new Response("Unauthorized", { status: 401 });
            }
            const orders = await Order.find({ customerClerkId: userId }).sort({ createdAt: -1 });
            return NextResponse.json({ orders });
        }
    } catch (err) {
        console.error("[orders_GET]", err);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// POST: Place a new order (COD), save to store DB, and sync to admin panel
export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        
        await connectToDatabase();
        const { cartItems, customer, shippingAddress, phoneNumber } = await req.json();
        
        if (!cartItems || !customer || !shippingAddress || !phoneNumber) {
            return new Response("Missing required fields", { status: 400 });
        }
        
        // Calculate total amount
        const totalAmount = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
        const shippingCost = totalAmount > 5000 ? 0 : 200;
        const finalTotal = totalAmount + shippingCost;
        
        // Create order in store DB
        const order = await Order.create({
            customerClerkId: customer.clerkId,
            customerEmail: customer.email,
            customerName: customer.name,
            products: cartItems.map((item: any) => ({
                product: {
                    _id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image
                },
                color: item.color,
                size: item.size,
                quantity: item.quantity
            })),
            totalAmount: finalTotal,
            shippingAddress,
            phoneNumber,
            paymentMethod: "COD",
            status: "pending"
        });
        
        await order.save();
        
        // Sync order to admin panel
        try {
            await fetch('http://localhost:3000/api/orders', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...order.toObject(),
                    _id: undefined, // Let admin DB generate its own ID
                })
            });
        } catch (syncErr) {
            console.error("[orders_POST] Failed to sync with admin panel:", syncErr);
        }
        
        return NextResponse.json({
            success: true,
            orderId: order._id,
            orderNumber: order.orderNumber,
            message: "Order placed successfully! Pay on delivery."
        }, { status: 201 });
    } catch (err) {
        console.error("[orders_POST]", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}; 

// PATCH: Update order status and payment status (for admin panel)
export const PATCH = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const { orderId, status, paymentStatus } = await req.json();
        
        if (!orderId) {
            return new Response("Missing orderId", { status: 400 });
        }
        
        const updateData: any = { updatedAt: new Date() };
        
        // Validate and update status
        if (status) {
            const validStatuses = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
            if (!validStatuses.includes(status)) {
                return new Response(`Invalid status. Must be one of: ${validStatuses.join(", ")}`, { status: 400 });
            }
            updateData.status = status;
        }
        
        // Validate and update payment status
        if (paymentStatus) {
            const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];
            if (!validPaymentStatuses.includes(paymentStatus)) {
                return new Response(`Invalid payment status. Must be one of: ${validPaymentStatuses.join(", ")}`, { status: 400 });
            }
            updateData.paymentStatus = paymentStatus;
        }
        
        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );
        
        if (!order) {
            return new Response("Order not found", { status: 404 });
        }
        
        return NextResponse.json({ 
            success: true,
            message: "Order updated successfully",
            order 
        });
    } catch (err) {
        console.error("[orders_PATCH]", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}; 