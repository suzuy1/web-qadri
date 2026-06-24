/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, Truck, ShoppingBag, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'completed';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 200 ? 0 : 15.00;
  const total = subtotal + shippingCost;

  // Masking card input formatted like "0000 0000 0000 0000"
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setFormData({ ...formData, cardNumber: parts.join(' ') });
    } else {
      setFormData({ ...formData, cardNumber: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      setFormData({ ...formData, cardExpiry: `${value.slice(0, 2)}/${value.slice(2)}` });
    } else {
      setFormData({ ...formData, cardExpiry: value });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('completed');
      onOrderSuccess();
    }
  };

  const handlePrevStep = () => {
    if (step === 'payment') {
      setStep('shipping');
    }
  };

  const randomOrderNumber = 'LX-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-surface-container-lowest max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            {step !== 'completed' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-1.5 text-on-surface-variant hover:text-on-background hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Left/Main Checkout Form Container */}
            <div className="flex-grow p-6 md:p-8 overflow-y-auto">
              {/* Checkout Progress Stepper */}
              {step !== 'completed' && (
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      step === 'shipping'
                        ? 'bg-primary text-on-primary'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    1. Shipping
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant/40" />
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      step === 'payment'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    2. Payment
                  </span>
                </div>
              )}

              {/* Step Forms */}
              <form onSubmit={handleNextStep}>
                {step === 'shipping' && (
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-on-background mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Shipping Destination
                    </h3>

                    <div className="flex flex-col gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="Elena Rostova"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="elena@rostova.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="Avenue des Champs-Élysées, 45"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Paris"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            required
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="75008"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-sans font-semibold text-sm transition-colors mt-6 shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 'payment' && (
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-on-background mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Details
                    </h3>

                    <div className="flex flex-col gap-3.5">
                      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 flex justify-between items-center mb-1">
                        <div>
                          <p className="text-xs text-on-surface-variant font-medium">Deliver to:</p>
                          <p className="text-sm text-on-background font-semibold mt-0.5">{formData.name}</p>
                          <p className="text-xs text-on-surface-variant line-clamp-1">{formData.address}, {formData.city}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="text-xs font-bold text-primary hover:underline shrink-0"
                        >
                          Change
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder={formData.name.toUpperCase() || 'ELENA ROSTOVA'}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-mono"
                            placeholder="4000 1234 5678 9010"
                          />
                          <CreditCard className="w-4 h-4 text-on-surface-variant/40 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-mono"
                            placeholder="•••"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-3 border border-outline-variant text-on-surface font-sans font-medium text-sm rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-1 active:scale-95"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-sans font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        Place Order — ${total.toFixed(2)}
                      </button>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 text-[10px] text-on-surface-variant/70 mt-4">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Encrypted SSL security. Your card credentials are never stored.</span>
                    </div>
                  </div>
                )}

                {step === 'completed' && (
                  <div className="text-center py-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-5 scale-110">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans font-semibold text-xl text-on-background mb-2">
                      Order Placed Successfully!
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant max-w-sm mb-6">
                      Thank you for your order, <span className="font-semibold text-on-background">{formData.name}</span>! We have sent a confirmation and tracking link to <span className="font-semibold text-on-background">{formData.email}</span>.
                    </p>

                    <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/35 w-full text-left mb-6 font-mono text-xs text-on-surface-variant flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span>Order Reference:</span>
                        <span className="font-bold text-on-background">{randomOrderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Delivery:</span>
                        <span className="font-bold text-primary">In 2 - 3 Business Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paid Total:</span>
                        <span className="font-bold text-on-background">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-xs py-3 px-8 rounded-lg transition-colors active:scale-95"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Right Summary Panel (Visible on desktop for shipping/payment stages) */}
            {step !== 'completed' && (
              <div className="hidden md:flex flex-col justify-between w-64 bg-surface-container-low p-6 shrink-0 border-l border-outline-variant/20">
                <div>
                  <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-on-surface-variant mb-4">
                    Order Summary
                  </h4>
                  <div className="flex flex-col gap-3 max-h-56 overflow-y-auto mb-4 pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 text-xs">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-12 object-cover rounded bg-surface-bright"
                        />
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-on-background truncate">{item.product.name}</p>
                          <p className="text-on-surface-variant/80 mt-0.5">
                            Qty: {item.quantity} • {item.selectedSize}
                          </p>
                        </div>
                        <span className="font-semibold text-primary shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-semibold text-on-background">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="font-bold text-primary uppercase text-[10px]">Free</span>
                    ) : (
                      <span className="font-semibold text-on-background">$15.00</span>
                    )}
                  </div>
                  <hr className="border-outline-variant/20 my-1" />
                  <div className="flex justify-between text-sm font-bold text-on-background">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
