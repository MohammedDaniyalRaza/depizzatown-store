// Types in admin panel
type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string[];
    products: ProductType[];
}

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: string[];
    category: string;
    collections: CollectionType[];
    tags: string[];
    sizes: string[];
    colors: string[]; // Change it into flavours if you want to use it for food products
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
}

// Types in client panel
type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type UserType = {
  clerkId: string;
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  _id: string;
  orderNumber: string;
  customerClerkId: string;
  customerEmail: string;
  customerName: string;
  products: OrderItemType[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumber: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
}