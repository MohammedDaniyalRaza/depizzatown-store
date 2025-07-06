import Order from "@/lib/models/Order";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { cartItems, customer, shippingAddress, phoneNumber } = await req.json();

    if (!cartItems || !customer || !shippingAddress || !phoneNumber) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Get the authenticated user
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Ensure user exists in database (create if not exists)
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({
        clerkId: userId,
        email: customer.email || 'guest@example.com',
        name: customer.name || 'Guest'
      });
      await user.save();
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    const shippingCost = totalAmount > 5000 ? 0 : 200;
    const finalTotal = totalAmount + shippingCost;

    // Create order
    const order = await Order.create({
      customerClerkId: userId,
      customerEmail: user.email,
      customerName: user.name,
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

    return NextResponse.json({
      success: true,
      orderId: order._id,
      orderNumber: order.orderNumber,
      message: "Order placed successfully! Pay on delivery."
    }, { status: 201 });

  } catch (err) {
    console.error("[checkout_POST]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}; 