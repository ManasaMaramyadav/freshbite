'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Leaf,
  HeartHandshake,
  ShieldCheck,
  UtensilsCrossed,
  ArrowRight,
  Sun,
} from 'lucide-react';

export default function AboutPage() {
  const chefs = [
    {
      name: 'Chef Elena Rivera',
      role: 'Executive Chef & Co-Founder',
      bio: 'Former Michelin-starred sous chef dedicated to proving fast delivery food can rival the finest dining tables.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Farm Partnerships',
      bio: 'Lifelong agrarian advocate working directly with over a dozen family-owned organic farms within a 50-mile radius.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Chloe Bennett',
      role: 'Artisan Pastry & Dough Specialist',
      bio: 'Master of natural sourdough fermentation and botanical-infused desserts without refined sugars.',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const milestones = [
    { year: '2021', title: 'The Kitchen Garden Pop-up', description: 'FreshBite started out of a small community kitchen serving 40 grain bowls a day to local hospital workers.' },
    { year: '2022', title: 'Zero Industrial Seed Oils', description: 'We phased out all canola and vegetable oils, standardizing 100% on extra virgin olive oil and cold-pressed avocado oil.' },
    { year: '2023', title: '100% Compostable Packaging', description: 'Eliminated all single-use plastics from our delivery chain in partnership with regional bio-material innovators.' },
    { year: '2024', title: 'Community Farm Co-op', description: 'Established guaranteed fair purchase agreements with 14 local organic family farms to support sustainable agriculture.' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO STORY SECTION */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-transparent pt-12 pb-16 lg:pt-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Our Heritage &amp; Philosophy</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                Food cooked with integrity, sourced with respect.
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                FreshBite was born out of a simple question: <em>Why did ordering food at home have to mean sacrificing your health or the planet?</em>
              </p>
              <p className="text-stone-600 text-base leading-relaxed">
                We believe great meals start deep in healthy soil. That is why every morning before dawn, our kitchen receives crisp hydroponic greens, heritage grains, and humanely raised proteins directly from small growers within 50 miles of downtown.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>Taste the Difference</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-xl text-sm border border-stone-200 shadow-xs transition-colors"
                >
                  Visit Our Kitchen
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
                  alt="Chefs preparing fresh vegetables in kitchen"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUMBERS & IMPACT COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">14</span>
            <p className="text-xs sm:text-sm font-semibold text-stone-300">Local Partner Farms</p>
            <p className="text-[11px] text-stone-500">Within 50-mile radius</p>
          </div>

          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">100%</span>
            <p className="text-xs sm:text-sm font-semibold text-stone-300">Compostable Packaging</p>
            <p className="text-[11px] text-stone-500">Zero non-recyclable plastic</p>
          </div>

          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">0</span>
            <p className="text-xs sm:text-sm font-semibold text-stone-300">Industrial Seed Oils</p>
            <p className="text-[11px] text-stone-500">Only pure EVOO &amp; avocado oil</p>
          </div>

          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">45k+</span>
            <p className="text-xs sm:text-sm font-semibold text-stone-300">Happy Neighbors Fed</p>
            <p className="text-[11px] text-stone-500">Across the community</p>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Guiding Principles
          </span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
            How We Run Our Kitchen Every Day
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Pure Sourcing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We never cut corners with premade mixes, artificial flavor boosters, or chemically ripened produce.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Fair Farm Living</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We pay our farmers above-market guaranteed prices, insulating their small generational farms from volatile commodity swings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Artisanal Craft</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our sourdough ferments for 48 hours. Our bone broths simmer for 16 hours. Flavor is something that cannot be rushed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Zero Food Waste</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Unused vegetable cuttings become savory stock reductions; remaining ingredients are composted or donated to community shelters.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MEET THE CULINARY TEAM */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              The People Behind the Food
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              Meet Our Culinary Team
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Passionate culinary professionals on a mission to elevate fast neighborhood dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef) => (
              <div
                key={chef.name}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative aspect-4/3 w-full bg-stone-100">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg">{chef.name}</h3>
                    <p className="text-xs font-semibold text-emerald-700 mb-2">{chef.role}</p>
                    <p className="text-xs text-stone-600 leading-relaxed">{chef.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIMELINE / MILESTONES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
            Our Journey
          </span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">
            How FreshBite Grew
          </h2>
        </div>

        <div className="space-y-6">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-xs"
            >
              <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-mono font-bold text-xs shrink-0">
                {m.year}
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">{m.title}</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 sm:p-12 text-center text-white space-y-5 shadow-xl">
          <h2 className="text-3xl font-black tracking-tight max-w-xl mx-auto">
            Ready to experience food made the right way?
          </h2>
          <p className="text-emerald-100 text-sm max-w-md mx-auto">
            Explore our rotating seasonal menu and get your meal delivered warm and fresh in under 35 minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-sm shadow-md transition-transform active:scale-95"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
