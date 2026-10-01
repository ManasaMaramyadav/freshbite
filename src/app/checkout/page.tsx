'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { DeliveryDetails, PaymentDetails, Order } from '@/types';
import { analytics } from '@/lib/analytics';
import {
  ShieldAlert,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Banknote,
  Smartphone,
  Info,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, deliveryFee, tax, total, appliedPromo, setLastOrder, clearCart } = useCart();

  const [delivery, setDelivery] = useState<DeliveryDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    suite: '',
    city: 'Freshville',
    postalCode: '94102',
    deliveryInstructions: '',
    deliveryMethod: 'standard',
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    method: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardHolder: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // If user navigates directly with empty cart, prompt them
  useEffect(() => {
    if (items.length === 0) {
      // Let user view if they came from confirmation or allow browsing
    }
  }, [items]);

  const handleFillDemoData = () => {
    setDelivery({
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      phone: '(555) 729-4821',
      address: '742 Evergreen Terrace',
      suite: 'Apt 4B',
      city: 'Freshville',
      postalCode: '94102',
      deliveryInstructions: 'Ring doorbell twice and leave on front table.',
      deliveryMethod: 'standard',
    });

    setPayment({
      method: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvc: '888',
      cardHolder: 'Alex Rivera',
    });

    setErrors({});
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!delivery.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!delivery.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email.trim())) {
      errs.email = 'Valid email is required.';
    }
    if (!delivery.phone.trim()) errs.phone = 'Phone number is required for delivery driver.';
    if (!delivery.address.trim()) errs.address = 'Street address is required.';
    if (!delivery.postalCode.trim()) errs.postalCode = 'Postal code is required.';

    if (payment.method === 'card') {
      if (!payment.cardNumber?.trim()) errs.cardNumber = 'Card number required (any demo number).';
      if (!payment.cardExpiry?.trim()) errs.cardExpiry = 'Expiry required.';
      if (!payment.cardCvc?.trim()) errs.cardCvc = 'CVC required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Generate realistic fake order
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const fakeOrderId = `FB-${randomNum}`;

      const createdOrder: Order = {
        orderId: fakeOrderId,
        createdAt: new Date().toISOString(),
        items: [...items],
        subtotal,
        discount: discountAmount,
        deliveryFee,
        tax,
        total,
        promoCode: appliedPromo || undefined,
        deliveryDetails: delivery,
        paymentMethod:
          payment.method === 'card'
            ? 'Demo Credit Card (ending 4242)'
            : payment.method === 'digital_wallet'
            ? 'Demo Apple / Google Pay'
            : 'Cash on Delivery',
        estimatedDeliveryTime: '25-35 minutes',
        status: 'placed',
      };

      setLastOrder(createdOrder);
      analytics.trackCheckoutCompleted(createdOrder);
      clearCart();
      setIsProcessing(false);

      // Redirect to Order Confirmation
      router.push('/order-confirmation');
    }, 1200);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-stone-900">Your cart is currently empty</h1>
        <p className="text-sm text-stone-600">
          Please select items from the menu before proceeding to checkout.
        </p>
        <Link
          href="/menu"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      {/* Demo Warning Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-stone-950 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-amber-950 uppercase tracking-wide">
              Demo Checkout Mode Activated
            </h2>
            <p className="text-xs text-amber-900 leading-relaxed mt-0.5">
              This is a prototype application. <strong>No real money will be charged</strong> and no financial information is processed or stored. Feel free to use test values or click the auto-fill button.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFillDemoData}
          className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-Fill Demo Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckoutSubmit} className="space-y-8" noValidate>
            {/* Step 1: Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-stone-900 text-lg">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-stone-700 mb-1">
                    Recipient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={delivery.fullName}
                    onChange={(e) => setDelivery({ ...delivery, fullName: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-300 bg-rose-50/40' : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={delivery.phone}
                    onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-300 bg-rose-50/40' : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address (for order receipts &amp; updates) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={delivery.email}
                  onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
                  placeholder="alex@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-300 bg-rose-50/40' : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Step 2: Delivery Details */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-stone-900 text-lg">Delivery Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-bold text-stone-700 mb-1">
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    placeholder="123 Main Street"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.address ? 'border-rose-300 bg-rose-50/40' : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="suite" className="block text-xs font-bold text-stone-700 mb-1">
                    Apt / Suite <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="suite"
                    type="text"
                    value={delivery.suite}
                    onChange={(e) => setDelivery({ ...delivery, suite: e.target.value })}
                    placeholder="Apt 2B"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-bold text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={delivery.city}
                    onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-bold text-stone-700 mb-1">
                    Postal / ZIP Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={delivery.postalCode}
                    onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.postalCode ? 'border-rose-300 bg-rose-50/40' : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.postalCode && <p className="text-xs text-rose-600 mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="deliveryInstructions" className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Notes / Gate Code <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  id="deliveryInstructions"
                  type="text"
                  value={delivery.deliveryInstructions}
                  onChange={(e) => setDelivery({ ...delivery, deliveryInstructions: e.target.value })}
                  placeholder="e.g. Leave at front door, gate code #4912"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Delivery Speed selection */}
              <div>
                <span className="block text-xs font-bold text-stone-700 mb-2">
                  Delivery Speed &amp; Courier
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-3 rounded-2xl border text-xs cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    delivery.deliveryMethod === 'standard'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={delivery.deliveryMethod === 'standard'}
                      onChange={() => setDelivery({ ...delivery, deliveryMethod: 'standard' })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Standard</span>
                      <Truck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[11px] text-stone-500">25 &ndash; 35 mins</span>
                  </label>

                  <label className={`p-3 rounded-2xl border text-xs cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    delivery.deliveryMethod === 'express'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={delivery.deliveryMethod === 'express'}
                      onChange={() => setDelivery({ ...delivery, deliveryMethod: 'express' })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Priority Express</span>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-[11px] text-stone-500">15 &ndash; 20 mins</span>
                  </label>

                  <label className={`p-3 rounded-2xl border text-xs cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    delivery.deliveryMethod === 'eco'
                      ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={delivery.deliveryMethod === 'eco'}
                      onChange={() => setDelivery({ ...delivery, deliveryMethod: 'eco' })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Eco E-Bike</span>
                      <span className="text-emerald-700 font-bold">🌱 Zero-CO2</span>
                    </div>
                    <span className="text-[11px] text-stone-500">25 &ndash; 35 mins</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method (Simulated) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-bold text-stone-900 text-lg">Demo Payment Method</h3>
                </div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Sandbox Mode
                </span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'card' })}
                  className={`p-3 rounded-2xl border text-xs flex flex-col items-center gap-2 transition-all ${
                    payment.method === 'card'
                      ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-700" />
                  <span>Demo Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'digital_wallet' })}
                  className={`p-3 rounded-2xl border text-xs flex flex-col items-center gap-2 transition-all ${
                    payment.method === 'digital_wallet'
                      ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <span>Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'cash' })}
                  className={`p-3 rounded-2xl border text-xs flex flex-col items-center gap-2 transition-all ${
                    payment.method === 'cash'
                      ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {payment.method === 'card' && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  <div>
                    <label htmlFor="cardNumber" className="block text-xs font-bold text-stone-700 mb-1">
                      Card Number (Simulated)
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-sm focus:outline-none focus:bg-white focus:border-emerald-600"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                    {errors.cardNumber && <p className="text-xs text-rose-600 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-xs font-bold text-stone-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        value={payment.cardExpiry}
                        onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                        placeholder="MM/YY (e.g. 12/28)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-sm focus:outline-none focus:bg-white focus:border-emerald-600"
                      />
                      {errors.cardExpiry && <p className="text-xs text-rose-600 mt-1">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label htmlFor="cardCvc" className="block text-xs font-bold text-stone-700 mb-1">
                        CVC Code
                      </label>
                      <input
                        id="cardCvc"
                        type="text"
                        value={payment.cardCvc}
                        onChange={(e) => setPayment({ ...payment, cardCvc: e.target.value })}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-sm focus:outline-none focus:bg-white focus:border-emerald-600"
                      />
                      {errors.cardCvc && <p className="text-xs text-rose-600 mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}

              {payment.method === 'digital_wallet' && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-xs text-indigo-900 flex items-start gap-2.5 animate-fade-in">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Simulated Apple Pay / Google Pay authentication will confirm instantaneously upon placing your order.
                  </span>
                </div>
              )}

              {payment.method === 'cash' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Pay our courier directly upon arrival with exact cash or mobile card terminal.
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              data-track="place-demo-order-btn"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-60 text-white rounded-2xl font-black text-base shadow-xl shadow-emerald-700/25 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Confirming Order with Kitchen...</span>
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Demo Order (${total.toFixed(2)})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base">Order Review</h3>
              <Link href="/cart" className="text-xs text-emerald-700 hover:underline font-semibold">
                Edit items
              </Link>
            </div>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-stone-800 line-clamp-1">{product.name}</p>
                      <p className="text-stone-400">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Sales Tax (8.5%)</span>
                <span className="font-mono">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-stone-200">
                <span className="text-sm font-black text-stone-900">Total Due</span>
                <span className="text-xl font-black text-stone-900 font-mono">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-100 rounded-2xl text-xs text-stone-500 space-y-2 border border-stone-200">
            <p className="font-semibold text-stone-700">Need to make adjustments?</p>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to shopping cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
