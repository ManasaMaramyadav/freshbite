'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types';
import {
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  MapPin,
  Phone,
  Truck,
  ChefHat,
  Home,
  Sparkles,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const { lastOrder } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (lastOrder) {
      setOrder(lastOrder);
    } else {
      // Fallback: Check localStorage or generate realistic demo preview
      try {
        const stored = localStorage.getItem('freshbite_last_order_v1');
        if (stored) {
          setOrder(JSON.parse(stored));
          return;
        }
      } catch {
        // ignore
      }

      // Sample fallback for direct URL visits
      const sampleOrder: Order = {
        orderId: 'FB-93821',
        createdAt: new Date().toISOString(),
        items: [
          {
            product: {
              id: 'prod-1',
              name: 'Wild Salmon Quinoa Power Bowl',
              slug: 'wild-salmon-quinoa-bowl',
              description: 'Pan-seared Pacific wild salmon over warm organic tri-color quinoa.',
              price: 16.95,
              category: 'bowls',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
              rating: 4.9,
              reviewsCount: 142,
              prepTime: '15-20 min',
              calories: 580,
              ingredients: ['Wild Salmon', 'Tri-Color Quinoa'],
            },
            quantity: 2,
          },
          {
            product: {
              id: 'prod-13',
              name: 'Matcha White Chocolate Lava Cookie',
              slug: 'matcha-white-chocolate-cookie',
              description: 'Warm, gooey ceremonial Uji matcha cookie stuffed with molten Belgian white chocolate.',
              price: 6.95,
              category: 'desserts',
              image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
              rating: 4.9,
              reviewsCount: 178,
              prepTime: '5-8 min',
              calories: 380,
              ingredients: ['Ceremonial Matcha', 'White Chocolate'],
            },
            quantity: 1,
          },
        ],
        subtotal: 40.85,
        discount: 4.09,
        deliveryFee: 0,
        tax: 3.12,
        total: 39.88,
        promoCode: 'FRESH10',
        deliveryDetails: {
          fullName: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          phone: '(555) 729-4821',
          address: '742 Evergreen Terrace',
          suite: 'Apt 4B',
          city: 'Freshville',
          postalCode: '94102',
          deliveryMethod: 'standard',
        },
        paymentMethod: 'Demo Credit Card (ending 4242)',
        estimatedDeliveryTime: '25-35 minutes',
        status: 'placed',
      };
      setOrder(sampleOrder);
    }
  }, [lastOrder]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-stone-500">
        Loading confirmation details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* 1. Success Hero */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm text-center space-y-4">
        <div className="w-18 h-18 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Order Confirmed &bull; Sent to Kitchen
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Thank you for ordering, {order.deliveryDetails.fullName}!
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Your fresh meal is being prepared with local ingredients. A confirmation email has been dispatched to{' '}
            <strong className="text-stone-900">{order.deliveryDetails.email}</strong>.
          </p>
        </div>

        {/* Order Reference Number Pill */}
        <div className="inline-flex items-center gap-3 bg-stone-100 border border-stone-200 px-5 py-2.5 rounded-2xl text-stone-800">
          <span className="text-xs text-stone-500 uppercase font-semibold">Demo Order ID:</span>
          <span className="font-mono font-black text-emerald-800 text-base">{order.orderId}</span>
        </div>
      </div>

      {/* 2. Order Live Status Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Kitchen Preparation Tracker</span>
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full animate-pulse">
            ETA: {order.estimatedDeliveryTime}
          </span>
        </div>

        {/* Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Order Placed</p>
              <p className="text-[11px] text-stone-500">Confirmed</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm shrink-0 ring-4 ring-amber-100 animate-pulse">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">In the Kitchen</p>
              <p className="text-[11px] text-amber-700 font-semibold">Preparing fresh</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Out for Delivery</p>
              <p className="text-[11px] text-stone-500">Courier assigned</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Arrived</p>
              <p className="text-[11px] text-stone-500">At your door</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Itemized Receipt */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h2 className="font-bold text-stone-900 text-base">Receipt &amp; Dishes Ordered</h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Ordered items list */}
        <div className="divide-y divide-stone-100">
          {order.items.map(({ product, quantity, specialInstructions }) => (
            <div key={product.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-stone-500">
                    Qty: {quantity} &bull; ${product.price.toFixed(2)} each
                  </p>
                  {specialInstructions && (
                    <p className="text-[11px] text-stone-400 italic">“{specialInstructions}”</p>
                  )}
                </div>
              </div>

              <span className="font-mono font-bold text-stone-900 text-sm">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal</span>
            <span className="font-mono font-semibold">${order.subtotal.toFixed(2)}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Discount ({order.promoCode || 'Promo'})</span>
              <span className="font-mono">-${order.discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-stone-600">
            <span>Delivery Fee</span>
            <span className="font-mono font-semibold">
              {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-stone-600">
            <span>Taxes (8.5%)</span>
            <span className="font-mono font-semibold">${order.tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-baseline pt-3 border-t border-stone-200 text-sm">
            <span className="font-black text-stone-900">Total Paid</span>
            <span className="text-xl font-black text-stone-900 font-mono">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Delivery & Payment Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Address */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Delivery Address</span>
          </h3>
          <div className="text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-900">{order.deliveryDetails.fullName}</p>
            <p>
              {order.deliveryDetails.address}
              {order.deliveryDetails.suite ? `, ${order.deliveryDetails.suite}` : ''}
            </p>
            <p>
              {order.deliveryDetails.city}, CA {order.deliveryDetails.postalCode}
            </p>
            <p className="pt-1 flex items-center gap-1.5 text-stone-500">
              <Phone className="w-3.5 h-3.5" /> {order.deliveryDetails.phone}
            </p>
            {order.deliveryDetails.deliveryInstructions && (
              <p className="pt-1 text-[11px] text-stone-500 italic bg-stone-50 p-2 rounded-lg border border-stone-100">
                Driver note: {order.deliveryDetails.deliveryInstructions}
              </p>
            )}
          </div>
        </div>

        {/* Payment & Courier info */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Payment &amp; Dispatch</span>
          </h3>
          <div className="text-xs text-stone-600 space-y-2">
            <div>
              <p className="text-stone-400">Payment Method:</p>
              <p className="font-semibold text-stone-800">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-stone-400">Dispatch Speed:</p>
              <p className="capitalize font-semibold text-stone-800">
                {order.deliveryDetails.deliveryMethod} Dispatch (25-35m)
              </p>
            </div>
            <div className="pt-1">
              <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                100% Compostable Packaging Sealed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/menu"
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Something Else</span>
        </Link>

        <Link
          href="/"
          className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
