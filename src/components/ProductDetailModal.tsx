/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color: string, size: string) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative bg-surface-container-lowest max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-surface-container-lowest/80 backdrop-blur-md rounded-full text-on-surface-variant hover:text-on-background hover:bg-surface-container shadow-sm transition-all active:scale-90"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-surface-bright flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                  New Collection
                </span>
              )}
            </div>

            {/* Right Column: Dynamic Options & Info */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[85vh]">
              <div>
                {/* Category & Ratings */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant/70">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 text-primary-container fill-primary-container" />
                    <span className="text-xs font-bold text-on-surface">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Title & Price */}
                <h2 className="font-sans font-semibold text-2xl text-on-background mb-3">
                  {product.name}
                </h2>
                <p className="font-sans text-xl font-bold text-primary mb-5">
                  ${product.price.toFixed(2)}
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
                    Color: <span className="text-on-background font-medium">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const colorMap: Record<string, string> = {
                        'Slate Grey': 'bg-slate-400',
                        'Charcoal Black': 'bg-neutral-800',
                        'Navy Blue': 'bg-blue-900',
                        'Emerald Green': 'bg-emerald-800',
                        'Pearl White': 'bg-stone-100 border border-neutral-300',
                        'Champagne Gold': 'bg-amber-100 border border-amber-300',
                        'Cognac Brown': 'bg-amber-800',
                        'Midnight Black': 'bg-neutral-900',
                        'Desert Tan': 'bg-orange-200',
                        'Off-White': 'bg-zinc-100 border border-zinc-300',
                        'Classic Black': 'bg-stone-900',
                        'Grey Suede': 'bg-neutral-400',
                        'Warm Taupe': 'bg-neutral-500',
                        'Oatmeal': 'bg-yellow-50',
                        'Soft Black': 'bg-stone-800',
                        'Sand Beige': 'bg-stone-300',
                        'Pure White': 'bg-white border border-stone-200',
                        'Classic Khaki': 'bg-amber-200',
                        'Olive Green': 'bg-emerald-950',
                        'Noir Black': 'bg-black',
                        'Gold Matte': 'bg-amber-400',
                        'Silver Satin': 'bg-zinc-300',
                      };

                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center p-0.5 transition-all duration-200 ${
                            selectedColor === color
                              ? 'ring-2 ring-primary ring-offset-2'
                              : 'hover:scale-105'
                          }`}
                          title={color}
                        >
                          <span className={`w-full h-full rounded-full ${colorMap[color] || 'bg-neutral-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
                    Size: <span className="text-on-background font-medium">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 h-10 px-3 rounded-lg border text-sm font-semibold flex items-center justify-center transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-on-primary shadow-sm'
                            : 'border-outline-variant hover:border-on-surface-variant hover:bg-surface-container-low text-on-surface'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Note / Info */}
                <div className="flex items-center gap-2 text-xs text-on-surface-variant bg-surface-container-low/50 p-3 rounded-lg mb-6">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>Standard minimalist tailored fit. Order your normal size or size up for a relaxed vibe.</span>
                </div>
              </div>

              {/* Action Section */}
              <div>
                <hr className="border-outline-variant/20 my-4" />
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-surface-container-low text-on-surface transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-sans font-bold text-sm text-on-background">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-surface-container-low text-on-surface transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add To Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-sm py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag — ${(product.price * quantity).toFixed(2)}
                  </button>

                  {/* Favorite Toggle inside Modal */}
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className={`p-3 border rounded-lg transition-colors shrink-0 flex items-center justify-center ${
                      isFavorite
                        ? 'border-error text-error bg-error-container/25 hover:bg-error-container/50'
                        : 'border-outline-variant text-on-surface-variant hover:text-error hover:border-error hover:bg-surface-container-low'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-error' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
