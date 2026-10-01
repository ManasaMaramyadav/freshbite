'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { analytics } from '@/lib/analytics';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  Search,
  PhoneCall,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string, label: string) => {
    analytics.trackNavigation(href, label);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 text-center font-medium border-b border-emerald-800/80 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span>
          Local, Farm-to-Table Goodness • Use code{' '}
          <span className="font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-2">
            FRESH10
          </span>{' '}
          for 10% off your order!
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => handleNavClick('/', 'Logo Home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-stone-900 flex items-center">
                  Fresh<span className="text-emerald-600">Bite</span>
                  <span className="ml-1 w-2 h-2 rounded-full bg-amber-500"></span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-500">
                  Local Kitchen
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 p-1.5 rounded-full border border-stone-200/60">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href, link.name)}
                    data-track={`nav-${link.name.toLowerCase()}`}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/menu"
                onClick={() => handleNavClick('/menu', 'Search Icon')}
                className="p-2.5 text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
                title="Search Menu"
                aria-label="Search Menu"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                onClick={() => handleNavClick('/cart', 'Cart Button')}
                data-track="nav-cart-btn"
                className="flex items-center gap-2.5 bg-stone-900 hover:bg-emerald-700 text-white pl-3.5 pr-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-95 group"
                aria-label={`Cart with ${itemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 text-[11px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="text-stone-300 group-hover:text-emerald-100 font-mono text-xs border-l border-stone-700 pl-2">
                    ${subtotal.toFixed(2)}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions: Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/cart"
                onClick={() => handleNavClick('/cart', 'Mobile Cart Icon')}
                className="relative p-2 text-stone-800 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href, `Mobile ${link.name}`)}
                    className={`px-4 py-2.5 rounded-xl font-medium text-base transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <Link
                href="/cart"
                onClick={() => handleNavClick('/cart', 'Mobile View Cart Button')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>View Cart ({itemCount} items &bull; ${subtotal.toFixed(2)})</span>
              </Link>

              <Link
                href="/menu"
                onClick={() => handleNavClick('/menu', 'Mobile Order Online Button')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-2 text-xs text-stone-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> (555) 382-7483
              </span>
              <span>Open Daily: 10am - 10pm</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
