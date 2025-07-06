import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    _id: String,
    title: String,
    price: Number,
    image: String
  },
  color: String,
  size: String,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  customerClerkId: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    default: "COD"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
    default: "pending"
  },
  orderNumber: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Get count of orders for today
    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    const orderCount = await mongoose.model('Order').countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });
    
    const orderNumber = `DT${year}${month}${day}${(orderCount + 1).toString().padStart(3, '0')}`;
    this.orderNumber = orderNumber;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order; 