
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  variantId: string;
}

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

// Create the store with persist middleware to save cart in localStorage
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      
      addToCart: (newItem) => {
        const { cartItems } = get();
        
        // Check if item already exists in cart with same variant and size
        const existingItemIndex = cartItems.findIndex(
          item => item.productId === newItem.productId && 
                 item.variantId === newItem.variantId && 
                 item.size === newItem.size
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...cartItems];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          
          set({ cartItems: updatedItems });
          toast.success(`${newItem.name} quantity updated in cart`);
        } else {
          // Add new item to cart
          set({ cartItems: [...cartItems, newItem] });
          toast.success(`${newItem.name} added to cart`);
        }
      },
      
      removeFromCart: (id) => {
        const { cartItems } = get();
        const itemToRemove = cartItems.find(item => item.id === id);
        
        set({ 
          cartItems: cartItems.filter(item => item.id !== id) 
        });
        
        if (itemToRemove) {
          toast.info(`${itemToRemove.name} removed from cart`);
        }
      },
      
      updateQuantity: (id, quantity) => {
        const { cartItems } = get();
        
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        set({
          cartItems: cartItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => {
        set({ cartItems: [] });
        toast.info('Cart cleared');
      },
      
      getSubtotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
          const itemPrice = item.discountPrice || item.price;
          return total + (itemPrice * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'shopping-cart',
      // Skip persisting the isCartOpen state
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);
