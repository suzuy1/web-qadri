/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ArrowRight,
  Truck,
  Leaf,
  Headphones,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Globe,
  Star,
  Sparkles,
  Award
} from 'lucide-react';

import { Product, CartItem } from './types';
import { products } from './data';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer, { ToastMessage } from './components/Toast';

export default function App() {
  // Cart & Wishlist States (persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawer/Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Interactive Testimonial State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Newsletter email state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Refs for smooth scroll
  const shopSectionRef = useRef<HTMLDivElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('luxe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Testimonials database
  const testimonials = [
    {
      quote: "The precision in tailoring and the quality of the fabrics are unmatched. Luxe Retail has entirely elevated my professional wardrobe with pieces that feel effortless yet profoundly sophisticated.",
      author: "Elena Rostova",
      role: "Creative Director",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU41ndRWbOuuB5tnLNFM53mSpaBFBvQKzKyYpz_wLxQQAKL6CtB8wKH_jNKwc-PHu1L7WQNqbBTSOLW7ZLFbXTb_ngJDO9BPcEc5oYEji7mWN0Amjm7taU0QmZgLC9-kolwg2mBOxQ4rx9Fp3EmQhASdl_bKyBcbNIlQVCQHQ69CP4nrikKFHAYjbncQYvJi2tA5UM1lRlBgmpNr_QTbKgEfSiqH7yfZlzKA_BUErtSphjHne-_vNK3i1AAlshjcHU5uMRqRDB"
    },
    {
      quote: "Every single piece tells a story of dynamic craftsmanship. The leather sneakers became my daily essentials, blending casual comfort with sleek high-fashion detailing. Their concierge team is top-tier.",
      author: "Marcus Bennett",
      role: "Lead Architect",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB11ccKtRQeg521ejDX9cOtgMWqEQe8-W2yvoZr257ptFph8lLtEEJBrF3hICln9Tb_JAxE9d6jJ91fAdGRo6OiospBqPngRXDiU1KIQhORgqOj6PrwBqRnnhvU3O7_pzjLgrCAIqod0p-85XgVWGD-G511QExo0CSo9XuVdR058FTINFJNq4BoVlq-5Jk0tv2TiG5fNoMgRI3AEZPh1IyH1LGzXSM1IsNrEXukg8gHrCtbQormtGoosQvypJ566LAxgjjgVeiS"
    },
    {
      quote: "As an advocate for sustainable clothing, I appreciate Luxe Retail's organic and carbon-neutral commitment. The silk camisole is incredibly soft and drapes flawlessly. This is the future of luxury.",
      author: "Chloe Lindstrom",
      role: "Sustainability Advisor",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoBeAYYkmvJ4WgtNpbOocWrmp1HBdrzefMO-HI9NUBwaAGowCme1YkMGqzn5RRY3vdoCnj1c2gpYS8F6YSolXWzCjwYMdFOmkBLZz6eaIQpFxCuox-FRRtrm_GDrIdX1Y7EF0IOgxWyD-kNIo6tA5l2y2L3sv7IVNhHoT3vjj622HbPXn4bKoeSCdAw-Ieqm3bPRg3k-EVSNrH_mRtoAOpoqxH-77_Vs3lZWJ4xygaCZdkyDeLiYSI-UyrPtdagRR0YdgDIseO"
    }
  ];

  // Helper: Trigger custom premium toast
  const triggerToast = (type: ToastMessage['type'], title: string, message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, color: string, size: string) => {
    setCartItems((prev) => {
      // Check if duplicate item exists
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    triggerToast(
      'cart',
      'Added to Bag',
      `${quantity}x ${product.name} (${color}, ${size}) added successfully.`
    );
  };

  const handleQuickAdd = (product: Product) => {
    // Quick Add picks default first color and first size
    const defaultColor = product.colors[0] || 'Default';
    const defaultSize = product.sizes[0] || 'O/S';
    handleAddToCart(product, 1, defaultColor, defaultSize);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    triggerToast(
      'info',
      'Item Removed',
      `${item.product.name} was removed from your shopping bag.`
    );
  };

  // Favorite Handlers
  const handleToggleFavorite = (product: Product) => {
    const isFav = favorites.some((fav) => fav.id === product.id);
    if (isFav) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== product.id));
      triggerToast('favorite', 'Removed from Wishlist', `${product.name} removed.`);
    } else {
      setFavorites((prev) => [...prev, product]);
      triggerToast('favorite', 'Saved to Wishlist', `${product.name} added.`);
    }
  };

  const handleMoveToCart = (product: Product) => {
    const defaultColor = product.colors[0] || 'Default';
    const defaultSize = product.sizes[0] || 'O/S';
    handleAddToCart(product, 1, defaultColor, defaultSize);
    // Remove from favorite on successful move
    setFavorites((prev) => prev.filter((fav) => fav.id !== product.id));
  };

  // Checkout Handlers
  const handleOrderSuccess = () => {
    setCartItems([]); // Clear cart
    triggerToast(
      'success',
      'Order Placed!',
      'Thank you for your purchase. We are preparing your order.'
    );
  };

  // Scroll to Shop Section
  const scrollToShop = () => {
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Newsletter Form Handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    triggerToast(
      'newsletter',
      'Joined Inner Circle',
      `Welcome! ${newsletterEmail} has been successfully subscribed.`
    );
    setNewsletterEmail('');
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCategory === 'All') return matchesSearch;
      if (selectedCategory === 'New Arrivals') return product.isNew && matchesSearch;
      return product.category === selectedCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating-desc') return b.rating - a.rating;
      return 0; // 'featured' keeps default dataset order
    });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Navigation Header */}
      <header className="w-full sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <a
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-2xl font-semibold tracking-tighter text-primary cursor-pointer select-none"
          >
            LUXE RETAIL
          </a>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center h-full">
            <button
              onClick={() => { setSelectedCategory('All'); scrollToShop(); }}
              className={`font-sans text-sm font-medium transition-colors pb-1 border-b-2 ${
                selectedCategory === 'All'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => { setSelectedCategory('New Arrivals'); scrollToShop(); }}
              className={`font-sans text-sm font-medium transition-colors pb-1 border-b-2 ${
                selectedCategory === 'New Arrivals'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => { setSelectedCategory('Menswear'); scrollToShop(); }}
              className={`font-sans text-sm font-medium transition-colors pb-1 border-b-2 ${
                selectedCategory === 'Menswear'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Menswear
            </button>
            <button
              onClick={() => { setSelectedCategory('Womenswear'); scrollToShop(); }}
              className={`font-sans text-sm font-medium transition-colors pb-1 border-b-2 ${
                selectedCategory === 'Womenswear'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Womenswear
            </button>
            <button
              onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}
              className={`font-sans text-sm font-medium transition-colors pb-1 border-b-2 ${
                selectedCategory === 'Accessories'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              Accessories
            </button>
          </nav>
          
          {/* Actions Menu */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors relative active:scale-95"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors relative active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-primary text-on-primary font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Customer Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-1.5 rounded-full transition-colors active:scale-95 ${
                  isProfileOpen ? 'bg-surface-container text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
                aria-label="User profile"
              >
                <User className="w-5 h-5" />
              </button>
              
              {/* Profile dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-xl z-40"
                    >
                      <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                          ER
                        </div>
                        <div>
                          <p className="font-sans font-semibold text-sm text-on-background">Elena Rostova</p>
                          <p className="font-sans text-xs text-on-surface-variant">elena@rostova.com</p>
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/25 rounded-xl p-3.5 flex items-start gap-2.5 mb-3">
                        <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-primary">Luxe VIP Platinum</p>
                          <p className="text-[11px] text-on-surface-variant mt-0.5">Enjoy automated 15% exclusive concierge checkout discounts.</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-xs text-on-surface-variant font-medium">
                        <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                          <span>VIP Points Balance:</span>
                          <span className="font-bold text-on-background">1,450 pts</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span>Recent Orders:</span>
                          <span className="font-bold text-primary underline cursor-pointer">View Trackers</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-on-surface-variant hover:text-primary active:scale-95"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface-container-lowest p-6 flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <span className="font-serif font-semibold text-lg text-primary">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-on-surface-variant hover:text-on-background rounded-full hover:bg-surface-container"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 font-sans text-sm font-medium">
                <button
                  onClick={() => { setSelectedCategory('All'); scrollToShop(); }}
                  className="py-2.5 px-3 rounded-lg text-left hover:bg-surface-container-low text-on-background hover:text-primary"
                >
                  All Collections
                </button>
                <button
                  onClick={() => { setSelectedCategory('New Arrivals'); scrollToShop(); }}
                  className="py-2.5 px-3 rounded-lg text-left hover:bg-surface-container-low text-on-background hover:text-primary"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => { setSelectedCategory('Menswear'); scrollToShop(); }}
                  className="py-2.5 px-3 rounded-lg text-left hover:bg-surface-container-low text-on-background hover:text-primary"
                >
                  Menswear
                </button>
                <button
                  onClick={() => { setSelectedCategory('Womenswear'); scrollToShop(); }}
                  className="py-2.5 px-3 rounded-lg text-left hover:bg-surface-container-low text-on-background hover:text-primary"
                >
                  Womenswear
                </button>
                <button
                  onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}
                  className="py-2.5 px-3 rounded-lg text-left hover:bg-surface-container-low text-on-background hover:text-primary"
                >
                  Accessories
                </button>
              </nav>

              <div className="mt-auto border-t border-outline-variant/20 pt-6">
                <p className="text-xs text-on-surface-variant font-medium">Elena Rostova</p>
                <p className="text-xs text-on-surface-variant/70 mt-1">Luxe VIP Platinum Member</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        
        {/* Hero Banner Section */}
        <section className="relative w-full h-[760px] min-h-[550px] flex items-center justify-center overflow-hidden">
          {/* Cover Background */}
          <div className="absolute inset-0 z-0 bg-surface-container-high">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full mix-blend-multiply opacity-85 transition-transform duration-1000"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwHPqWwOzLdVZKF4yCnj9kuQNjrHFBTFW06mECdnflmNAuDUYVNagaewH5lvM0J1u4CjT3HJOe6y84iaryrWp-u646Q-Kt9eG6_jlBL9Ds6PJQZCOKyov7DDqIgOEomUAQ2zvkeuQLMFb9MJKw4QWotROK0JQuptRxixULevNrB7zjFl7DM3_EKosKPTbR5s14eRCOWcrbLJvgUF_Z0h--sasBHBFNufXy6SWVVTM5CtbdYMI28RMNOP4MvhVEhAEQtIQfPfp-')`
              }}
            />
            {/* Visual Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/95 via-surface-container-lowest/30 to-black/10" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight text-on-background mb-6">
                Redefine Your Style
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-sans text-base md:text-xl text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                Curated collections for the modern minimalist. Discover precision-tailored essentials that elevate your everyday ritual with sustainable luxury.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button
                onClick={scrollToShop}
                className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 group"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Featured Collections Fast Categories */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold text-on-background mb-3">
              Featured Collections
            </h2>
            <div className="w-12 h-1 bg-primary/45 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menswear Collection Card */}
            <div
              onClick={() => { setSelectedCategory('Menswear'); scrollToShop(); }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB11ccKtRQeg521ejDX9cOtgMWqEQe8-W2yvoZr257ptFph8lLtEEJBrF3hICln9Tb_JAxE9d6jJ91fAdGRo6OiospBqPngRXDiU1KIQhORgqOj6PrwBqRnnhvU3O7_pzjLgrCAIqod0p-85XgVWGD-G511QExo0CSo9XuVdR058FTINFJNq4BoVlq-5Jk0tv2TiG5fNoMgRI3AEZPh1IyH1LGzXSM1IsNrEXukg8gHrCtbQormtGoosQvypJ566LAxgjjgVeiS')`
                }}
              />
              <div className="absolute inset-0 bg-on-background/25 group-hover:bg-on-background/15 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-on-primary tracking-wide drop-shadow-sm">
                  Menswear
                </h3>
                <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-on-primary border-b border-on-primary/60 pb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  Explore Essentials
                </span>
              </div>
            </div>

            {/* Womenswear Collection Card */}
            <div
              onClick={() => { setSelectedCategory('Womenswear'); scrollToShop(); }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 md:translate-y-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoBeAYYkmvJ4WgtNpbOocWrmp1HBdrzefMO-HI9NUBwaAGowCme1YkMGqzn5RRY3vdoCnj1c2gpYS8F6YSolXWzCjwYMdFOmkBLZz6eaIQpFxCuox-FRRtrm_GDrIdX1Y7EF0IOgxWyD-kNIo6tA5l2y2L3sv7IVNhHoT3vjj622HbPXn4bKoeSCdAw-Ieqm3bPRg3k-EVSNrH_mRtoAOpoqxH-77_Vs3lZWJ4xygaCZdkyDeLiYSI-UyrPtdagRR0YdgDIseO')`
                }}
              />
              <div className="absolute inset-0 bg-on-background/25 group-hover:bg-on-background/15 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-on-primary tracking-wide drop-shadow-sm">
                  Womenswear
                </h3>
                <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-on-primary border-b border-on-primary/60 pb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  Explore Silhouettes
                </span>
              </div>
            </div>

            {/* Accessories Collection Card */}
            <div
              onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPE85-WjBDjoE-wFuBw3yRhInHDLbgmGcu72J8CGhLtX8mWQfQHra7wVCI674Y8dNBlQkPnZLZEQl8q3LYQmq2qcs7zDqatF9o_faVGq4y5iAlbTXIjF2h3TMNIvaDkqjQfeiYRcUYJnJp7RCwWYa4L-ksrS6kFYOSqefEUBzz0aECMFtVodu6zZL6JgEL3KMLXHA7F9Et9WPgIElKkZqqII-5J1nmtsshsTE2rqpVGbaGWQL4oObBVSc8n43MSK_c9eo8mN-Z')`
                }}
              />
              <div className="absolute inset-0 bg-on-background/25 group-hover:bg-on-background/15 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-on-primary tracking-wide drop-shadow-sm">
                  Accessories
                </h3>
                <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-on-primary border-b border-on-primary/60 pb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  Explore Detailing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Product Grid Catalog */}
        <section
          ref={shopSectionRef}
          className="py-24 bg-surface-container-low/50 border-t border-b border-outline-variant/10"
        >
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header & Filter Controller */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-5 pb-6 border-b border-outline-variant/20">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-on-background mb-2">
                  {selectedCategory === 'All' ? 'Trending Now' : selectedCategory}
                </h2>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  Showing {filteredProducts.length} premium models
                </p>
              </div>

              {/* Real-time search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-on-surface-variant/55" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Sub Filter Category Pills & Sorting Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {['All', 'New Arrivals', 'Menswear', 'Womenswear', 'Accessories'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4.5 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 border ${
                      selectedCategory === category
                        ? 'bg-primary border-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase shrink-0">
                  Sort By:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs font-semibold text-on-surface-variant px-3 py-2 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <Search className="w-12 h-12 text-on-surface-variant/40 mb-4" />
                <h4 className="text-base font-bold text-on-background mb-1">
                  No products match your criteria
                </h4>
                <p className="text-sm text-on-surface-variant max-w-sm">
                  Try adjusting your search query, selecting a different collection category, or clearing your search.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="bg-primary hover:bg-primary-container text-on-primary font-sans font-medium text-xs px-5 py-2 rounded-lg mt-6"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.some((fav) => fav.id === product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetail={(prod) => setSelectedProduct(prod)}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Value Propositions / Trust Badges */}
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-outline-variant/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* Shipping */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xs"
            >
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-4 shadow-inner">
                <Truck className="w-8 h-8 text-on-secondary-fixed" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-background mb-2">
                Free Shipping
              </h3>
              <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed max-w-xs">
                Complimentary express shipping on all curated orders over $200.
              </p>
            </motion.div>

            {/* Eco friendly */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xs"
            >
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 shadow-inner">
                <Leaf className="w-8 h-8 text-on-primary-fixed" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-background mb-2">
                Eco-Friendly
              </h3>
              <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed max-w-xs">
                Committed to zero waste, sustainable premium fabrics, and carbon-neutral logistics.
              </p>
            </motion.div>

            {/* Concierge support */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xs"
            >
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mb-4 shadow-inner">
                <Headphones className="w-8 h-8 text-on-tertiary-fixed" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-background mb-2">
                24/7 Support
              </h3>
              <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed max-w-xs">
                Our bespoke concierge service is available around the clock to assist you.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Interactive Customer Testimonial Slider / Carousel */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-surface-container-low rounded-2xl p-8 md:p-14 shadow-xs relative overflow-hidden">
            {/* Quote SVG watermark decoration */}
            <span className="font-serif text-[180px] text-surface-container-high absolute -top-12 -left-4 opacity-55 select-none pointer-events-none line-height-none font-bold">
              “
            </span>

            <div className="relative z-10 flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-serif text-lg md:text-2xl text-on-background italic mb-8 leading-relaxed">
                    "{testimonials[currentTestimonialIndex].quote}"
                  </p>
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant/30">
                      <img
                        src={testimonials[currentTestimonialIndex].image}
                        alt={testimonials[currentTestimonialIndex].author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-sans font-bold text-sm text-on-background">
                        {testimonials[currentTestimonialIndex].author}
                      </h4>
                      <p className="font-sans text-[11px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">
                        {testimonials[currentTestimonialIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider controls */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentTestimonialIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="p-2 border border-outline-variant hover:border-primary hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary rounded-full transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ${
                        currentTestimonialIndex === idx
                          ? 'bg-primary w-6'
                          : 'bg-outline-variant hover:bg-primary/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentTestimonialIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-2 border border-outline-variant hover:border-primary hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary rounded-full transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter subscription form */}
        <section className="py-24 bg-surface-container-lowest border-t border-outline-variant/15">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-semibold text-on-background mb-3">
              Join the Inner Circle
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
              Subscribe to receive private invitations to new curated collection drops, editorial stories, and exclusive member-only privileges.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm font-sans"
                />
              </div>
              <button
                type="submit"
                className="bg-on-background hover:bg-primary text-on-primary px-6 py-3 rounded-xl font-sans font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <footer className="w-full py-16 bg-surface-container-highest/60 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <a
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-serif text-xl font-bold tracking-tight text-on-surface cursor-pointer"
            >
              LUXE RETAIL
            </a>
            <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed pr-4">
              Elevating the everyday with precision-crafted silhouettes and sustainable fabrics for the modern minimalist.
            </p>
          </div>

          {/* Quick links Category */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
              Shop Collections
            </h4>
            <button
              onClick={() => { setSelectedCategory('Menswear'); scrollToShop(); }}
              className="text-left text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
            >
              Menswear Catalog
            </button>
            <button
              onClick={() => { setSelectedCategory('Womenswear'); scrollToShop(); }}
              className="text-left text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
            >
              Womenswear Catalog
            </button>
            <button
              onClick={() => { setSelectedCategory('Accessories'); scrollToShop(); }}
              className="text-left text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
            >
              Bespoke Accessories
            </button>
          </div>

          {/* Legal info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
              Legal
            </h4>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
              Privacy Policy
            </a>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
              Terms of Service
            </a>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
              Support Concierge
            </h4>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
              Shipping Info
            </a>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
              Contact Us
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-on-surface-variant">
            © 2026 Luxe Retail. Crafted for elegance & minimalism. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" aria-label="Global Site">
              <Globe className="w-5 h-5" />
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" aria-label="Mail Support">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Cart side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist side Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onMoveToCart={(product) => {
          handleMoveToCart(product);
          setIsWishlistOpen(false);
        }}
      />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.some((fav) => fav.id === selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={(product, quantity, color, size) => {
          handleAddToCart(product, quantity, color, size);
        }}
      />

      {/* Checkout Wizard Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
