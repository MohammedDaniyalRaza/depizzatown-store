import {create} from 'zustand';
import {toast} from 'react-hot-toast';

// Minimal cart item structure - only essential data
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
    // Store a single small image URL for display purposes only
    image?: string;
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    getUniqueItemsCount: () => number;
}

// Simple localStorage solution with optimized data structure
const useCart = create<CartStore>((set, get) => ({
    cartItems: [],
    
    addItem: (data: CartItem) => {
        const currentItems = get().cartItems;
        const existingItem = currentItems.find((cartItem) => cartItem.id === data.id);

        if (existingItem) {
            // If item already exists, show error message
            return toast("Item already in cart");
        }

        // Add new item
        const newCartItems = [...currentItems, data];
        set({cartItems: newCartItems});
        
        // Save to localStorage immediately
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart-items', JSON.stringify(newCartItems));
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        }
        
        toast.success("Item added to cart");
    },

    removeItem: (idToRemove: string) => {
        const newCartItems = get().cartItems.filter((cartItem) => cartItem.id !== idToRemove);
        set({cartItems: newCartItems});
        
        // Save to localStorage immediately
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart-items', JSON.stringify(newCartItems));
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        }
        
        toast.success("Item removed from cart");
    },

    increaseQuantity: (idToIncrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
            if (cartItem.id === idToIncrease) {
                return {...cartItem, quantity: cartItem.quantity + 1};
            }
            return cartItem;
        });
        set({cartItems: newCartItems});
        
        // Save to localStorage immediately
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart-items', JSON.stringify(newCartItems));
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        }
        
        toast.success("Quantity increased");
    },
    
    decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
            if (cartItem.id === idToDecrease && cartItem.quantity > 1) {
                return {...cartItem, quantity: cartItem.quantity - 1};
            }
            return cartItem;
        });
        set({cartItems: newCartItems});
        
        // Save to localStorage immediately
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart-items', JSON.stringify(newCartItems));
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        }
        
        toast.success("Quantity decreased");
    },
    
    clearCart: () => {
        set({cartItems: []});
        
        // Clear from localStorage
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem('cart-items');
            } catch (error) {
                console.error('Failed to clear localStorage:', error);
            }
        }
    },

    getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    getUniqueItemsCount: () => {
        return get().cartItems.length;
    }
}));

// Load cart from localStorage on mount
if (typeof window !== 'undefined') {
    try {
        const savedCart = localStorage.getItem('cart-items');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            useCart.setState({cartItems: parsedCart});
        }
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
    }
}

export default useCart;
