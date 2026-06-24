/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onQuickAdd,
}: ProductCardProps) {
  return (
    <div
      className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:shadow-lg transition-all duration-300 relative"
      id={`product-card-${product.id}`}
    >
      {/* Top action/tag overlays */}
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 bg-surface-container/85 backdrop-blur-md text-on-surface font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest">
          New
        </div>
      )}

      {/* Favorite heart button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
        className={`absolute top-3 right-3 z-10 p-2 bg-surface-container-lowest/70 backdrop-blur-sm rounded-full text-on-surface-variant hover:text-error hover:bg-surface-container-lowest transition-all duration-200 shadow-sm ${
          isFavorite ? 'text-error!' : 'md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0'
        }`}
        aria-label="Add to favorites"
      >
        <Heart
          className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-error text-error' : ''}`}
        />
      </motion.button>

      {/* Image Container */}
      <div
        className="relative w-full pt-[120%] bg-surface-bright overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Hover overlay for premium action */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5 gap-2">
          <h4
            className="font-sans font-medium text-body-md text-on-background line-clamp-1 hover:text-primary cursor-pointer transition-colors"
            onClick={() => onOpenDetail(product)}
          >
            {product.name}
          </h4>
          <span className="font-sans text-xs font-semibold text-on-surface-variant flex items-center shrink-0">
            <Star className="w-3.5 h-3.5 text-primary-container fill-primary-container mr-0.5" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="font-sans text-xs text-on-surface-variant/75 mb-3">
          {product.category}
        </p>

        <p className="font-sans text-base font-semibold text-primary mb-4 mt-auto">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onOpenDetail(product)}
            className="flex-grow py-2 px-3 text-xs font-medium border border-outline text-on-surface font-sans rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 duration-200"
          >
            Details
          </button>
          <button
            onClick={() => onQuickAdd(product)}
            className="p-2 border border-primary text-primary hover:bg-primary hover:text-on-primary rounded-lg transition-colors duration-200 active:scale-95 flex items-center justify-center"
            title="Quick add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
