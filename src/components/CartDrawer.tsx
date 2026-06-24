/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 200 || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15.00;
  const total = subtotal + shippingCost;

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
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-sans font-semibold text-lg text-on-background">
                    Your Shopping Bag ({cartItems.length})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-on-surface-variant hover:text-on-background rounded-full hover:bg-surface-container transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 text-on-surface-variant">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-sans font-semibold text-base text-on-background mb-2">
                      Your bag is empty
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant mb-6 max-w-xs">
                      Curate your look with our modern essentials and tailored silhouettes.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-xs py-2.5 px-6 rounded-lg transition-colors"
                    >
                      Start Browsing
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {/* Free shipping banner progress */}
                    <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl">
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                        <Truck className="w-4 h-4" />
                        {isFreeShipping ? (
                          <span>Congrats! You have unlocked Free Express Shipping!</span>
                        ) : (
                          <span>Add ${(200 - subtotal).toFixed(2)} more for Free Shipping</span>
                        )}
                      </div>
                      {!isFreeShipping && (
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (subtotal / 200) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Cart list */}
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="flex gap-4 p-3 rounded-xl border border-outline-variant/10 bg-surface-container-low/30 hover:bg-surface-container-low/50 transition-colors"
                      >
                        {/* Image */}
                        <div className="w-20 h-24 bg-surface-bright rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-sans font-medium text-sm text-on-background line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(index)}
                                className="text-on-surface-variant hover:text-error p-1 rounded-md transition-colors shrink-0"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="font-sans text-[11px] text-on-surface-variant/80 mt-0.5">
                              Color: {item.selectedColor} • Size: {item.selectedSize}
                            </p>
                          </div>

                          <div className="flex justify-between items-end mt-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-outline-variant rounded-md overflow-hidden bg-surface-container-lowest">
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="p-1 px-2 hover:bg-surface-container-low text-on-surface transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-on-background">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="p-1 px-2 hover:bg-surface-container-low text-on-surface transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-sans text-sm font-semibold text-primary">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer pricing section */}
              {cartItems.length > 0 && (
                <div className="border-t border-outline-variant/25 px-6 py-5 bg-surface-container-low/40">
                  <div className="flex flex-col gap-2.5 mb-5">
                    <div className="flex justify-between text-sm text-on-surface-variant">
                      <span>Subtotal</span>
                      <span className="font-semibold text-on-background">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-on-surface-variant">
                      <span>Express Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="font-semibold text-primary uppercase text-xs tracking-wider">Free</span>
                      ) : (
                        <span className="font-semibold text-on-background">$15.00</span>
                      )}
                    </div>
                    <hr className="border-outline-variant/20 my-1" />
                    <div className="flex justify-between text-base font-bold text-on-background">
                      <span>Total (USD)</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-4 rounded-xl font-sans font-semibold text-sm transition-colors shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex justify-center items-center gap-1.5 text-[10px] text-on-surface-variant/80 mt-3.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Safe & Secure checkout guaranteed.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
