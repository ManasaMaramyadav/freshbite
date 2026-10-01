'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '@/types';
import { PROMO_CODES } from '@/data/products';
import { analytics } from '@/lib/analytics';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  promoDiscountPercent: number;
  promoDetails: { description: string; freeDelivery?: boolean } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
  toasts: ToastState[];
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'freshbite_cart_state_v1';
const LAST_ORDER_KEY = 'freshbite_last_order_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [lastOrder, setLastOrderState] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Rehydrate state on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.appliedPromo) setAppliedPromo(parsed.appliedPromo);
      }

      const savedOrder = localStorage.getItem(LAST_ORDER_KEY);
      if (savedOrder) {
        setLastOrderState(JSON.parse(savedOrder));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          appliedPromo,
        })
      );
    } catch {
      // ignore
    }
  }, [items, appliedPromo, isHydrated]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, specialInstructions?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          specialInstructions: specialInstructions || next[existingIndex].specialInstructions,
        };
        return next;
      } else {
        return [...prev, { product, quantity, specialInstructions }];
      }
    });

    analytics.trackAddToCart(product, quantity);
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const target = items.find((i) => i.product.id === productId);
    if (target) {
      analytics.trackRemoveFromCart(productId, target.product.name);
      showToast(`Removed "${target.product.name}" from cart`, 'info');
    }
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const target = items.find((i) => i.product.id === productId);
    if (target) {
      analytics.trackQuantityChange(productId, target.product.name, quantity);
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];

    if (!promo) {
      analytics.trackApplyPromo(cleanCode, false);
      showToast(`Promo code "${code}" is invalid or expired`, 'warning');
      return { success: false, message: 'Invalid promo code. Try FRESH10 or FREESHIP!' };
    }

    setAppliedPromo(cleanCode);
    analytics.trackApplyPromo(cleanCode, true, promo.discountPercent);
    showToast(`Promo code "${cleanCode}" applied: ${promo.description}`, 'success');
    return { success: true, message: `Promo applied: ${promo.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const setLastOrder = (order: Order) => {
    setLastOrderState(order);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } catch {
        // ignore
      }
    }
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const promoInfo = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const promoDiscountPercent = promoInfo ? promoInfo.discountPercent : 0;
  const isFreeDeliveryPromo = promoInfo?.freeDelivery ?? false;

  const discountAmount = +(subtotal * (promoDiscountPercent / 100)).toFixed(2);

  // Delivery fee: $3.99 standard, free if subtotal >= 40 or if freeDelivery promo applied. If cart empty: $0
  const deliveryFee =
    items.length === 0
      ? 0
      : subtotal >= 40 || isFreeDeliveryPromo
      ? 0
      : 3.99;

  // Estimated tax 8.5% on discounted subtotal
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = items.length === 0 ? 0 : +(taxableAmount * 0.085).toFixed(2);

  // Total
  const total = items.length === 0 ? 0 : +(taxableAmount + deliveryFee + tax).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        promoDiscountPercent,
        promoDetails: promoInfo ? { description: promoInfo.description, freeDelivery: promoInfo.freeDelivery } : null,
        applyPromoCode,
        removePromoCode,
        itemCount,
        subtotal,
        discountAmount,
        deliveryFee,
        tax,
        total,
        lastOrder,
        setLastOrder,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
