import { create } from 'zustand';

interface OrdersStore {
  orders: any[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  getOrderCount: () => number;
}

const useOrders = create<OrdersStore>((set, get) => ({
  orders: [],
  loading: false,
  error: null,
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      set({ orders: data.orders || [], loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false });
    }
  },
  getOrderCount: () => get().orders.length,
}));

export default useOrders; 