'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Sparkles,
  Leaf,
  WheatOff,
  Info,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Check how many are currently in cart
  const inCartItem = items.find((i) => i.product.id === product.id);
  const inCartQty = inCartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setQuantity(1);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isChefSpecial && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              <Sparkles className="w-3 h-3" /> Chef&apos;s Pick
            </span>
          )}
          {product.isPopular && !product.isChefSpecial && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              Popular
            </span>
          )}
          {product.isSpicy && (
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white font-bold text-[11px] px-2 py-1 rounded-full shadow-md">
              <Flame className="w-3 h-3" /> Spicy
            </span>
          )}
        </div>

        {/* Dietary indicators on image bottom-right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[11px] font-medium">
          {product.isVegetarian && (
            <span title="Vegetarian" className="flex items-center gap-1 text-emerald-400">
              <Leaf className="w-3 h-3" /> Veg
            </span>
          )}
          {product.isGlutenFree && (
            <span title="Gluten-Free" className="flex items-center gap-1 text-amber-300">
              <WheatOff className="w-3 h-3" /> GF
            </span>
          )}
          <span className="flex items-center gap-1 text-stone-300 ml-1">
            <Clock className="w-3 h-3" /> {product.prepTime}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Calories */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
            <span className="font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
              {product.calories} kcal
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-lg group-hover:text-emerald-700 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>

          {/* Details / Allergens button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-2 text-xs text-stone-500 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <Info className="w-3 h-3" />
            <span>{showDetails ? 'Hide ingredients' : 'View ingredients & allergens'}</span>
          </button>

          {showDetails && (
            <div className="mt-2 p-2.5 bg-stone-50 rounded-xl text-xs text-stone-600 border border-stone-200/80 animate-fade-in space-y-1">
              <p>
                <strong className="text-stone-800">Ingredients:</strong>{' '}
                {product.ingredients.join(', ')}
              </p>
              {product.allergens && product.allergens.length > 0 && (
                <p className="text-rose-700">
                  <strong className="text-rose-900">Allergens:</strong>{' '}
                  {product.allergens.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions: Price + Add Button */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-stone-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {inCartQty > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700">
                {inCartQty} in cart
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={`Decrease quantity for ${product.name}`}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-stone-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label={`Increase quantity for ${product.name}`}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAdd}
              data-track={`add-to-cart-${product.id}`}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white scale-105'
                  : 'bg-stone-900 hover:bg-emerald-600 text-white'
              }`}
              aria-label={`Add ${quantity} ${product.name} to cart`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
