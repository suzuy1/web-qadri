/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'Menswear' | 'Womenswear' | 'Accessories';
  price: number;
  rating: number;
  description: string;
  image: string;
  isNew?: boolean;
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}
