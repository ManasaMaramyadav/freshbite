'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/menu/ProductCard';
import { useCart } from '@/context/CartContext';
import { analytics } from '@/lib/analytics';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Leaf,
  Bike,
  Star,
  Flame,
  Award,
  Copy,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const { applyPromoCode } = useCart();
  const [copiedPromo, setCopiedPromo] = React.useState(false);

  // Top 4 featured items
  const featuredProducts = PRODUCTS.filter((p) => p.isChefSpecial || p.isPopular).slice(0, 4);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyPromoCode(code);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-[#fcfbf9] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Locally Sourced &bull; Cooked Scratch Daily &bull; Delivered Fast</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                Good food made from{' '}
                <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy underline-offset-8">
                  real local farms
                </span>
                , delivered straight to your door.
              </h1>

              {/* Subheading */}
              <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
                FreshBite crafts wholesome grain bowls, artisan burgers, crisp organic salads, and stone-baked sourdough pizzas. Always zero artificial fillers, 100% flavor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/menu"
                  onClick={() => analytics.trackNavigation('/menu', 'Hero Order Now')}
                  data-track="hero-order-now"
                  className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center gap-2 transition-all group text-base"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  onClick={() => analytics.trackNavigation('/about', 'Hero Our Story')}
                  className="px-6 py-3.5 bg-white hover:bg-stone-100 active:scale-95 text-stone-800 font-bold rounded-2xl border border-stone-200/90 shadow-xs transition-all text-base"
                >
                  Our Farm Story
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-stone-800">25&ndash;35 Mins</p>
                    <p className="text-stone-500">Avg. Delivery Time</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-700 shrink-0">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-stone-800">4.9 / 5.0 Rating</p>
                    <p className="text-stone-500">Over 3,200 Reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-sky-100/80 flex items-center justify-center text-sky-700 shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-stone-800">100% Organic</p>
                    <p className="text-stone-500">Compostable Boxes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Food Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative blob backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200/50 to-amber-200/50 rounded-3xl blur-2xl -z-10 opacity-70"></div>

                {/* Main Image Container */}
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    alt="Wild Salmon Quinoa Bowl"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Overlay text on hero photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 bg-emerald-600 rounded-full text-xs font-bold mb-1 shadow-sm">
                      Chef Special
                    </span>
                    <p className="font-bold text-lg leading-tight">Wild Salmon Quinoa Bowl</p>
                    <p className="text-xs text-stone-200">Sustainably caught &bull; Citrus-miso glaze</p>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 animate-bounce sm:flex hidden">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-stone-900">“Best bowl in town!”</span>
                    </div>
                    <span className="text-[11px] text-stone-500">Verified Diner &bull; Today</span>
                  </div>
                </div>

                {/* Floating Eco Delivery Pill */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-2">
                  <Bike className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-stone-800">Zero-Emission Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY QUICK SELECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Explore Our Kitchen
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              Browse by Craving
            </h2>
          </div>
          <Link
            href="/menu"
            onClick={() => analytics.trackNavigation('/menu', 'View Full Menu link')}
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View Full Menu ({PRODUCTS.length} dishes)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              onClick={() => analytics.trackCategoryFilter(cat.id)}
              data-track={`category-card-${cat.id}`}
              className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all text-center flex flex-col items-center justify-center hover:-translate-y-1"
            >
              <span className="text-3xl mb-2 group-hover:scale-125 transition-transform">
                {cat.icon}
              </span>
              <h3 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">
                {cat.label}
              </h3>
              <span className="text-xs text-stone-400 mt-0.5">
                {cat.count} options
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-stone-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          {/* Subtle Decorative Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 fill-stone-950" /> Limited Time Deal
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Get 10% Off Your First Order + Free Neighborhood Delivery
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Order fresh grain bowls, hand-crafted burgers, or stone-baked sourdough pizzas today. Applied automatically at checkout!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleCopyCode('FRESH10')}
                className="flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {copiedPromo ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Applied: FRESH10</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-700" />
                    <span>Use Code: FRESH10</span>
                  </>
                )}
              </button>

              <Link
                href="/menu"
                className="px-5 py-2.5 bg-emerald-950/60 hover:bg-emerald-950 text-white font-semibold text-sm rounded-xl border border-emerald-500/30 transition-colors"
              >
                Order Now &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MEALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Chef-Selected Favorites
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              Popular Dishes This Week
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Handcrafted in small batches using morning-picked ingredients.
            </p>
          </div>
          <Link
            href="/menu"
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors self-start md:self-auto"
          >
            Explore Complete Menu &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. WHY FRESHBITE VALUE PROPOSITION */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              The FreshBite Standard
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              Why Local Food Lovers Choose Us
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              We ditched warehouse freezers and mystery fillers to build a restaurant that cooks food the way it was meant to be made.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">50-Mile Sourcing</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Vegetables harvested at dawn from local family farms. Grass-fed meats, artisan sourdough, and local dairy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Scratch Cooking</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sauces simmered daily, dressings hand-whisked, and proteins cooked to order. Never premade microwave batches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Eco-Fast Delivery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Delivered in temperature-controlled bags using low-emission vehicles and electric bikes for zero neighborhood noise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Compostable Ware</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                100% plant-based bowls, certified non-toxic containers, and unbleached paper bags that return naturally to the earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Customer Love
          </span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
            Loved by Neighborhood Foodies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
              “The Wild Salmon Quinoa bowl is honestly better than what I get at high-end sit-down restaurants. It arrived piping hot in 22 minutes!”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                SM
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Sarah Mitchell</p>
                <p className="text-[11px] text-stone-400">Regular Customer &bull; Downtown</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
              “Finally a delivery place that cares about gluten allergies. The Truffle Burger on gluten-free bun made my entire Friday night.”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                DL
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">David Lin</p>
                <p className="text-[11px] text-stone-400">Verified Buyer &bull; Westside</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
              “The Matcha Lava Cookie alone is worth ordering for. The mobile ordering experience is buttery smooth and checkout takes 30 seconds.”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                ER
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Elena Rossi</p>
                <p className="text-[11px] text-stone-400">Verified Diner &bull; North End</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Ready to taste the difference?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black max-w-xl mx-auto tracking-tight">
            Order your fresh meal right now and get it in 30 minutes.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-base shadow-lg transition-transform active:scale-95"
            >
              Order Online Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-base transition-colors"
            >
              Learn About Sourcing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
