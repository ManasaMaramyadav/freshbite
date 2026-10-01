'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCategory } from '@/types';
import { ProductCard } from '@/components/menu/ProductCard';
import { analytics } from '@/lib/analytics';
import {
  Search,
  X,
  SlidersHorizontal,
  Flame,
  Leaf,
  WheatOff,
  Sparkles,
  ArrowUpDown,
  Utensils,
  RotateCcw,
} from 'lucide-react';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'calories';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';
  const initialQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Dietary filters
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyChefSpecial, setOnlyChefSpecial] = useState(false);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Dietary filters
    if (onlyVegetarian) result = result.filter((p) => p.isVegetarian);
    if (onlyGlutenFree) result = result.filter((p) => p.isGlutenFree);
    if (onlySpicy) result = result.filter((p) => p.isSpicy);
    if (onlyChefSpecial) result = result.filter((p) => p.isChefSpecial);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'calories':
        result.sort((a, b) => a.calories - b.calories);
        break;
      case 'recommended':
      default:
        // Priority to chef specials & popular
        result.sort((a, b) => (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0));
        break;
    }

    return result;
  }, [
    selectedCategory,
    searchQuery,
    onlyVegetarian,
    onlyGlutenFree,
    onlySpicy,
    onlyChefSpecial,
    sortBy,
  ]);

  // Handle Search Input Change with tracking debounce
  const resultCount = filteredProducts.length;
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      analytics.trackSearch(searchQuery, resultCount);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, resultCount]);

  const handleCategorySelect = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    analytics.trackCategoryFilter(catId);
  };

  const handleDietaryToggle = (filterName: 'veg' | 'gf' | 'spicy' | 'chef') => {
    if (filterName === 'veg') {
      const next = !onlyVegetarian;
      setOnlyVegetarian(next);
      analytics.trackDietaryFilter('vegetarian', next);
    } else if (filterName === 'gf') {
      const next = !onlyGlutenFree;
      setOnlyGlutenFree(next);
      analytics.trackDietaryFilter('gluten-free', next);
    } else if (filterName === 'spicy') {
      const next = !onlySpicy;
      setOnlySpicy(next);
      analytics.trackDietaryFilter('spicy', next);
    } else if (filterName === 'chef') {
      const next = !onlyChefSpecial;
      setOnlyChefSpecial(next);
      analytics.trackDietaryFilter('chef-special', next);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
    setOnlyVegetarian(false);
    setOnlyGlutenFree(false);
    setOnlySpicy(false);
    setOnlyChefSpecial(false);
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (onlyVegetarian ? 1 : 0) +
    (onlyGlutenFree ? 1 : 0) +
    (onlySpicy ? 1 : 0) +
    (onlyChefSpecial ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
          Kitchen Fresh &bull; Cooked to Order
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Our Seasonal Menu
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Explore handcrafted bowls, artisan burgers, crisp farm salads, and sourdough pizzas. Sourced locally, prepared in small batches.
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. salmon, avocado, truffle, pesto)..."
              data-track="menu-search-input"
              className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="recommended">Chef Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>
        </div>

        {/* Dietary Quick Filter Toggles */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Dietary:
          </span>

          <button
            onClick={() => handleDietaryToggle('veg')}
            data-track="filter-dietary-vegetarian"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyVegetarian
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Vegetarian
          </button>

          <button
            onClick={() => handleDietaryToggle('gf')}
            data-track="filter-dietary-glutenfree"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyGlutenFree
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <WheatOff className="w-3.5 h-3.5" /> Gluten-Free
          </button>

          <button
            onClick={() => handleDietaryToggle('spicy')}
            data-track="filter-dietary-spicy"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlySpicy
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Spicy Only
          </button>

          <button
            onClick={() => handleDietaryToggle('chef')}
            data-track="filter-dietary-chef"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyChefSpecial
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Chef&apos;s Specials
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-xs font-semibold text-stone-500 hover:text-rose-600 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset all ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              data-track={`menu-category-${cat.id}`}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>
          Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> dishes
          {searchQuery && (
            <span>
              {' '}
              matching &ldquo;<span className="font-semibold text-emerald-700">{searchQuery}</span>&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Utensils className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">No dishes match your criteria</h3>
          <p className="text-sm text-stone-600">
            We couldn&apos;t find any items matching your active search or filters. Try relaxing your filters or searching for something else.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Clear All Filters &amp; Show Full Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-stone-500 font-medium">
          Loading fresh menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
