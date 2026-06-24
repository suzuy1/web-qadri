/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onMoveToCart,
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-outline-variant/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-error fill-error" />
                  <h3 className="font-sans font-semibold text-lg text-on-background">
                    My Wishlist ({favorites.length})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-on-surface-variant hover:text-on-background rounded-full hover:bg-surface-container transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Favorites List */}
              <div className="flex-grow overflow-y-auto px-6 py-4">
                {favorites.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 text-on-surface-variant">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h4 className="font-sans font-semibold text-base text-on-background mb-2">
                      Your wishlist is empty
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant mb-6 max-w-xs">
                      Save items you love to keep an eye on them. They will appear here!
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-xs py-2.5 px-6 rounded-lg transition-colors"
                    >
                      Explore Collections
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {favorites.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-3 rounded-xl border border-outline-variant/10 bg-surface-container-low/30 hover:bg-surface-container-low/50 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="w-16 h-20 bg-surface-bright rounded-lg overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-sans font-medium text-sm text-on-background line-clamp-1">
                                {product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveFavorite(product)}
                                className="text-on-surface-variant hover:text-error p-1 rounded-md transition-colors shrink-0"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="font-sans text-xs font-semibold text-primary mt-1">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => onMoveToCart(product)}
                              className="flex items-center gap-1.5 py-1.5 px-3 bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-xs rounded-lg transition-colors active:scale-95"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
