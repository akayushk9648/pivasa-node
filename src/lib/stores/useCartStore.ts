import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/database";

export interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
  exchangeOldBattery: boolean;
  exchangeDiscountPerUnit: number;
}

interface CartStore {
  items: CartItemWithProduct[];
  addItem: (product: Product, quantity?: number, exchangeOldBattery?: boolean) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleExchange: (productId: string, exchange: boolean) => void;
  clearCart: () => void;
  
  // Computed helpers
  getSubtotal: () => number;
  getTotalExchangeDiscount: () => number;
  getEstimatedTax: () => number;
  getShippingCharge: () => number;
  getTotalAmount: () => number;
}

// Industry standard scrap battery trade-in values
export function calculateScrapValue(capacity?: string | null): number {
  if (!capacity) return 800;
  const upper = capacity.toUpperCase();
  
  // Standalone inverters / UPS units (VA or Wh without Ah)
  if ((upper.includes("VA") || upper.includes("WH")) && !upper.includes("AH")) {
    return 0; // Pure UPS machines don't have lead-acid scrap by default
  }

  const num = parseInt(capacity.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return 800;
  
  if (num <= 14) return 200;       // Motorcycle / Scooter (2.5Ah - 14Ah)
  if (num <= 45) return 800;       // Small Hatchback / 3W (32Ah - 45Ah)
  if (num <= 65) return 1000;      // Mid Sedan / SUV (50Ah - 65Ah)
  if (num <= 88) return 1400;      // Heavy SUV / Tractor (75Ah - 88Ah)
  if (num <= 130) return 1800;     // LCV / Medium Commercial (100Ah - 130Ah)
  if (num <= 180) return 2400;     // Tall Tubular / Truck (150Ah - 180Ah)
  return 3000;                     // High-capacity Tubular / Solar (200Ah - 260Ah+)
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, exchangeOldBattery = false) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.productId === product.id);
          const scrapVal = calculateScrapValue(product.capacity);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                quantity,
                product,
                exchangeOldBattery,
                exchangeDiscountPerUnit: scrapVal,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      toggleExchange: (productId, exchange) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, exchangeOldBattery: exchange } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          return sum + item.product.approx_mrp * item.quantity;
        }, 0);
      },

      getTotalExchangeDiscount: () => {
        return get().items.reduce((sum, item) => {
          if (item.exchangeOldBattery) {
            return sum + item.exchangeDiscountPerUnit * item.quantity;
          }
          return sum;
        }, 0);
      },

      getEstimatedTax: () => {
        // 18% GST calculation included in MRP / break-up
        const discountedSubtotal = Math.max(0, get().getSubtotal() - get().getTotalExchangeDiscount());
        return Math.round(discountedSubtotal * 0.18);
      },

      getShippingCharge: () => {
        // Free delivery across Varanasi for orders > 2000
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= 2000) return 0;
        return 200;
      },

      getTotalAmount: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getTotalExchangeDiscount();
        const shipping = get().getShippingCharge();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "pivasa_cart_storage",
    }
  )
);
