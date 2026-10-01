'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Heart,
  ShieldCheck,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    trackEvent('newsletter_subscription', { emailDomain: email.split('@')[1] });
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Fresh<span className="text-emerald-400">Bite</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Your neighborhood kitchen serving chef-crafted, sustainably sourced meals prepared fresh to order. Real food, local farms, fast delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                <Leaf className="w-3.5 h-3.5" /> 100% Local Sourcing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Eco Packaging
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore FreshBite
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-emerald-400 transition-colors">
                  Full Menu &amp; Specials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Our Story &amp; Kitchen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-emerald-400 transition-colors">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-emerald-400 transition-colors">
                  Demo Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating hours & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Hours &amp; Location
            </h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Kitchen Hours:</div>
                  <div>Monday &ndash; Friday: 10:00 AM &ndash; 10:00 PM</div>
                  <div>Saturday &ndash; Sunday: 9:00 AM &ndash; 11:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Downtown Kitchen:</div>
                  <div>142 Green Street, Suite 4B</div>
                  <div>Freshville, CA 94102</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(555) 382-7483</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>hello@freshbite-kitchen.demo</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Promotions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Fresh Deals in Your Inbox
            </h4>
            <p className="text-sm text-stone-400">
              Subscribe to get secret seasonal drops, weekend promo codes, and chef recipes.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thanks for joining! Use code <strong>FRESH10</strong> on your next order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-stone-800 text-white placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  No spam ever. Unsubscribe with 1 click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} FreshBite Local Kitchen. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for good food lovers.</span>
          </div>
          <div className="bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700 text-stone-400 text-center">
            <span className="font-semibold text-amber-400">Demo Project Notice:</span> This is a fictional food ordering prototype. Payments are simulated.
          </div>
        </div>
      </div>
    </footer>
  );
}
