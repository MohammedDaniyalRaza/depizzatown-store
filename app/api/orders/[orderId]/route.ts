import Order from "@/lib/models/Order";
import { connectToDatabase } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) => {
    try {
        await connectToDatabase();
        const { status, paymentStatus } = await req.json();
        
        if (!status && !paymentStatus) {
            return new Response("Missing status or paymentStatus", { status: 400 });
        }
        
        const { orderId } = await params;
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