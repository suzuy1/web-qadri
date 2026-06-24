/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Heart, ShoppingBag, Mail, Sparkles } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'favorite' | 'newsletter' | 'info' | 'success';
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  key?: React.Key;
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <ShoppingBag className="w-5 h-5 text-primary" />;
      case 'favorite':
        return <Heart className="w-5 h-5 text-error fill-error" />;
      case 'newsletter':
        return <Mail className="w-5 h-5 text-secondary" />;
      case 'success':
        return <Check className="w-5 h-5 text-primary-container" />;
      default:
        return <Sparkles className="w-5 h-5 text-tertiary" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="pointer-events-auto flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl shadow-lg ring-1 ring-black/5"
    >
      <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
        {getIcon()}
      </div>
      <div className="flex-grow pt-0.5">
        <h4 className="font-sans font-semibold text-sm text-on-background">{toast.title}</h4>
        <p className="font-sans text-xs text-on-surface-variant mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-on-surface-variant hover:text-on-background p-1 rounded-md transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
