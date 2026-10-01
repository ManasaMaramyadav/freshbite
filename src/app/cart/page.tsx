'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { analytics } from '@/lib/analytics';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  CheckCircle2,
  Bike,
  ShieldCheck,
  Sparkles,
  X,
  AlertCircle,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    appliedPromo,
    promoDiscountPercent,
    promoDetails,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Delivery meter calculations (Free over $40)
  const freeDeliveryThreshold = 40;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const handleCheckoutClick = () => {
    analytics.trackBeginCheckout(items.length, subtotal, total);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12 opacity-50" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-stone-900">Your Cart is Empty</h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            You haven&apos;t added any delicious meals yet. Explore our farm-fresh menu to find your favorites!
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Your Order Cart</h1>
          <p className="text-xs text-stone-500 mt-1">
            Review your dishes and proceed to checkout for warm neighborhood delivery.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-stone-400 hover:text-rose-600 self-start sm:self-auto flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Items List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Free Delivery Meter */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-emerald-700" />
                {amountToFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-extrabold">🎉 You unlocked FREE Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-emerald-700 font-black">${amountToFreeDelivery.toFixed(2)}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span>{Math.round(deliveryProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                style={{ width: `${deliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item Cards */}
          <div className="space-y-3">
            {items.map(({ product, quantity, specialInstructions }) => (
              <div
                key={product.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                {/* Image & Title */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono">
                      ${product.price.toFixed(2)} each
                    </p>
                    {specialInstructions && (
                      <p className="text-[11px] text-stone-500 italic">
                        Note: {specialInstructions}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                  {/* Stepper */}
                  <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-black text-stone-900 text-base">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-stone-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Add more items from menu
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label htmlFor="promo" className="block text-xs font-bold text-stone-700">
                Promo Code or Voucher
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-black uppercase tracking-wider">{appliedPromo}</span>
                      <p className="text-[11px] text-emerald-700">{promoDetails?.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-stone-400 hover:text-rose-600 p-1"
                    title="Remove Promo Code"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. FRESH10"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-mono uppercase focus:outline-none focus:bg-white focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-stone-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Promo hints */}
              {!appliedPromo && (
                <p className="text-[11px] text-stone-400">
                  Tip: Use code <strong className="text-emerald-700">FRESH10</strong> for 10% off or <strong className="text-emerald-700">FREESHIP</strong> for free delivery.
                </p>
              )}

              {promoMessage && !appliedPromo && (
                <p
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-3 border-t border-stone-100 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-stone-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {promoDiscountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Discount ({promoDiscountPercent}%)
                  </span>
                  <span className="font-mono">
                    -${((subtotal * promoDiscountPercent) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1.5">
                  Delivery Fee
                  {deliveryFee === 0 && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  )}
                </span>
                <span className="font-mono font-medium text-stone-900">
                  {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Estimated Sales Tax (8.5%)</span>
                <span className="font-mono font-medium text-stone-900">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-stone-900">Estimated Total</span>
                  <p className="text-[11px] text-stone-400">Includes all local taxes and fees</p>
                </div>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                onClick={handleCheckoutClick}
                data-track="cart-continue-checkout"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Demo Payment Protected
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hot Food Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
