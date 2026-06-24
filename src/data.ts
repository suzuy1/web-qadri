/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Structured Slate Blazer',
    category: 'Menswear',
    price: 245.00,
    rating: 4.9,
    description: 'A sharp, modern cut crafted with premium wool blend. Features structured shoulders, notch lapels, a double button-closure, and fully lined luxurious interior.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Dfmj6tnOv5aFWfpUzOIb_u-HWuTyCuSV9oZjO_1ufb__JR_zhrNc-OPvNINIVIqMUUnGnlohO5ohdkqAlt-cCdFSNO2yXMs8tg1Tm_GcPqM_R-T9ByesiMRj87Z9WOnYIiuns3izgpjiv5c5bWyuUB5jXc7hWY4Vy1KeyjWGWLe1EoRDEiUzr6UlroHoya00x7EodZ4caSVYBvmioO-hIotrOiOrfejsGwplCC1QLDXv8MuPR9SbZhmeQckLsY_Ca_Ba3CRb',
    isNew: true,
    colors: ['Slate Grey', 'Charcoal Black', 'Navy Blue'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-2',
    name: 'Emerald Silk Camisole',
    category: 'Womenswear',
    price: 120.00,
    rating: 4.7,
    description: 'Pure Mulberry silk with delicate adjustable shoulder straps. Features a subtle V-neckline, bias cut for a flattering drape, and ultra-smooth seamless edges.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtsr55VMckzLtp1GavZE3m7py8EU-4TJ1Sxc8w3E2a2-7piB_UuwvMw32x4LeoQfUAVBJsXhT7FBYmiX1BbQMt65U1IiSFJvEQjSKMMpd_fhGtCe4vhyhakdUNlIpWYJAEf7W5OS04ydOGKzmed65tomjMG36BGykGULXkXazfj_g9DlHGdQNjJ--pY6pEdztnqzrC_Glr8MfvLqvLiN6eM2AZkdjg_F5CUzwq9AeWP-AReKwPAjCrxNEZ2toiRqvWKt_N4wZg',
    colors: ['Emerald Green', 'Pearl White', 'Champagne Gold'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'prod-3',
    name: 'Everyday Leather Tote',
    category: 'Accessories',
    price: 350.00,
    rating: 5.0,
    description: 'Handcrafted from full-grain Italian calfskin leather. Includes a detachable inner zip security pouch, spacious main compartment, and reinforced shoulder straps.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoHje6ylyvGGbAXWDBeL2rEYUBI7U_ds8zQJR09bEE1EsoRQUR0yGh-uEvYUnpN_6ta07jyCnrBw7PL5Yq7mXjN75cP9ldMMrd_JxTrcMcuiCNqxZclDQETlF4OFi6ZrSdkLlWefmdBuAyPF8_NBqE7Z6-qRlyPPX2iPhERr2ryvnHLZMnZTgQ8JU7SzIBxjaMlw45SkhjqY9prAcGb6AG37APyTeeFG9ozf9OdUqywKYvxlA8XZ8gvJuze7FFlv0qwxzjCuR9',
    colors: ['Cognac Brown', 'Midnight Black', 'Desert Tan'],
    sizes: ['O/S']
  },
  {
    id: 'prod-4',
    name: 'Minimalist Low-Top Sneakers',
    category: 'Accessories',
    price: 185.00,
    rating: 4.6,
    description: 'Made from premium calfskin leather with a durable Italian Margom rubber sole. Minimalist design featuring tonal stitching and subtle gold serial number branding.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBClqmqrpN8jAdJihFd2IbSCBZmy4fMX7ciWNsjSNp2EuQXEEspPThT7LtA3bVRqaZ4SxpJsRkNNGHgfXeE31Wk0jzVyj1zrqvvDuy9f7sawgw4JrDit7X5SrebAmMfZIsL3v4cTOEBBjJ-SQaoG4AJWyCyBPutVOCNOsIhS2U_hPeUpoROGlS_0RcuMVA3NFcYkuiocr114Rf-LRZK0M6lWaQcF8ps0qoVFKuHmBUFYs8osskLJdUqk0IsEaIl3PX5VGWL0Yz5',
    colors: ['Off-White', 'Classic Black', 'Grey Suede'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 'prod-5',
    name: 'Cashmere Turtleneck Sweater',
    category: 'Womenswear',
    price: 210.00,
    rating: 4.8,
    description: 'Ultra-soft, ethically sourced Grade-A Mongolian cashmere knit. Designed with a relaxed elegant turtleneck shape and ribbed finish details.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoBeAYYkmvJ4WgtNpbOocWrmp1HBdrzefMO-HI9NUBwaAGowCme1YkMGqzn5RRY3vdoCnj1c2gpYS8F6YSolXWzCjwYMdFOmkBLZz6eaIQpFxCuox-FRRtrm_GDrIdX1Y7EF0IOgxWyD-kNIo6tA5l2y2L3sv7IVNhHoT3vjj622HbPXn4bKoeSCdAw-Ieqm3bPRg3k-EVSNrH_mRtoAOpoqxH-77_Vs3lZWJ4xygaCZdkyDeLiYSI-UyrPtdagRR0YdgDIseO',
    isNew: true,
    colors: ['Warm Taupe', 'Oatmeal', 'Soft Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-6',
    name: 'Tailored Linen Trousers',
    category: 'Menswear',
    price: 165.00,
    rating: 4.5,
    description: 'Highly breathable Belgian linen trousers tailored with adjustable side waist tabs, hook and eye closure, and structured front pleats.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB11ccKtRQeg521ejDX9cOtgMWqEQe8-W2yvoZr257ptFph8lLtEEJBrF3hICln9Tb_JAxE9d6jJ91fAdGRo6OiospBqPngRXDiU1KIQhORgqOj6PrwBqRnnhvU3O7_pzjLgrCAIqod0p-85XgVWGD-G511QExo0CSo9XuVdR058FTINFJNq4BoVlq-5Jk0tv2TiG5fNoMgRI3AEZPh1IyH1LGzXSM1IsNrEXukg8gHrCtbQormtGoosQvypJ566LAxgjjgVeiS',
    colors: ['Sand Beige', 'Pure White', 'Navy Blue'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'prod-7',
    name: 'Brass Minimalist Cuff',
    category: 'Accessories',
    price: 95.00,
    rating: 4.9,
    description: 'Solid brass cuff bracelet finished with a luxurious matte sandblasted texture. Open-back design allows custom adjustment for a comfortable fit.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPE85-WjBDjoE-wFuBw3yRhInHDLbgmGcu72J8CGhLtX8mWQfQHra7wVCI674Y8dNBlQkPnZLZEQl8q3LYQmq2qcs7zDqatF9o_faVGq4y5iAlbTXIjF2h3TMNIvaDkqjQfeiYRcUYJnJp7RCwWYa4L-ksrS6kFYOSqefEUBzz0aECMFtVodu6zZL6JgEL3KMLXHA7F9Et9WPgIElKkZqqII-5J1nmtsshsTE2rqpVGbaGWQL4oObBVSc8n43MSK_c9eo8mN-Z',
    colors: ['Gold Matte', 'Silver Satin'],
    sizes: ['O/S']
  },
  {
    id: 'prod-8',
    name: 'Double-Breasted Trench Coat',
    category: 'Womenswear',
    price: 295.00,
    rating: 4.9,
    description: 'Classic water-resistant gabardine cotton trench coat. Structured shoulder epaulets, double-breasted storm flap, and a dynamic tie-belt waist.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwHPqWwOzLdVZKF4yCnj9kuQNjrHFBTFW06mECdnflmNAuDUYVNagaewH5lvM0J1u4CjT3HJOe6y84iaryrWp-u646Q-Kt9eG6_jlBL9Ds6PJQZCOKyov7DDqIgOEomUAQ2zvkeuQLMFb9MJKw4QWotROK0JQuptRxixULevNrB7zjFl7DM3_EKosKPTbR5s14eRCOWcrbLJvgUF_Z0h--sasBHBFNufXy6SWVVTM5CtbdYMI28RMNOP4MvhVEhAEQtIQfPfp-',
    isNew: true,
    colors: ['Classic Khaki', 'Olive Green', 'Noir Black'],
    sizes: ['S', 'M', 'L']
  }
];
